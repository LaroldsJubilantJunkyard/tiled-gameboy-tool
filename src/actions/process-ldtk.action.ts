import { World } from "ldtk";
import { ExecutionData } from "../models/tiled-gameboy-tool-types";
import { Level } from "ldtk/dist/typedef";
import Jimp from "jimp";

export const processLDTKFile = async (executionData:ExecutionData)=>{

    const ldtdkWorld:any = (await World.loadRaw(executionData.inputFile));

    ldtdkWorld.levels.forEach((level:Level)=>processLDTKLevel(executionData,ldtdkWorld,level));
}


export const processLDTKLevel = async (executionData:ExecutionData,ldtdkWorld:World,ltdkLevel:Level)=>{

   executionData.mapWidth = Math.floor(ltdkLevel.pxWid/8);
   executionData.mapHeight = Math.floor(ltdkLevel.pxHei/8);

   const tileCount = executionData.mapWidth*executionData.mapHeight;

   var tiles = Array.from(Array(tileCount).keys());

    const layers = ltdkLevel.layerInstances;

    if(layers!=undefined){
        
    
        for(var i=0;i<layers?.length;i++){

            const layer = layers[i];

            const autoLayerTiles = layer.autoLayerTiles

            const tilesetPath = layer.__tilesetRelPath

            const jimpImage = await Jimp.read(tilesetPath||"")

            const tilesetWidth = jimpImage.getWidth();
            const tilesetHeight = jimpImage.getHeight();

            const tilestColumnCount = Math.floor(tilesetWidth/8)
            const tilestRowCount = Math.floor(tilesetHeight/8)
            const tilesetMaxTileCount = tilestColumnCount*tilestRowCount;

            for(var j=0;j<autoLayerTiles.length;j++){

                const layerColumn = autoLayerTiles[j].px[0]/8;
                const layerRow = autoLayerTiles[j].px[1]/8;
                const layerIndex = layerColumn+executionData.mapWidth*layerRow;

                tiles[layerIndex]=autoLayerTiles[j].t
            }
        }
    }

    console.log(tiles)

}