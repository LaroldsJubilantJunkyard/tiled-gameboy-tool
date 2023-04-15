import { ExecutionData, FinalItems } from "../models/tiled-gameboy-tool-types"
import { ITiledTileset, ITiledTilesetFileData } from "../models/tiled-types"

export default (data:any,executionData:ExecutionData)=>{

    console.log("offsetting items by "+data)

    for(var i=0;i<executionData.finalItems.length;i++){
        executionData.finalItems[i].index+=Number(data)
    }
}