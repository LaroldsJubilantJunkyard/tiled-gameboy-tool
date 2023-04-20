import { ExecutionData } from "../models/tiled-gameboy-tool-types";

export const getDefaultExecutionData = (tmxFilePath:string):ExecutionData=>{
    return {
        features: [],
        objectStructName: null,
        objectGroups: [],
        solidMap:[],
        enableObjects:true,
        finalItems: [],
        mapHeight: 0,
        mapWidth: 0,
        allTiles:{},
        tilesets: [],
        objectStrings: [],
        offset:0,
        enableSolidMap:false,
        totalObjects: [],
        bank: null,
        layers: [],
        objectFields:[],
        objectsOutput:false,
        outputDirectory: process.env.PWD||process.cwd(),
        inputFile: tmxFilePath,
        identifier: "",
        exportType: "gbdk",
      };
    
}
