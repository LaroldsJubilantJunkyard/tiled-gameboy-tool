import { ExecutionData, InputFileFormat } from "../models/tiled-gameboy-tool-types";
import { getIdentifierForFile } from "../utils/string.utils";
import { getObjectFieldDeclaration } from "../utils/code-gen.utils";
import fs from "fs";
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

      executionData.inputFile = inputFile
      executionData.inputFileFormat = InputFileFormat.Tiled;

      // Check if we don't already have an identifier passed in
      if(executionData.identifier.length==0)executionData.identifier = getIdentifierForFile(inputFile);
    } else if (arg == "-d" || arg == "--output-dir") {
      const od = executionData.processArguments[++i];

      // set the output directory
      executionData.outputDirectory = getAbsoluteUrl(od)

      // Make sure the output directory exists
      if (!fs.existsSync(executionData.outputDirectory)) {
        console.error(
          `The specified output directory does not exist: ${executionData.outputDirectory}`
        );
        process.exit();
      }
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
      const name: string = executionData.processArguments[++i];
      const type: string = executionData.processArguments[++i];

      // Make sure we have a proper type
      if (getObjectFieldDeclaration({ name, type }) == "") {
        console.error(`Invalid type provided for ${name}: ${type}`);
        process.exit();
      }
      executionData.objectFields.push({ name, type });
    } else if (arg == "-b" || arg == "--bank") {

      const newBank = executionData.processArguments[++i];

      // Make sure we have a valid bank value
      if(newBank!="AUTOBANKED"&&newBank!="NONBANKED"&&!Number.isInteger(newBank)){
        
        console.error(`Invalid bank value passed in: ${newBank}`);
        console.error(`Valid Values Include: AUTOBANKED, NONBANKED, or an integer value`);
        process.exit();
      }
      // Set the bank
      executionData.bank = newBank;
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
