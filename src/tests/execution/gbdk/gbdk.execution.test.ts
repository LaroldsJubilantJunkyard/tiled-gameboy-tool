import {execSync} from 'child_process'
import {existsSync} from 'fs'
import {resolve} from 'path'

describe('gbdk intergration tests',()=>{

    test('gbdk export',async ()=>{

        execSync("make",{cwd:__dirname})

        expect(existsSync(resolve(__dirname,"obj","Example.gb"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","Enemies.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","Enemies.h"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","world1area1.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","world1area1.h"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","World1Tileset.c"))).toBeTruthy();
        expect(existsSync(resolve(__dirname,"gen","World1Tileset.h"))).toBeTruthy();
    })
})