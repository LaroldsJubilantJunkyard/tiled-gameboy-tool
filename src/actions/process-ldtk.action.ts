import { World } from "ldtk";
import { ExecutionData, ExecutionDataLevel, FinalItems } from "../models/tiled-gameboy-tool-types";
import { Level } from "ldtk/dist/typedef";
import Jimp from "jimp";
import { LDtkLevelData, LDtkTileFlips } from "../models/ldtk-helper-types";
import { getIdentifierForString, replaceChar } from "../utils/string.utils";

export const processLDTKFile = async (executionData:ExecutionData)=>{

    const ldtdkWorld:any = (await World.loadRaw(executionData.inputFile));

    const ldtkLevels:LDtkLevelData[] = ldtdkWorld.levels.map((level:Level)=>processLDTKLevel(executionData,ldtdkWorld,level));

    const finalItems = ldtkLevels[0].indices.map((x):FinalItems=>{ return {index:x,tileLayer:0,attribute:0,tileIndex:x}})
    const tilemapAttributes = ldtkLevels[0].flips.map((x:LDtkTileFlips):number=>{
        
        var attributeValue: string = "00000000"

        if(x.flipHorizontally)attributeValue = replaceChar(attributeValue,"1",2)
        if(x.flipVertically)attributeValue = replaceChar(attributeValue,"1",1)

        return parseInt(attributeValue,2)
    });
    const mapWidth=ldtkLevels[0].width
    const mapHeight=ldtkLevels[0].height

    executionData.levels = ldtkLevels.map((x:LDtkLevelData):ExecutionDataLevel=>{
        return {
            finalItems:finalItems,
            tilemapAttributes:tilemapAttributes,
            mapHeight,
            mapWidth,
            solidMap:[],
            identifier:executionData.identifier+"_"+getIdentifierForString(x.name),
            totalObjects:[]
        }
    })
}


export const processLDTKLevel = (executionData:ExecutionData,ldtdkWorld:World,ltdkLevel:Level):LDtkLevelData=>{

   const width = Math.floor(ltdkLevel.pxWid/8);
   const height = Math.floor(ltdkLevel.pxHei/8);

   const tileCount = width*height;

   var indices = Array.from(Array(tileCount).keys()).map(x=>0)
   var flips:LDtkTileFlips[]=Array.from(Array(tileCount).keys()).map(x=>{return {flipHorizontally:false,flipVertically:false}})

    const layers = ltdkLevel.layerInstances;

    if(layers!=undefined){
        
    
        for(var i=0;i<layers?.length;i++){

            const layer = layers[i];

            const autoLayerTiles = layer.autoLayerTiles

            for(var j=0;j<autoLayerTiles.length;j++){

                const layerColumn = autoLayerTiles[j].px[0]/8;
                const layerRow = autoLayerTiles[j].px[1]/8;
                const layerIndex = layerColumn+width*layerRow;

                indices[layerIndex]=autoLayerTiles[j].t

                // Get our flips
                if(autoLayerTiles[j].f==1)flips[layerIndex].flipHorizontally=true;
                if(autoLayerTiles[j].f==2)flips[layerIndex].flipVertically=true;
                if(autoLayerTiles[j].f==3){
                    flips[layerIndex].flipHorizontally=true;
                    flips[layerIndex].flipVertically=true;
                }
            }

        }
    }

    return {flips,indices,level:ltdkLevel,width,height,name:ltdkLevel.identifier}

}