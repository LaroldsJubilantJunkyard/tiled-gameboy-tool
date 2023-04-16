import { ExecutionData } from "../models/tiled-gameboy-tool-types";
import offsetFeature from "../features/offset";
import objectsFeature from "../features/objects";
import solidMapFeature from "../features/solid-map";
import { getIdentifierForFile } from "../utils/string.utils";
import { singleItemOrArray } from "../utils/micc.utils";
import { readTiledTMXFile, readTileset } from "../services/tiled.service";
import { ITiledFileData, ITiledTileset } from "../models/tiled-types";
import { getFinalItemsFromLayers } from "../utils/layers.utils";
import {isAbsolute,sep} from 'path'

export const readProcessArguments = ( executionData: ExecutionData) => {


  executionData.inputFile = process.argv[process.argv.length - 1];
  executionData.identifier = getIdentifierForFile(executionData.inputFile);

  for (var i = 2; i < process.argv.length; i++) {
    var arg = process.argv[i];

    if (arg == "-d" || arg == "--output-dir") {


      const od = process.argv[++i]

      // set the output directory
      executionData.outputDirectory = isAbsolute(od) ? od : process.cwd()+sep+od
    }  else if (arg == "-obj" || arg == "--objects") {
      // Add the solid map feature
      executionData.features.push({
        name: "objects",
        data: null,
        action: objectsFeature,
      });
    }  else if (arg == "--object-field") {
      // add the object ield
      executionData.objectFields.push({name:process.argv[++i],type:process.argv[++i]})
    } else if (arg == "-b" || arg == "--bank") {
      // Set the bank
      executionData.bank = process.argv[++i];
    } else if (arg == "-sm" || arg == "--solid-map") {
      // Add the solid map feature
      executionData.features.push({
        name: "solid-map",
        data: process.argv[++i],
        action: solidMapFeature,
      });
    } else if (arg == "-x" || arg == "--export-type") {
      // Set the export type
      executionData.exportType = process.argv[++i];
    } else if (arg == "-o" || arg == "--offset") {
      // Add the offset feature
      executionData.features.push({
        name: "offset",
        data: Number(process.argv[++i]),
        action: offsetFeature,
      });
    }
  }
  
  


  return executionData;
};
