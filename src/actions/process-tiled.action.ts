import { ExecutionData } from "../models/tiled-gameboy-tool-types";
import {
  ITiledFileData,
  ITiledMapObjectGroupObject,
  ITiledTileset,
  ITiledTilesetDataTileProperty,
} from "../models/tiled-types";
import { readTiledTMXFile, readTileset } from "../services/tiled.service";
import { getFinalItemsFromLayers } from "../utils/layers.utils";
import { singleItemOrArray } from "../utils/micc.utils";
import { getIdentifierForString } from "../utils/string.utils";

export const processTiledTMXFile = (executionData: ExecutionData) => {
  // Readthe TMX file
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

  // Get the map layers
  executionData.layers = singleItemOrArray(tiledTMXFileData.map.layer);

  // Get the object groups
  executionData.objectGroups = singleItemOrArray(
    tiledTMXFileData.map.objectgroup
  );

  // Getthe final items from the layers
  executionData.finalItems = getFinalItemsFromLayers(executionData);

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

  // Apply features
  executionData.features.forEach((x) => x.action(x.data, executionData));
};
