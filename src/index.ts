#!/usr/bin/env node

import { ExecutionData } from "./models/tiled-gameboy-tool-types";
import fs from 'fs';
import { readProcessArguments } from './actions/arguments.action';
import { exportExecutionData } from "./actions/export.action";
import { processTiledTMXFile } from "./actions/process-tiled.action";
import { getDefaultExecutionData } from "./utils/execution.utils";

/**
 * Make sure we have atleast 3 arguments.
 */
if(process.argv.length<3){

    console.log("Not enough arguments passed");
    process.exit(400);
}

/**
 * Make sure a file exists for the final argument
 */
if(!fs.existsSync(process.argv[process.argv.length-1])){

    console.log("File does not exist: "+process.argv[process.argv.length-1]);
    process.exit(404);
}

var executionData: ExecutionData = getDefaultExecutionData()

readProcessArguments(executionData);
processTiledTMXFile(executionData);
exportExecutionData(executionData);
