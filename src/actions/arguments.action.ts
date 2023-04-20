import { ExecutionData } from "../models/tiled-gameboy-tool-types";
import { getIdentifierForFile } from "../utils/string.utils";
import { isAbsolute, sep } from "path";
import { getObjectFieldDeclaration } from "../utils/code-gen.utils";
import fs from "fs";
export const readProcessArguments = (executionData: ExecutionData) => {

  // The input file should be the last file
  // By defualt use the input file to derive the main identifier
  executionData.inputFile = process.argv[process.argv.length - 1];
  executionData.identifier = getIdentifierForFile(executionData.inputFile);

  // Loopthrough all the process arguments, skipping the first two command line arguments
  for (var i = 2; i < process.argv.length; i++) {
    var arg = process.argv[i];

    if (arg == "-d" || arg == "--output-dir") {
      const od = process.argv[++i];

      // set the output directory
      executionData.outputDirectory = isAbsolute(od)
        ? od
        : process.cwd() + sep + od;

      if (!fs.existsSync(executionData.outputDirectory)) {
        console.error(
          `The specified output directory does not exist: ${executionData.outputDirectory}`
        );
        process.exit();
      }
    } else if (arg == "-obj" || arg == "--enable-objects") {
      // Add the solid map feature
      executionData.enableObjects = true;
    } else if (arg == "-id" || arg == "--identifier") {
      // manually set the identifier
      executionData.identifier = process.argv[++i];
    } else if (arg == "--object-struct-name") {
      // add the object ield
      executionData.objectStructName = process.argv[++i];
    } else if (arg == "--object-field") {
      // add the object field
      // The next argument will be the name & type respectively
      const name: string = process.argv[++i];
      const type: string = process.argv[++i];

      // Make sure we have a proper type
      if (getObjectFieldDeclaration({ name, type }) == "") {
        console.error(`Invalid type provided for ${name}: ${type}`);
        process.exit();
      }
      executionData.objectFields.push({ name, type });
    } else if (arg == "-b" || arg == "--bank") {
      // Set the bank
      executionData.bank = process.argv[++i];
    } else if (arg == "-sm" || arg == "--solid-map") {
      // Add the solid map feature
      executionData.enableSolidMap = true;
    } else if (arg == "--gbdk"||arg == "--rgbds") {
      // Set the export type
      executionData.exportType = arg.substring(2);
    } else if (arg == "-of" || arg == "--offset") {
      // Add the offset feature
      executionData.offset = Number(process.argv[++i]);
    }
  }

  return executionData;
};
