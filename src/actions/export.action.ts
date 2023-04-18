
import { ExecutionData, ExportListItem } from "../models/tiled-gameboy-tool-types";
import fs from 'fs'
import { getRGBDSExport } from "../utils/export/rgbds-export.utils";
import { getGBDKExport } from "../utils/export/gbdk.export.utils";

export const exportExecutionData = (executionData:ExecutionData)=>{

    var exportList:ExportListItem[] = [];
    
    switch(executionData.exportType){
        case "gbdk": exportList = getGBDKExport(executionData);break;
        case "rgbds": exportList = getRGBDSExport(executionData);break;
        default:break;
    }

    exportList.forEach((exportItem:ExportListItem)=>{
        fs.writeFileSync(exportItem.file,exportItem.contents);
    })

}