import { ExecutionData, InputFileFormat } from "../models/tiled-gameboy-tool-types";
import { getIdentifierForFile } from "../utils/string.utils";
import { getAbsoluteUrl } from "../utils/file.utils";
export const readProcessArguments = (executionData: ExecutionData) => {

  executionData.identifier="";

  // Loopthrough all the process arguments, skipping the first two command line arguments
  for (var i = 2; i < executionData.processArguments.length; i++) {
    var arg = executionData.processArguments[i];

    if (arg == "--ldtk") {
      const inputFile = executionData.processArguments[++i];

      executionData.inputFile = inputFile
      executionData.inputFileFormat = InputFileFormat.LDtk;

      // Check if we don't already have an identifier passed in
      if(executionData.identifier.length==0)executionData.identifier = getIdentifierForFile(inputFile);
    } else if (arg == "--tiled") {
      const inputFile = executionData.processArguments[++i];

      executionData.inputFile = getAbsoluteUrl(inputFile)
      executionData.inputFileFormat = InputFileFormat.Tiled;

      // Check if we don't already have an identifier passed in
      if(executionData.identifier.length==0)executionData.identifier = getIdentifierForFile(inputFile);
    } else if (arg == "-d" || arg == "--output-dir") {

      // set the output directory
      executionData.outputDirectory = getAbsoluteUrl(executionData.processArguments[++i])    
    } else if (arg == "-obj" || arg == "--export-objects") {
      // Add the solid map feature
      executionData.enableObjects = true;
    } else if (arg == "-id" || arg == "--identifier") {
      // manually set the identifier
      executionData.identifier = executionData.processArguments[++i];
    } else if (arg == "--object-struct-name") {
      // add the object ield
      executionData.objectStructName = executionData.processArguments[++i];
    } else if (arg == "--object-field") {
      // add the object field
      // The next argument will be the name & type respectively
      const type: string = executionData.processArguments[++i];
      const name: string = executionData.processArguments[++i];

      executionData.objectFields.push({ name, type });
    } else if (arg == "-b" || arg == "--bank") {
      // Set the bank
      executionData.bank = executionData.processArguments[++i];
    } else if (arg == "-sm" || arg == "--export-solid-map") {
      // Add the solid map feature
      executionData.enableSolidMap = true;
    } else if (arg == "--gbdk"||arg == "--rgbds") {
      // Set the export type
      executionData.exportType = arg.substring(2);
    } else if (arg == "-of" || arg == "--offset") {
      // Add the offset feature
      executionData.offset = Number(executionData.processArguments[++i]);
    }
  }

  return executionData;
};
