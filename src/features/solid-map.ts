import fs from 'fs'
import {sep} from 'path'
import { ExecutionData, FinalItems } from "../models/tiled-gameboy-tool-types"
import { ITiledTileset, ITiledTilesetDataTile, ITiledTilesetFileData } from "../models/tiled-types"

export default (data:any,executionData:ExecutionData)=>{

    console.log("generating solid map")

    var solidMapValues = executionData.finalItems.map(x=>{
        var tileOrTiles:ITiledTilesetDataTile|ITiledTilesetDataTile[] = executionData.tilesets[x.tileLayer].data.tileset.tile

        if(tileOrTiles==null)return 0

        if(!Array.isArray(tileOrTiles))tileOrTiles = [tileOrTiles]

        var tilesetTileData = tileOrTiles.find(y=>y.id==x.index+"")

        if(tilesetTileData==null)return 0;

        var propertyOrProperties = tilesetTileData.properties.property

        if(!Array.isArray(propertyOrProperties))propertyOrProperties=[propertyOrProperties]

        var typeProperty = propertyOrProperties.find(y=>y.name=="type")

        if(typeProperty==null)return 0

        var n = Number.NaN;
        
        try{
            n=Number(typeProperty.value);
        }catch(e){

        }

        return isNaN(n) ? 0 : n;

    })

    fs.writeFileSync(executionData.outputDirectory+sep+data.toString(),JSON.stringify(solidMapValues))
}