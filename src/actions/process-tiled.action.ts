import { ExecutionData } from "../models/tiled-gameboy-tool-types";
import {
  ITiledFileData,
  ITiledMapObjectGroupObject,
  ITiledTileset,
  ITiledTilesetDataTile,
  ITiledTilesetDataTileProperty,
} from "../models/tiled-types";
import { readTiledTMXFile, readTileset } from "../services/tiled.service";
import { getTilesetImageData } from "../utils/image.utils";
import { flattenTiledLayers } from "../utils/layers.utils";
import { singleItemOrArray } from "../utils/micc.utils";

export const processTiledTMXFile = async (executionData: ExecutionData) => {
  // Read the TMX file
  var tiledTMXFileData: ITiledFileData = readTiledTMXFile(
    executionData.inputFile
  );

  // Get the map size
  executionData.mapWidth = Number(tiledTMXFileData.map.width);
  executionData.mapHeight = Number(tiledTMXFileData.map.height);

  /**
   * Read the tileset data file
   */
  executionData.tilesets = tiledTMXFileData.map.tileset.map(
    (x: ITiledTileset): ITiledTileset => {
      return { ...x, data: readTileset(x.source) };
    }
  );
   getTilesetImageData(executionData);

  executionData.tilesets.forEach((tileset:ITiledTileset,index:number)=>{

    if(tileset.imageData){

        
      for(var i=0;i<tileset.data.tileset.tilecount;i++){


        var column = i%tileset.data.tileset.columns
        var row = Math.floor(i/tileset.data.tileset.columns)

        var pixelX = column*8;
        var pixelY = row*8;

        const allTileData:any = {gid:Number(i)+Number(tileset.firstgid),tilesetIndex:index,palette:0};
        const topLeftColor = tileset.imageData[pixelY][pixelX]
        allTileData.palette = Math.floor(topLeftColor.index/4);//Math.floor(topLeftColor/4)
        executionData.allTiles[allTileData.gid]=allTileData
      }
    }

  })



  // Get the map layers
  executionData.layers = singleItemOrArray(tiledTMXFileData.map.layer);

  // Get the object groups
  executionData.objectGroups = singleItemOrArray(
    tiledTMXFileData.map.objectgroup
  );

  // Getthe final items from the layers
  executionData.finalItems = flattenTiledLayers(executionData);

  

  executionData.solidMap = executionData.finalItems.map(x=>{
    var tileOrTiles:ITiledTilesetDataTile[] = singleItemOrArray( executionData.tilesets[x.tileLayer].data.tileset.tile)

    if(tileOrTiles==null)return 0
    if(tileOrTiles.length==0)return 0


    var tilesetTileData = tileOrTiles.filter(y=>y!==null&&y!==undefined).find(y=>y.id==x.index+"")

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


  const fieldNames = executionData.objectFields.map((x) => x.name);

  executionData.objectGroups.forEach((objectGroup) => {
    const objects: ITiledMapObjectGroupObject[] = singleItemOrArray(
      objectGroup.object
    );

    objects.forEach((object: ITiledMapObjectGroupObject) => {
      var data: any = {
        x: Math.floor(Number(object.x)),
        y: Math.floor(Number(object.y)),
        id: Number(object.id),
      };

      // Apply default value to all properties to things
      executionData.objectFields.forEach((field) => {
        data[field.name] = 0;
      });

      // Check all of the object's properties
      singleItemOrArray(object.properties.property).forEach(
        (property: ITiledTilesetDataTileProperty) => {
          // If this property was included to be exported
          if (fieldNames.includes(property.name)) {
            var val: any = property.value;

            var field = executionData.objectFields.find(
              (x) => x.name == property.name
            );

            if (field) {

              data[property.name] =val;
              
            }
          }
        }
      );

      executionData.totalObjects.push(data);
    });
  });

};
