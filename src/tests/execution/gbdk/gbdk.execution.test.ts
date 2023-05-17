import {execSync} from 'child_process'
import {existsSync,mkdirSync,rmSync} from 'fs'
import {resolve} from 'path'

beforeEach(() => {

    // Create out directory if neccessary
    if(!existsSync(resolve(process.cwd(),"gen")))mkdirSync(resolve(process.cwd(),"gen"));
  });

afterEach(() => {
    
    jest.clearAllMocks();

    // Clear the gen directory
    rmSync(resolve(process.cwd(),"gen"), { recursive: true, force: true });
});



describe('gbdk execution tests',()=>{

    test.onLinux('linux tiled export',async ()=>{

        execSync("make run-linux-gbdk-tiled",{cwd:__dirname})

        expect(existsSync(resolve(__dirname,"obj","Example.gb"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","Enemies.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","Enemies.h"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","world1area1.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","world1area1.h"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","World1Tileset.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","World1Tileset.h"))).toBeTruthy();
    })

    test.onLinux('linux ldtk export',async ()=>{

        execSync("make run-linux-gbdk-ldtk",{cwd:__dirname})

        expect(existsSync(resolve(__dirname,"obj","Example.gb"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","Enemies.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","Enemies.h"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","ldtk_test_project_autolayer.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","ldtk_test_project_autolayer.h"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","ldtk_test_project_world_level_1.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","ldtk_test_project_world_level_1.h"))).toBeTruthy();
    })

    test.onWindows('tiled export',async ()=>{

        execSync("make run-gbdk-tiled",{cwd:__dirname})

        expect(existsSync(resolve(__dirname,"obj","Example.gb"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","Enemies.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","Enemies.h"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","world1area1.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","world1area1.h"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","World1Tileset.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","World1Tileset.h"))).toBeTruthy();
    })

    test.onWindows('ldtk export',async ()=>{

        execSync("make run-gbdk-ldtk",{cwd:__dirname})

        expect(existsSync(resolve(__dirname,"obj","Example.gb"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","Enemies.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","Enemies.h"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","ldtk_test_project_autolayer.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","ldtk_test_project_autolayer.h"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","ldtk_test_project_world_level_1.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","ldtk_test_project_world_level_1.h"))).toBeTruthy();
    })
})