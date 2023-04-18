import { ITiledMapLayer, ITiledMapObjectGroup, ITiledTileset } from "./tiled-types";

export interface FinalItems{
    index:number;
    tileLayer:number
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
    contents:Buffer|string;
}
export interface ExecutionData{
    finalItems:FinalItems[];
    tilesets:ITiledTileset[];
    solidMap:number[];
    objectStrings:ObjectString[]
    totalObjects:any[];
    objectGroups:ITiledMapObjectGroup[];
    features:Features[]
    mapWidth:number;
    mapHeight:number
    identifier:string;
    objectsOutput:boolean;
    objectFields:ObjectField[];
    objectStructName:string|null;
    bank:string|null;
    inputFile:string;
    layers:ITiledMapLayer[]
    outputDirectory:string;
    exportType:string
}