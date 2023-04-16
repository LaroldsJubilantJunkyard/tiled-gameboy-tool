import gbdkExport from "./exports/gbdk-export";
import { ExecutionData } from "../models/tiled-gameboy-tool-types";

export const exportExecutionData = (executionData:ExecutionData)=>{

    if(executionData.exportType=="gbdk")gbdkExport(executionData)
}