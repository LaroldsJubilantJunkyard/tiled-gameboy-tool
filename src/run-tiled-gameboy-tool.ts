import { ExecutionData } from "./models/tiled-gameboy-tool-types";
import fs from 'fs';
import {extname,sep} from 'path'
import { readProcessArguments } from './actions/arguments.action';
import { exportExecutionData } from "./actions/export.action";
import { processTiledTMXFile } from "./actions/process-tiled.action";
import { getDefaultExecutionData } from "./utils/execution.utils";
import { getAbsoluteUrl } from "./utils/file.utils";
import { getTiledTMXFiles } from "./services/tiled.service";

/**
 * The primary execution logic has been isolated into a function so it can be called from tests
 */
export default (processArguments:string[])=>{
        
    /**
     * Make sure we have atleast 3 arguments.
     */
    if(processArguments.length<3){

        console.log("Not enough arguments passed");
        process.exit(400);
    }

    const inputFile = getAbsoluteUrl(processArguments[processArguments.length-1]);

    /**
     * Make sure a file exists for the final argument
     */
    if(!fs.existsSync(inputFile)){

        console.log("File does not exist: "+inputFile);
        process.exit(404);
    }

    var tmxFiles:string[] = getTiledTMXFiles(inputFile)

    /**
     * Run the execution logic for each file in our list
     */
    tmxFiles.forEach(tmxFilePath=>{

        console.log("Processing: "+tmxFilePath);

        // Get our execution data with our tmx file
        var executionData: ExecutionData = getDefaultExecutionData(tmxFilePath,processArguments)

        // 1. Process the arguments
        // 2. Process tile data
        // 3. Export data
        readProcessArguments(executionData);
        processTiledTMXFile(executionData);
        exportExecutionData(executionData);

    })

}