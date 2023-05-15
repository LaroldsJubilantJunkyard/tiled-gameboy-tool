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

    test('tiled export',async ()=>{

        execSync("make run-gbdk-tiled",{cwd:__dirname})

        expect(existsSync(resolve(__dirname,"obj","Example.gb"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","Enemies.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","Enemies.h"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","world1area1.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","world1area1.h"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","World1Tileset.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","World1Tileset.h"))).toBeTruthy();
    })

    test('ldtk export',async ()=>{

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