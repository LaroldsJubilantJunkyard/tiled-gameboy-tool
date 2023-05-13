import { ExecutionData, ObjectField } from "../models/tiled-gameboy-tool-types";
import { getObjectFieldDeclaration } from "../utils/code-gen.utils";
import fs from "fs";

export const verifyExecutionData = (executionData: ExecutionData) => {
  var exit = false;

  // Make sure we have a valid bank value
  if (
    executionData.bank != "AUTOBANKED" &&
    executionData.bank != "NONBANKED" &&
    !Number.isInteger(executionData.bank)
  ) {
    console.error(`Invalid bank value passed in: ${executionData.bank}`);
    console.error(
      `Valid Values Include: AUTOBANKED, NONBANKED, or an integer value`
    );
    exit = true;
  }

  // Check each field
  executionData.objectFields.forEach((field: ObjectField) => {
    const { name, type } = field;

    // Make sure we have a proper type
    if (getObjectFieldDeclaration({ name, type }) == "") {
      console.error(`Invalid type provided for ${name}: ${type}`);
      exit = true;
    }
  });

    // Make sure the output directory exists
    if (!fs.existsSync(executionData.outputDirectory)) {
        console.error(
          `The specified output directory does not exist: ${executionData.outputDirectory}`
        );
        exit = true;
      }

      
    // Make sure the output directory exists
    if (!fs.existsSync(executionData.inputFile)) {
        console.error(
          `The specified input file does not exist: ${executionData.inputFile}`
        );
        exit = true;
      }

      
    return !exit;
};
