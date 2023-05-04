import { ExecutionData, InputFileFormat } from "../models/tiled-gameboy-tool-types";

export const getDefaultExecutionData = (processArguments:string[]):ExecutionData=>{
    return {
        features: [],
        inputFileFormat:InputFileFormat.None,
        processArguments:processArguments,
        objectStructName: null,
        objectGroups: [],
        tilemapAttributes: [],
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
        inputFile: "",
        identifier: "",
        exportType: "gbdk",
      };
    
}
