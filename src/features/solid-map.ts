import fs from 'fs'
import {sep} from 'path'
import { ExecutionData, FinalItems } from "../models/tiled-gameboy-tool-types"
import { ITiledTileset, ITiledTilesetDataTile, ITiledTilesetDataTileProperty, ITiledTilesetFileData } from "../models/tiled-types"
import { singleItemOrArray } from '../utils/micc.utils'

export default (data:any,executionData:ExecutionData)=>{

    console.log("generating solid map")

    executionData.solidMap = executionData.finalItems.map(x=>{
        var tileOrTiles:ITiledTilesetDataTile[] = singleItemOrArray( executionData.tilesets[x.tileLayer].data.tileset.tile)

        if(tileOrTiles==null)return 0
        if(tileOrTiles.length==0)return 0

        var tilesetTileData = tileOrTiles.find(y=>y.id==x.index+"")

        if(tilesetTileData==null)return 0;

        var propertyOrProperties:ITiledTilesetDataTileProperty[] = singleItemOrArray( tilesetTileData.properties.property)

        var typeProperty = propertyOrProperties.find(y=>y.name=="type")

        if(typeProperty==null)return 0

        var n = Number.NaN;
        
        try{
            n=Number(typeProperty.value);
        }catch(e){

        }

        return isNaN(n) ? 0 : n;

    })

    fs.writeFileSync(executionData.outputDirectory+sep+executionData.identifier+".c",JSON.stringify(executionData.solidMap))
}