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

export const getExecutionBankPragma = (executionData:ExecutionData)=>{

    /**
     * There is no banked specified if the user doesnt pass "autobanked", or an integer
     */
    const noBank = executionData.bank==null||(!Number.isInteger(executionData.bank)&&executionData.bank.trim().toUpperCase()!="AUTOBANKED");

    if(noBank)return "";

    // The actual bank or 255 for autobanking
    const bank = (!Number.isInteger(executionData.bank) ? "255":"");
    return `#pragma bank ${bank}`
}