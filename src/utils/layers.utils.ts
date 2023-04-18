import { ExecutionData, FinalItems } from "../models/tiled-gameboy-tool-types";

export const getFinalItemsFromLayers= (executionData:ExecutionData):FinalItems[]=>{

    const layerIndices:string[] = executionData.layers[0].data.$t.split(",")
    
    var items:FinalItems[] = layerIndices.map((x:string)=>{return {index:Number(x)-1,tileLayer:0}})

    for(var i=1;i<executionData.layers.length;i++){

        var layer = executionData.layers[i].data["$t"].split(",").map(x=>Number(x))

        layer.forEach((x:number,index:number)=>{

            var indexedX=x-1

            if(indexedX>=0){
                items[index].index=indexedX;
                items[index].tileLayer=i;
            }
        })
    }

    return items
}