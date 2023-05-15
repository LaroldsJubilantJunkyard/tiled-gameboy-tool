import { ExecutionData, ExecutionDataLevel, ExportObject, FinalItems } from "../models/tiled-gameboy-tool-types";
import {
  ITiledFileData,
  ITiledMapObjectGroupObject,
  ITiledTileset,
  ITiledTilesetDataTile,
  ITiledTilesetDataTileProperty,
} from "../models/tiled-types";
import { readTiledTMXFile, readTileset } from "../services/tiled.service";
import { getColumnAndRow, singleItemOrArray } from "../utils/micc.utils";
import { replaceChar } from "../utils/string.utils";
import {resolve} from 'path'

export const processTiledTMXFile = async (executionData: ExecutionData) => {

  const {tiledTMXFileData} =executionData
  
  if(tiledTMXFileData==null)return;
  
  var executionDataLevel: ExecutionDataLevel = {
    finalItems:[],
    identifier:executionData.identifier,
    // Get the map size
    mapWidth:Number(tiledTMXFileData.map.width),
    mapHeight:Number(tiledTMXFileData.map.height),
    solidMap:[],
    tilemapAttributes:[],
    totalObjects:[]
  }

  // Read the solid maps
  getSolidMaps(executionData,executionDataLevel);

  // Get all of the objects
  getTotalObjects(tiledTMXFileData, executionData,executionDataLevel);

  // Get the final items from the layers
  flattenTiledLayers(tiledTMXFileData, executionData,executionDataLevel);

  // Get tilemap attributes
  getTilemapAttributes(executionData,executionDataLevel);

  executionData.levels= [executionDataLevel]
};

export const getTilesets = (
  tiledTMXFileData: ITiledFileData,
  executionData: ExecutionData
) => {
  /**
   * Read the tileset data file
   */
  executionData.tilesets = tiledTMXFileData.map.tileset.map(
    (x: ITiledTileset): ITiledTileset => {
      return { ...x, data: readTileset(x.source) };
    }
  );

  executionData.tilesets.forEach((tileset) => {});

  executionData.tilesets.forEach((tileset: ITiledTileset, index: number) => {
    if (tileset.imageData) {
      for (var i = 0; i < tileset.data.tileset.tilecount; i++) {
        var column = i % tileset.data.tileset.columns;
        var row = Math.floor(i / tileset.data.tileset.columns);

        var pixelX = column * 8;
        var pixelY = row * 8;

        const allTileData: any = {
          gid: Number(i) + Number(tileset.firstgid),
          tilesetIndex: index,
          palette: 0,
        };
        const topLeftColor = tileset.imageData[pixelY][pixelX];
        allTileData.palette = Math.floor(topLeftColor.index / 4); //Math.floor(topLeftColor/4)
        executionData.allTiles[allTileData.gid] = allTileData;
      }
    }
  });
};

