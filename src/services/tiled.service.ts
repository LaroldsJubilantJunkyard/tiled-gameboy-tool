import { ITiledFileData, ITiledTilesetFileData } from "../models/tiled-types";
import fs from "fs"
import {sep,extname} from 'path'
import { readXMLFileAsJson } from "../utils/file.utils";
const parser = require('xml2json');

export function readTiledTMXFile(file:string):ITiledFileData|null{
    
    // Make sure the file actually exists
    if(!fs.existsSync(file))return null;

    try{
        return readXMLFileAsJson<ITiledFileData>(file);
    }catch(e){
        console.log(e)
        console.log("an error occured while trying to read "+file)
        return null;
    }
}

export function readTileset(file:string):ITiledTilesetFileData{
    
    return readXMLFileAsJson<ITiledTilesetFileData>(file);
}

export function getTiledTMXFiles(inputFile:string):string[]{

    var tmxFiles = [inputFile]

    // If this is a directory
    if(fs.lstatSync(inputFile).isDirectory()){

        tmxFiles = [];

        // Get everything in the directory
        var files:string[] = fs.readdirSync(inputFile);

        // For each object in the directory
        files.forEach(file=>{

            // Convert to the full file name
            const fullFileName=inputFile+sep+file

            // Get the file information
            const lstat = fs.lstatSync(fullFileName)

            // If this is a tmx file
            if(lstat.isFile() && extname(fullFileName).trim().toLowerCase()==".tmx"){
                tmxFiles.push(fullFileName)
            }
        })
    }

    return tmxFiles
}