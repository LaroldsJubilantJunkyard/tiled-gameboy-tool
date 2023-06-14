import {execSync} from 'child_process'
import {existsSync,mkdirSync,rmSync} from 'fs'
import {resolve} from 'path'

beforeEach(() => {

    // Create out directory if neccessary
    mkdirSync(resolve(process.cwd(),"gen"),{ recursive: true });
  });

afterEach(() => {
    
    jest.clearAllMocks();

    // Clear the gen directory
    rmSync(resolve(process.cwd(),"gen"), { recursive: true, force: true });
});



describe('gbdk execution tests',()=>{

    test.onLinux('linux executable exists',async ()=>{

        execSync("make run-gbdk-tiled",{cwd:__dirname,env:{"EXECUTION_PLATFORM":"linux","GBDK_HOME":process.env.GBDK_HOME}})

        expect(existsSync(resolve(__dirname,"..","..","..","..","dist","linux","tiled-gameboy-tool"))).toBeTruthy();
    })

    test.onLinux('linux tiled export creates proper files',async ()=>{

        execSync("make run-gbdk-tiled",{cwd:__dirname,env:{"EXECUTION_PLATFORM":"linux","GBDK_HOME":process.env.GBDK_HOME}})

        expect(existsSync(resolve(__dirname,"obj","Example.gb"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","Enemies.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","Enemies.h"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","world1area1.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","world1area1.h"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","World1Tileset.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","World1Tileset.h"))).toBeTruthy();
    })

    test.skip('linux ldtk export creates proper files',async ()=>{

        execSync("make run-gbdk-ldtk",{cwd:__dirname,env:{"EXECUTION_PLATFORM":"linux","GBDK_HOME":process.env.GBDK_HOME}})

        expect(existsSync(resolve(__dirname,"obj","Example.gb"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","Enemies.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","Enemies.h"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","ldtk_test_project_autolayer.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","ldtk_test_project_autolayer.h"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","ldtk_test_project_world_level_1.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","ldtk_test_project_world_level_1.h"))).toBeTruthy();
    })

    test.onWindows('windows executable exists',async ()=>{

        execSync("make run-gbdk-tiled",{cwd:__dirname,env:{"EXECUTION_PLATFORM":"windows","GBDK_HOME":process.env.GBDK_HOME}})

        expect(existsSync(resolve(__dirname,"..","..","..","..","dist","windows","tiled-gameboy-tool.exe"))).toBeTruthy();
    })

    test.onWindows('windows tiled export creates proper files',async ()=>{

        execSync("make run-gbdk-tiled",{cwd:__dirname,env:{"EXECUTION_PLATFORM":"windows","GBDK_HOME":process.env.GBDK_HOME}})

        expect(existsSync(resolve(__dirname,"obj","Example.gb"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","Enemies.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","Enemies.h"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","world1area1.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","world1area1.h"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","World1Tileset.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","World1Tileset.h"))).toBeTruthy();
    })

    test.skip('windows ldtk export creates proper files',async ()=>{

        execSync("make run-gbdk-ldtk",{cwd:__dirname,env:{"EXECUTION_PLATFORM":"windows","GBDK_HOME":process.env.GBDK_HOME}})

        expect(existsSync(resolve(__dirname,"obj","Example.gb"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","Enemies.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","Enemies.h"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","ldtk_test_project_autolayer.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","ldtk_test_project_autolayer.h"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","ldtk_test_project_world_level_1.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","ldtk_test_project_world_level_1.h"))).toBeTruthy();
    })

    test.onMac('macos executable exists',async ()=>{

        execSync("make run-gbdk-tiled",{cwd:__dirname,env:{"EXECUTION_PLATFORM":"macos","GBDK_HOME":process.env.GBDK_HOME}})

        expect(existsSync(resolve(__dirname,"..","..","..","..","dist","macos","tiled-gameboy-tool"))).toBeTruthy();
    })


    test.onMac('macos tiled export creates proper files',async ()=>{

        execSync("make run-gbdk-tiled",{cwd:__dirname,env:{"EXECUTION_PLATFORM":"macos","GBDK_HOME":process.env.GBDK_HOME}})

        expect(existsSync(resolve(__dirname,"obj","Example.gb"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","Enemies.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","Enemies.h"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","world1area1.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","world1area1.h"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","World1Tileset.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","World1Tileset.h"))).toBeTruthy();
    })

    test.skip('macos ldtk export creates proper files',async ()=>{

        execSync("make run-gbdk-ldtk",{cwd:__dirname,env:{"EXECUTION_PLATFORM":"macos","GBDK_HOME":process.env.GBDK_HOME}})

        expect(existsSync(resolve(__dirname,"obj","Example.gb"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","Enemies.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","Enemies.h"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","ldtk_test_project_autolayer.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","ldtk_test_project_autolayer.h"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","ldtk_test_project_world_level_1.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","ldtk_test_project_world_level_1.h"))).toBeTruthy();
    })
})