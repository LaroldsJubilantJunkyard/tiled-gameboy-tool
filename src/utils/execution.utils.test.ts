
import { InputFileFormat } from "../models/tiled-gameboy-tool-types";
import * as ExecutionUtils from "./execution.utils";

describe('execution utilities',()=>{

    
    test("'getExecutionInputFileFormat' returns the proper input file formats",()=>{

        const defaultExecutionData = ExecutionUtils.getDefaultExecutionData([]);

        expect(ExecutionUtils.getExecutionInputFileFormat({...defaultExecutionData,inputFileFormat:InputFileFormat.None})).toBe(InputFileFormat.None)
        expect(ExecutionUtils.getExecutionInputFileFormat({...defaultExecutionData,inputFileFormat:InputFileFormat.LDtk})).toBe(InputFileFormat.LDtk)
        expect(ExecutionUtils.getExecutionInputFileFormat({...defaultExecutionData,inputFileFormat:InputFileFormat.Tiled})).toBe(InputFileFormat.Tiled)
    })
    
    test("'getDefaultExecutionData' returns non-null data",()=>{

        const defaultExecutionData = ExecutionUtils.getDefaultExecutionData(["my","process","arguments"]);

        expect(defaultExecutionData).toEqual({
            features: [],
            inputFileFormat:InputFileFormat.None,
            processArguments:["my","process","arguments"],
            objectStructName: null,
            objectGroups: [],
            tilemapAttributes: [],
            solidMap:[],
            enableObjects:false,
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
          });
    })
})