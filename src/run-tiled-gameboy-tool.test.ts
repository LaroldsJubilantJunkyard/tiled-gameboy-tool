import { ExecutionData, InputFileFormat } from "./models/tiled-gameboy-tool-types";
import {exportExecutionData} from "./actions/export.action";
import * as ExecutionUtils from "./utils/execution.utils";

import * as runTiledGameboyTool from "./run-tiled-gameboy-tool";
import { readProcessArguments } from "./actions/arguments.action";
import { processTiledTMXFile } from "./actions/process-tiled.action";
import { processLDTKFile } from "./actions/process-ldtk.action";
import { verifyExecutionData } from "./actions/verify.action";

var mockExit = jest.fn();
var consoleLog = jest.fn();
var consoleError = jest.fn();
var consoleWarn = jest.fn();
var mockExit = jest.fn();

var realProcess:any = null;
var realConsole:any = null;

jest.mock("./utils/execution.utils")
jest.mock("./actions/export.action");
jest.mock("./actions/verify.action",()=>{
    const originalModule = jest.requireActual('./actions/verify.action');
    return {
        _esModule:true,
        ...originalModule,
        verifyExecutionData:jest.fn((executionData:ExecutionData)=>true)
    }
});
jest.mock('./actions/arguments.action');
jest.mock("./actions/process-ldtk.action");
jest.mock("./actions/process-tiled.action");

beforeEach(() => {
    realProcess = process;
    realConsole = console;

    // Mock the console so errors and logs don't show during testing
    // Mock the process.exit function so it doesn't exit
    global.console = {...realConsole, log:consoleLog,error:consoleError,warn:consoleWarn}
    global.process = { ...realProcess, exit: mockExit };
  });

afterEach(() => {

    // Restore the origina values to our globals
    global.process = realProcess;
    global.console = realConsole;
    jest.clearAllMocks();
});



describe("Running the gameboy tool",()=>{
    test("3 arguments are required", async ()=>{

        await runTiledGameboyTool.default(["not","three"])

        expect(mockExit).toBeCalledWith(400)
    })
    test("fails when no input file type specified", async ()=>{
        
        // Make sure to set the none input file format
        // This triggers the failure
        jest.spyOn(ExecutionUtils,"getExecutionInputFileFormat").mockImplementationOnce(()=>InputFileFormat.None)

        const mockedGetDefaultExecutionData = jest.spyOn(ExecutionUtils,"getDefaultExecutionData")

        // Pass 3 arguments to avoid the exit for lack of proper arguments
        // The exact params are not handled here, and not necessary
        await runTiledGameboyTool.default(["three","arguments","minimum"])

        expect(mockedGetDefaultExecutionData).toBeCalled()
        expect(readProcessArguments).toBeCalled()
        expect(mockExit).toBeCalledWith(400)
    })

    test("processTiledTMXFile is called when '--tiled' is specified", async ()=>{

        // Make sure we force this to return tiled
        // This triggers tiled's action being called
        jest.spyOn(ExecutionUtils,"getExecutionInputFileFormat").mockImplementationOnce(()=>InputFileFormat.Tiled)

        // Pass 3 arguments to avoid the exit for lack of proper arguments
        // The exact params are not handled here, and not necessary
        await runTiledGameboyTool.default(["three","arguments","minimum"])

        expect(ExecutionUtils.getDefaultExecutionData).toBeCalled()
        expect(readProcessArguments).toBeCalled()
        expect(verifyExecutionData).toBeCalled()
        expect(processTiledTMXFile).toBeCalled()
        expect(exportExecutionData).toBeCalled()
        
        // This is the wrong action
        expect(processLDTKFile).not.toBeCalled()
        
    });

    test("processLDTKFile is called when '--ldtk' is specified", async ()=>{
        
        // Make sure we force this to return ldtk
        // This triggers ldtk's action being called
        jest.spyOn(ExecutionUtils,"getExecutionInputFileFormat").mockImplementationOnce(()=>InputFileFormat.LDtk)

        // Pass 3 arguments to avoid the exit for lack of proper arguments
        // The exact params are not handled here, and not necessary
        await runTiledGameboyTool.default(["three","arguments","minimum"])

        expect(ExecutionUtils.getDefaultExecutionData).toBeCalled()
        expect(readProcessArguments).toBeCalled()
        expect(verifyExecutionData).toBeCalled()
        expect(processLDTKFile).toBeCalled()
        expect(exportExecutionData).toBeCalled()
        
        // This is the wrong action
        expect(processTiledTMXFile).not.toBeCalled()
    });
})