export const flattenTiledLayers = (
  tiledTMXFileData: ITiledFileData,
  executionData: ExecutionData,
  executionDataLevel: ExecutionDataLevel
) => {

  // Get the map layers
  executionData.layers = singleItemOrArray(tiledTMXFileData.map.layer);

  const layerIndices: string[] = executionData.layers[0].data.$t.split(",");

  var items: FinalItems[] = layerIndices.map((x: string,index:number) => {
    const {column,row} =  getColumnAndRow(index,executionDataLevel.mapWidth)
    return { index: Number(x) - 1, tileLayer: 0, attribute: 0,column,row,tileIndex:index};
  });

  for (var i = 1; i < executionData.layers.length; i++) {
    var layer = executionData.layers[i].data["$t"]
      .split(",")
      .map((x) => Number(x));

    layer.forEach((x: number, index: number) => {
      var indexedX = x - 1;

      if (indexedX >= 0) {
        items[index].index = indexedX;
        items[index].tileLayer = i;
      }
    });
  }

  items.forEach((x) => {

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
    var bin = x.index.toString(2).padStart(32);
    var horizontallyFlipped = bin[0] == "1";
    var verticallyFlipped = bin[1] == "1";
    var newIndex: string = bin.substring(26);
    var attributeValue: string = bin.substring(0, 4);

    /**
     * From: https://gbdk-2020.github.io/gbdk-2020/docs/api/gb_8h.html
     * Bit 6 - Vertical flip. Dictates which way up the tile is drawn vertically.
     * Bit 5 - Horizontal flip. Dictates which way up the tile is drawn horizontally.
     */
    attributeValue = replaceChar(
      attributeValue,
      verticallyFlipped ? "1" : "0",
      1
    );
    attributeValue = replaceChar(
      attributeValue,
      horizontallyFlipped ? "1" : "0",
      2
    );

    var objIndex = executionDataLevel.totalObjects.findIndex(y=>y.tileIndex==x.tileIndex);

    if(objIndex!=-1 && executionData.enableObjects){
      console.log(`Placing ${executionDataLevel.totalObjects[objIndex]} at ${x.tileIndex}`)

      newIndex=(255).toString(2);
      attributeValue=objIndex.toString(2);
    }

    x.attribute = parseInt(attributeValue, 2);
    x.index = parseInt(newIndex, 2);
  });

  executionDataLevel.finalItems = items;
};
const getTilemapAttributes = (
  executionData: ExecutionData,
  executionDataLevel: ExecutionDataLevel) => {
    executionDataLevel.tilemapAttributes = executionDataLevel.finalItems.map((x,tileIndex) => {

    var objIndex = executionDataLevel.totalObjects.findIndex(y=>y.tileIndex==tileIndex);

    if(objIndex!=-1 && executionData.enableObjects){
      return objIndex;
    }
    
    if(executionData.tilesets[x.tileLayer]==null)return 0;
    if(executionData.tilesets[x.tileLayer].data==null)return 0;
    if(executionData.tilesets[x.tileLayer].data.tileset==null)return 0;
    if(executionData.tilesets[x.tileLayer].data.tileset.tile==null)return 0;
    var tileOrTiles: ITiledTilesetDataTile[] = singleItemOrArray(
      executionData.tilesets[x.tileLayer].data.tileset.tile
    );

    if (tileOrTiles == null) return 0;
    if (tileOrTiles.length == 0) return 0;

    var tilesetTileData = tileOrTiles
      .filter((y) => y !== null && y !== undefined)
      .find((y) => y.id == x.index + "");

    if (tilesetTileData == null) return 0;

    var propertyOrProperties: ITiledTilesetDataTileProperty[] =
      singleItemOrArray(tilesetTileData.properties.property);

    var typeProperty = propertyOrProperties.find((y) => y.name == "color-palette");

    if (typeProperty == null) return 0;

    var n = Number.NaN;

    try {
      n = Number(typeProperty.value);
    } catch (e) {}

    return isNaN(n) ? 0 : n;
  });
};
const getSolidMaps = (
  executionData: ExecutionData,
  executionDataLevel: ExecutionDataLevel
  ) => {
    executionDataLevel.solidMap = executionDataLevel.finalItems.map((x) => {
    if(executionData.tilesets[x.tileLayer]==null)return 0;
    if(executionData.tilesets[x.tileLayer].data==null)return 0;
    if(executionData.tilesets[x.tileLayer].data.tileset==null)return 0;
    if(executionData.tilesets[x.tileLayer].data.tileset.tile==null)return 0;
    var tileOrTiles: ITiledTilesetDataTile[] = singleItemOrArray(
      executionData.tilesets[x.tileLayer].data.tileset.tile
    );

    if (tileOrTiles == null) return 0;
    if (tileOrTiles.length == 0) return 0;

    var tilesetTileData = tileOrTiles
      .filter((y) => y !== null && y !== undefined)
      .find((y) => y.id == x.index + "");

    if (tilesetTileData == null) return 0;

    var propertyOrProperties: ITiledTilesetDataTileProperty[] =
      singleItemOrArray(tilesetTileData.properties.property);

    var typeProperty = propertyOrProperties.find((y) => y.name == "solid-map-type");

    if (typeProperty == null) return 0;

    var n = Number.NaN;

    try {
      n = Number(typeProperty.value);
    } catch (e) {}

    return isNaN(n) ? 0 : n;
  });
};

const getTotalObjects = (
  tiledTMXFileData: ITiledFileData,
  executionData: ExecutionData,
  executionDataLevel: ExecutionDataLevel,
) => {
  // Get the object groups
  executionData.objectGroups = singleItemOrArray(
    tiledTMXFileData.map.objectgroup
  );

  const fieldNames = executionData.objectFields.map((x) => x.name);

  executionData.objectGroups.forEach((objectGroup) => {
    const objects: ITiledMapObjectGroupObject[] = singleItemOrArray(
      objectGroup.object
    );

    objects.forEach((object: ITiledMapObjectGroupObject) => {
      const column = Math.floor(Number(object.x)/8);
      const row = Math.floor(Number(object.y)/8);
      const mapColumnCount = Math.floor(executionDataLevel.mapWidth);
      var data: ExportObject = {
        x: Math.floor(Number(object.x)),
        y: Math.floor(Number(object.y)),
        id: Number(object.id),
        tileIndex:  column+row*mapColumnCount,
        customData:{}
      };

      console.log("object at index: "+data.tileIndex)

      // Apply default value to all properties to things
      executionData.objectFields.forEach((field) => {
        data.customData[field.name] = 0;
      });

      // Check all of the object's properties
      singleItemOrArray(object.properties ? object.properties.property : []).forEach(
        (property: ITiledTilesetDataTileProperty) => {

          // If this property was included to be exported
          if (fieldNames.includes(property.name)) {
            var val: any = property.value;

            var field = executionData.objectFields.find(
              (x) => x.name == property.name
            );

            if (field) {
              data.customData[property.name] = val;
            }
          }
        }
      );

      executionDataLevel.totalObjects.push(data);
    });
  });
};
