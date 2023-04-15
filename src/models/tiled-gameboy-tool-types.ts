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
export interface ExecutionData{
    finalItems:FinalItems[];
    tilesets:ITiledTileset[];
    objectGroups:ITiledMapObjectGroup[];
    features:Features[]
    mapWidth:number;
    mapHeight:number
    identifier:string;
    objectTypeName:string|null;
    bank:string|null;
    inputFile:string;
    layers:ITiledMapLayer[]
    outputDirectory:string;
    exportType:string
}