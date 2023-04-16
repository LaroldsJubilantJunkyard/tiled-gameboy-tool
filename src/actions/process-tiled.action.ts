import { ExecutionData } from "../models/tiled-gameboy-tool-types";
import { ITiledFileData, ITiledTileset } from "../models/tiled-types";
import { readTiledTMXFile, readTileset } from "../services/tiled.service";
import { getFinalItemsFromLayers } from "../utils/layers.utils";
import { singleItemOrArray } from "../utils/micc.utils";

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

  // Apply features
  executionData.features.forEach((x) => x.action(x.data, executionData));
};
