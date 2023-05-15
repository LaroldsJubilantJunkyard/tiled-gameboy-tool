import { LDtk, World } from "ldtk";
import { IAllTilesData, ITiledFileData, ITiledMapLayer, ITiledMapObjectGroup, ITiledTileset } from "./tiled-types";

export interface FinalItems{
    index:number;
    tileLayer:number
    attribute:number;
    tileIndex:number;
}
export interface Features{
    name:string;
    data:any;
    action:(data:any,items:ExecutionData)=>void
}
export interface ObjectString{
    name:string;
    value:string
}
export interface ObjectField{
    name:string;
    type:string
}
export interface ExportListItem{
    file:string;
    extension:string;
    contents:(string)[];
}
export interface ExportObject{
    x:number;
    y:number;
    id:number;
    tileIndex:number;
    customData:any;
}
export enum InputFileFormat {None,Tiled, LDtk}

export interface ExecutionDataLevel{

    finalItems:FinalItems[];
    tilemapAttributes:number[];
    solidMap:number[];
    identifier:string;
    totalObjects:ExportObject[];
    mapWidth:number;
    mapHeight:number
}

export interface ExecutionData{
    inputFileFormat:InputFileFormat;
    tiledTMXFileData:ITiledFileData|null;
    processArguments:string[];
    ldtkWorld: LDtk.World|null
    tilesets:ITiledTileset[];
    levels:ExecutionDataLevel[];
    objectStrings:ObjectString[]
    objectGroups:ITiledMapObjectGroup[];
    features:Features[]
    enableSolidMap:boolean;
    identifier:string;
    offset:number;
    objectsOutput:boolean;
    objectFields:ObjectField[];
    objectStructName:string|null;
    bank:string|null;
    inputFile:string;
    allTiles:{[key:string]:IAllTilesData};
    layers:ITiledMapLayer[]
    enableObjects:boolean;
    outputDirectory:string;
    exportType:string
}