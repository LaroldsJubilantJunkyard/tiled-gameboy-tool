#!/usr/bin/env node

import { ExecutionData } from "./models/tiled-gameboy-tool-types";
import fs from 'fs';
import {extname,sep} from 'path'
import { readProcessArguments } from './actions/arguments.action';
import { exportExecutionData } from "./actions/export.action";
import { processTiledTMXFile } from "./actions/process-tiled.action";
import { getDefaultExecutionData } from "./utils/execution.utils";
import { getAbsoluteUrl } from "./utils/file.utils";

/**
 * Make sure we have atleast 3 arguments.
 */
if(process.argv.length<3){

    console.log("Not enough arguments passed");
    process.exit(400);
}

const inputFile = getAbsoluteUrl(process.argv[process.argv.length-1]);

/**
 * Make sure a file exists for the final argument
 */
if(!fs.existsSync(inputFile)){

    console.log("File does not exist: "+inputFile);
    process.exit(404);
}

var tmxFiles:string[] = []

// If this is a directory
if(fs.lstatSync(inputFile).isDirectory()){

    // Get everything in the directory
    var files:string[] = fs.readdirSync(inputFile);

    // For each object in the directory
    files.forEach(file=>{

        // Convert to the full file name
        const fullFileName=inputFile+sep+file

        // Get the file information
        const lstat = fs.lstatSync(fullFileName)

        // If this is a tmx file
        if(lstat.isFile() && extname(fullFileName).trim().toLowerCase()==".tmx"){
            tmxFiles.push(fullFileName)
        }
    })
}

/**
 * Run the execution logic for each file in our list
 */
tmxFiles.forEach(tmxFilePath=>{

    console.log("Processing: "+tmxFilePath);

    // Get our execution data with our tmx file
    var executionData: ExecutionData = getDefaultExecutionData(tmxFilePath)

    // 1. Process the arguments
    // 2. Process tile data
    // 3. Export data
    readProcessArguments(executionData);
    processTiledTMXFile(executionData);
    exportExecutionData(executionData);

})
