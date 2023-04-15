import { ExecutionData } from "../models/tiled-gameboy-tool-types";
import fs from 'fs'
import { singleItemOrArray } from "../utils/micc.utils";
import { ITiledMapObjectGroupObject, ITiledTilesetDataTileProperty } from "../models/tiled-types";

export const getFields = (i:number):string[]=>{

    var fields:string[]= []

    for(var j=i;j<process.argv.length;j++){

        var possibleField:string = process.argv[j]

        // Loop until we reach a dash
        if(possibleField.startsWith("-"))break;

        // Skip just commas
        if(possibleField.trim()==",")continue;

        // add the split by commas
        fields = [...fields,...possibleField.trim().split(",")]
    }

    console.log("object fields: "+fields.join(","))

    return fields

}

export default (data:any,executionData:ExecutionData)=>{

    const fields = data as string[]

    console.log("object fields to output: "+data)

    var totalObjects:any = []

    executionData.objectGroups.forEach(objectGroup=>{

        const objects:ITiledMapObjectGroupObject[] = singleItemOrArray(objectGroup.object)

        objects.forEach((object:ITiledMapObjectGroupObject)=>{

            var data:any = {x:Math.floor(Number(object.x)),y:Math.floor(Number(object.y)),id:object.id,name:object.name}

            singleItemOrArray(object.properties.property).forEach((property:ITiledTilesetDataTileProperty)=>{

                if(fields.includes(property.name))data[property.name]=property.value
            })

            totalObjects.push(data)
        })
    })

    fs.writeFileSync('objects.json',JSON.stringify(totalObjects ))
}