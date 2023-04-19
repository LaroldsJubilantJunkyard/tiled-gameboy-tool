import { ExecutionData, FinalItems } from "../models/tiled-gameboy-tool-types";
import { replaceChar } from "./string.utils";

export const getFinalItemsFromLayers= (executionData:ExecutionData):FinalItems[]=>{

    const layerIndices:string[] = executionData.layers[0].data.$t.split(",")
    
    var items:FinalItems[] = layerIndices.map((x:string)=>{return {index:Number(x)-1,tileLayer:0,attribute:0}})

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

    
    items.forEach(x=>{
        
       /**
       * From: https://doc.mapeditor.org/en/stable/reference/global-tile-ids/#gid-tile-flipping
       * Tile Flipping
       * 
       * The highest four bits of the 32-bit GID are flip flags, and you will need to read and clear them before you can access the GID itself to 
       * identify the tile.

       * Bit 32 is used for storing whether the tile is horizontally flipped, bit 31 is used for the vertically flipped tiles. 
       * In orthogonal and isometric maps, bit 30 indicates whether the tile is flipped (anti) diagonally, which enables tile rotation, 
       * and bit 29 can be ignored. In hexagonal maps, bit 30 indicates whether the tile is rotated 60 degrees clockwise, 
       * and bit 29 indicates 120 degrees clockwise rotation.
       */
       var bin = x.index.toString(2).padStart(32)
       var horizontallyFlipped = bin[0]=="1";
       var verticallyFlipped = bin[1]=="1";
       var newIndex:string = bin.substring(26);
       var attributeValue:string = bin.substring(0,4);

       /**
        * From: https://gbdk-2020.github.io/gbdk-2020/docs/api/gb_8h.html
        * Bit 6 - Vertical flip. Dictates which way up the tile is drawn vertically.
        * Bit 5 - Horizontal flip. Dictates which way up the tile is drawn horizontally.
        */
       attributeValue = replaceChar(attributeValue,verticallyFlipped? "1":"0",1)
       attributeValue = replaceChar(attributeValue,horizontallyFlipped? "1":"0",2)

       x.attribute = parseInt(attributeValue,2)
       x.index = parseInt(newIndex,2)
 
    })
    

    return items
}