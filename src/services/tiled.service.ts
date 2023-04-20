import { ITiledFileData, ITiledTilesetFileData } from "../models/tiled-types";
import fs from "fs"
import { readXMLFileAsJson } from "../utils/file.utils";
const parser = require('xml2json');

export function readTiledTMXFile(file:string):ITiledFileData{
    
    return readXMLFileAsJson<ITiledFileData>(file);
}

export function readTileset(file:string):ITiledTilesetFileData{
    
    return readXMLFileAsJson<ITiledTilesetFileData>(file);
}