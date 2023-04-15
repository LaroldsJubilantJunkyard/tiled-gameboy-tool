import { ITiledFileData, ITiledTilesetFileData } from "../models/tiled-types";
import fs from "fs"
const parser = require('xml2json');

export function readTiledTMXFile(file:string):ITiledFileData{

    
    var contents = fs.readFileSync(file,{encoding:"utf-8", flag:'r'})
    var stringContents = contents.toString()

    var jsonString= parser.toJson(stringContents)
    var json = JSON.parse(jsonString);

    return json as ITiledFileData
}

export function readTileset(path:string):ITiledTilesetFileData{
    
    var contents = fs.readFileSync(path,{encoding:"utf-8", flag:'r'})
    var stringContents = contents.toString()
    
    var jsonString= parser.toJson(stringContents)
    return JSON.parse(jsonString) as ITiledTilesetFileData;
}