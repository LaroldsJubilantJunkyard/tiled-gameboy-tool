import { ExecutionData, InputFileFormat } from "./models/tiled-gameboy-tool-types";
import { readProcessArguments } from './actions/arguments.action';
import { exportExecutionData } from "./actions/export.action";
import { processTiledTMXFile } from "./actions/process-tiled.action";
import { getDefaultExecutionData, getExecutionInputFileFormat } from "./utils/execution.utils";
import { processLDTKFile } from "./actions/process-ldtk.action";

/**
 * The primary execution logic has been isolated into a function so it can be called from tests
 * 1. Process the arguments
 * 2. Process editor data
 * 3. Export data
 */
export default (processArguments:string[])=>{
        
    /**
     * Make sure we have at least 3 arguments.
     */
    if(processArguments.length<3){

        console.log("Not enough arguments passed");
        process.exit(400);
    }

    // Get our execution data with our tmx file
    var executionData: ExecutionData = getDefaultExecutionData(processArguments)

    readProcessArguments(executionData);
    
    switch(getExecutionInputFileFormat(executionData)){
        case InputFileFormat.Tiled: processTiledTMXFile(executionData); break;
        case InputFileFormat.LDtk: processLDTKFile(executionData); break;


        // If a input type isn't specified
        default: 

            // Return an error
            console.error(`input file not specified`);
            console.error(`Used '--tiled <file-name>' or '--ldtk <file-name>'`);
            process.exit(400);

    }
    exportExecutionData(executionData);

}