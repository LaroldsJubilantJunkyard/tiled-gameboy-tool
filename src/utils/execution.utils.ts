import { ExecutionData } from "../models/tiled-gameboy-tool-types";

export const getDefaultExecutionData = ():ExecutionData=>{
    return {
        features: [],
        objectStructName: null,
        objectGroups: [],
        solidMap:[],
        enableObjects:true,
        finalItems: [],
        mapHeight: 20,
        mapWidth: 18,
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
        inputFile: "",
        identifier: "",
        exportType: "gbdk",
      };
    
}
