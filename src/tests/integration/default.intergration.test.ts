import {execSync} from 'child_process'
import {existsSync,mkdirSync,rmSync} from 'fs'
import {resolve} from 'path'
import runTiledGameboyTool from '../../run-tiled-gameboy-tool'


var mockExit = jest.fn();
var consoleLog = jest.fn();
var consoleError = jest.fn();
var consoleWarn = jest.fn();
var mockExit = jest.fn();

var realProcess:any = null;
var realConsole:any = null;

beforeEach(() => {
    realProcess = process;
    realConsole = console;

    // Mock the console so errors and logs don't show during testing
    // Mock the process.exit function so it doesn't exit
    global.console = {...realConsole, log:consoleLog,error:consoleError,warn:consoleWarn}

    // Use the current directory as the workign directory
    global.process = { ...realProcess, exit: mockExit,cwd:()=>__dirname };

    // Create out directory if neccessary
    if(!existsSync(resolve(process.cwd(),"gen")))mkdirSync(resolve(process.cwd(),"gen"));
  });

afterEach(() => {

    // Restore the origina values to our globals
    global.process = realProcess;
    global.console = realConsole;
    jest.clearAllMocks();

    // Clear the gen directory
    rmSync(resolve(process.cwd(),"gen"), { recursive: true, force: true });
});



describe('default integration test',()=>{


    test('exits with 400 without enough parameters',async ()=>{

        await runTiledGameboyTool(["not","enough"])
        
        expect(mockExit).toBeCalledWith(400);
        
    });
    test('exits with 400 when no input file is specified',async ()=>{

        await runTiledGameboyTool(["no","input","file"])
        
        expect(mockExit).toBeCalledWith(400);
        
    });
    test('exits with 400 when no proper output directory is called',async ()=>{

        await runTiledGameboyTool(["irrellevant","irrellevant","--output-dir","./does/not/exist"])
        
        expect(mockExit).toBeCalledWith(400);
        
    });
    test('exits with 400 when non-existant tiled file is given',async ()=>{

        await runTiledGameboyTool(["irrellevant","irrellevant","--tiled","./does/not/exist/tiled.tmx"])
        
        expect(mockExit).toBeCalledWith(400);
        
    });
    test('exits with 400 when non-existant ldtk file is given',async ()=>{

        await runTiledGameboyTool(["irrellevant","irrellevant","--ldtk","./does/not/exist/ldtk.ldtk"])
        
        expect(mockExit).toBeCalledWith(400);
        
    });

    test('generates world1area1 .c and .h files for gbdk',async ()=>{

        await runTiledGameboyTool(["irrellevant","irrelevant","--gbdk","--tiled","./res/World1Area1.tmx","--output-dir","./gen"])
        
        expect(existsSync(resolve(process.cwd(),"gen","world1area1.c"))).toBeTruthy();
        expect(existsSync(resolve(process.cwd(),"gen","world1area1.h"))).toBeTruthy();
        
    });

    test('generates world1area1 .asm files for rgbds',async ()=>{

        await runTiledGameboyTool(["irrellevant","irrelevant","--rgbds","--tiled","./res/World1Area1.tmx","--output-dir","./gen"])
        
        expect(existsSync(resolve(process.cwd(),"gen","world1area1.asm"))).toBeTruthy();
        
    });

    test('generates ldtk_test_project .c and .h files for each level for gbdk',async ()=>{

        await runTiledGameboyTool(["irrellevant","irrelevant","--gbdk","--ldtk","./res/ldtk-test-project.ldtk","--output-dir","./gen"])
        
        expect(existsSync(resolve(process.cwd(),"gen","ldtk_test_project_autolayer.c"))).toBeTruthy();
        expect(existsSync(resolve(process.cwd(),"gen","ldtk_test_project_autolayer.h"))).toBeTruthy();
        
    });

    test('generates ldtk_test_project .asm files for each level for rgbds',async ()=>{

        await runTiledGameboyTool(["irrellevant","irrelevant","--rgbds","--ldtk","./res/ldtk-test-project.ldtk","--output-dir","./gen"])
        
        expect(existsSync(resolve(process.cwd(),"gen","ldtk_test_project_autolayer.asm"))).toBeTruthy();
        
    });
})