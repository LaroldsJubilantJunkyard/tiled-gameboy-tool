import { ExecutionData, InputFileFormat } from "./models/tiled-gameboy-tool-types";
import { readProcessArguments } from './actions/arguments.action';
import { exportExecutionData } from "./actions/export.action";
import { processTiledTMXFile } from "./actions/process-tiled.action";
import { getDefaultExecutionData, getExecutionInputFileFormat } from "./utils/execution.utils";
import { processLDTKFile } from "./actions/process-ldtk.action";
import { verifyExecutionData } from "./actions/verify.action";

/**
 * The primary execution logic has been isolated into a function so it can be called from tests
 * 1. Process the arguments
 * 2. Verify all the data
 * 3. Process editor data
 * 4. Export data
 */
export default async (processArguments:string[])=>{
        
    /**
     * Make sure we have at least 3 arguments.
     */
    if(processArguments.length<3){

        console.log("Not enough arguments passed");
        process.exit(400);

        // neccessary for when process.exit is mocked
        return;
    }

    // Get our execution data with our tmx file
    var executionData: ExecutionData = getDefaultExecutionData(processArguments)

    readProcessArguments(executionData);

    // Check our execution data
    if(!verifyExecutionData(executionData)){
        
        process.exit(400);

        // neccessary for when process.exit is mocked
        return;
    }
    
    switch(getExecutionInputFileFormat(executionData)){
        case InputFileFormat.Tiled: await processTiledTMXFile(executionData); break;
        case InputFileFormat.LDtk: await processLDTKFile(executionData); break;

        // If a input type isn't specified
        default: 

            // Return an error
            console.error(`input file not specified`);
            console.error(`Used '--tiled <file-name>' or '--ldtk <file-name>'`);
            process.exit(400);

            // neccessary for when process.exit is mocked
            return;

    }

    exportExecutionData(executionData);

}