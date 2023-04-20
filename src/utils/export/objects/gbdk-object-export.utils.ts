import { ExecutionData, ExportListItem, ObjectField } from "../../../models/tiled-gameboy-tool-types"
import { getObjectFieldDeclaration } from "../../code-gen.utils"
import { getObjectStructName } from "../../export.utils"
import {sep} from 'path'
import { getIdentifierForString } from "../../string.utils"


const getStructDataString =(executionData:ExecutionData)=>{
    
    // If the user passes --object-struct-name, use it's value
    if(executionData.objectStructName){

        return `struct ${executionData.objectStructName};`

    // If the user doesn't pass --object-struct-name, declare our own structure
    }else{

        return  `
typedef struct ${executionData.identifier}_Object {

    uint16_t y;
    uint16_t x;
    uint8_t id;
    ${executionData.objectFields.map(getObjectFieldDeclaration).map(x=>'\t'+x).join("\n")}

} ${executionData.identifier}_Object; `

    }
    
}

const getGBDKObjectHExport = (executionData:ExecutionData)=>{
    var objectStructName= getObjectStructName(executionData);

    return `
#define ${executionData.identifier}_OBJECT_COUNT ${executionData.totalObjects.length}

${getStructDataString(executionData)}

const ${objectStructName} ${executionData.identifier}Objects[${executionData.totalObjects.length}];

${executionData.objectStrings.map(x=>"const unsigned char *"+x.name+";").join("\n")}`;
}


const getGBDKObjectCExport = (executionData:ExecutionData)=>{
    var objectStructName= getObjectStructName(executionData);
    
    const stringFields:ObjectField[] = executionData.objectFields.filter(x=>x.type=="string");
    const stringsArrays:any[] = executionData.totalObjects.map(obj=>{
        return stringFields.map(str=>{return {content:obj[str.name],identifier:getIdentifierForString("object_"+obj.id+"_"+str.name)}}).filter(x=>x.content!="")
    });
    const strings:any[] = [].concat.apply([],stringsArrays);

    /**
     * We'll map the 'totalObjects' data into data we can easily place into C syntax.
     * We'll manually add the x,y, and id parameters.
     * All specified fields will be added as-is, except for strings. For strings, we'll add
     * the identifier and later define that identifier's value.
     */
    const mappedObjects = executionData.totalObjects.map((totalObject)=>{
        
        // Get fields that are not 'x', 'y', or 'id'
        // We will manually map those in order
        const otherFields = Object.keys(totalObject).filter(x=>x!="y"&&x!="x"&&x!="id").map(x=>{
            const field = executionData.objectFields.find(y=>y.name==x)

            // If we found a field with this name
            if(field){

                // If it's a string
                if(field.type=="string"){

                    // Look for the string in the string list
                    var str = strings.find(z=>z.content==totalObject[x])

                    // Use zero if we couldn't find it
                    if(!str)return 0

                    // We'll plainly output the identifier
                    return str.identifier
                }
            }
            return totalObject[x]
        }).join(",")

        return `{${totalObject.y},${totalObject.x},${totalObject.id},${otherFields}}`
    })
    
    return `
${strings.map(x=>`const unsigned char *${x.identifier}=\"${x.content}\";`).join("\n")}

const ${objectStructName} ${executionData.identifier}Objects[ ${executionData.totalObjects.length}]={

    ${mappedObjects.join(",\n")}
};`
}


export const getGBDKObjectExport = (executionData:ExecutionData,exportList:ExportListItem[])=>{
    exportList.find(x=>x.extension=="c")?.contents.push(getGBDKObjectCExport(executionData))
    exportList.find(x=>x.extension=="h")?.contents.push(getGBDKObjectHExport(executionData))
}
