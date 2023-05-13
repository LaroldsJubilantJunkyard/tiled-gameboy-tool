import {execSync} from 'child_process'
import {existsSync,mkdirSync} from 'fs'
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
  });

afterEach(() => {

    // Restore the origina values to our globals
    global.process = realProcess;
    global.console = realConsole;
    jest.clearAllMocks();
});



describe('default integration test',()=>{


    test('exits with 400 without enough parameters',async ()=>{

        // Create out directory if neccessary
        if(!existsSync(resolve(process.cwd(),"gen")))mkdirSync(resolve(process.cwd(),"gen"));

        runTiledGameboyTool(["not","enough"])
        
        expect(mockExit).toBeCalledWith(400);
        
    });
    test('exits with 400 when no input file is specified',async ()=>{

        // Create out directory if neccessary
        if(!existsSync(resolve(process.cwd(),"gen")))mkdirSync(resolve(process.cwd(),"gen"));

        runTiledGameboyTool(["no","input","file"])
        
        expect(mockExit).toBeCalledWith(400);
        
    });
    test('exits with 400 when no proper output directory is called',async ()=>{

        runTiledGameboyTool(["irrellevant","irrellevant","--output-dir","./does/not/exist"])
        
        expect(mockExit).toBeCalledWith(400);
        
    });
    test('exits with 400 when non-existant tiled file is given',async ()=>{

        runTiledGameboyTool(["irrellevant","irrellevant","--tiled","./does/not/exist/tiled.tmx"])
        
        expect(mockExit).toBeCalledWith(400);
        
    });
    test('exits with 400 when non-existant ldtk file is given',async ()=>{

        runTiledGameboyTool(["irrellevant","irrellevant","--ldtk","./does/not/exist/ldtk.ldtk"])
        
        expect(mockExit).toBeCalledWith(400);
        
    });

    test('generates world1area1 .c and .h files for gbdk',async ()=>{

        // Create out directory if neccessary
        if(!existsSync(resolve(process.cwd(),"gen")))mkdirSync(resolve(process.cwd(),"gen"));

        runTiledGameboyTool(["irrellevant","irrelevant","--gbdk","--tiled","./res/World1Area1.tmx","--output-dir","./gen"])
        
        expect(existsSync(resolve(process.cwd(),"gen","world1area1.c"))).toBeTruthy();
        expect(existsSync(resolve(process.cwd(),"gen","world1area1.h"))).toBeTruthy();
        
    });

    test('generates world1area1 .asm files for rgbds',async ()=>{

        // Create out directory if neccessary
        if(!existsSync(resolve(process.cwd(),"gen")))mkdirSync(resolve(process.cwd(),"gen"));

        runTiledGameboyTool(["irrellevant","irrelevant","--rgbds","--tiled","./res/World1Area1.tmx","--output-dir","./gen"])
        
        expect(existsSync(resolve(process.cwd(),"gen","world1area1.asm"))).toBeTruthy();
        
    });
})