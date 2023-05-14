import { ExecutionData, ExecutionDataLevel, ExportListItem, ExportObject, ObjectField } from '../../../models/tiled-gameboy-tool-types'


const getRGBDSObjectExportContents = (executionData:ExecutionData,executionDataLevel:ExecutionDataLevel)=>{

    const stringFields:ObjectField[] = executionData.objectFields.filter(x=>x.type=="string")
    const stringsArrays:any = executionDataLevel.totalObjects.map(obj=>{
        return stringFields.map(str=>obj.customData[str.name])
    })
    console.log(stringsArrays)
    const strings:string[] = [].concat.apply([],stringsArrays).filter(x=>x!="")
    const stringMap = []
    var previousLength=0;
    for(var i=0;i<strings.length;i++){
        stringMap.push(previousLength)
        /**
         * Important! Add one for the final 255 at the end.
         */
        previousLength+=strings[i].length+1
    }

    const objectData= executionDataLevel.totalObjects.map(obj=>{
        var extraFields=executionData.objectFields.map(field=>{
            if(field.type=="string")return obj.customData[field.name]==""? 255  :  strings.indexOf(obj.customData[field.name])
            else return obj.customData[field.name]
        }).join(",")

        if(extraFields.length>0)extraFields=','+extraFields
        
        return `\tDB $${obj.y.toString(16).toUpperCase()},$${obj.x.toString(16).toUpperCase()},$${obj.id.toString(16).toUpperCase()}${extraFields}`
    })

    var objectMap = executionDataLevel.totalObjects.map((x:ExportObject,i:number)=>(executionData.objectFields.length+3)*i);

    const stringsMapText = strings.length ==0 ? "" : (
`${executionDataLevel.identifier}_strings_map:: DB ${stringMap.join(",")}
${executionDataLevel.identifier}_strings::
${strings.map(str=>`\tDB \"${str}\",255`).join("\n")}
`);
    
    const writeCContent = `
${stringsMapText}

${executionDataLevel.identifier}_Objects::
${objectData.join("\n")}
${executionDataLevel.identifier}_ObjectsEnd::

${executionDataLevel.identifier}_Objects_map:: DB ${objectMap.join(",")}
    `
    return writeCContent;
}


export const getRGBDSObjectExport = (executionData:ExecutionData,executionDataLevel:ExecutionDataLevel,exportList:ExportListItem[])=>{
    exportList[0].contents.push(getRGBDSObjectExportContents(executionData,executionDataLevel))
}
