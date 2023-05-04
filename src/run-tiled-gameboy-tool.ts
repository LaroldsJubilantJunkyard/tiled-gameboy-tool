import { ExecutionData, InputFileFormat } from "./models/tiled-gameboy-tool-types";
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

    // Get our execution data with our tmx file
    var executionData: ExecutionData = getDefaultExecutionData(processArguments)

    // 1. Process the arguments
    // 2. Process tile data
    // 3. Export data
    readProcessArguments(executionData);
    
    switch(executionData.inputFileFormat){
        case InputFileFormat.Tiled: processTiledTMXFile(executionData); break;

    }
    exportExecutionData(executionData);

}