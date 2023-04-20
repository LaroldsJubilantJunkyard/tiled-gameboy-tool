
import { ExecutionData, ExportListItem } from "../models/tiled-gameboy-tool-types";
import fs from 'fs'
import {sep} from 'path'
import { getRGBDSExport } from "../utils/export/rgbds-tilemap.export.utils";
import { getGBDKExport } from "../utils/export/gbdk-tilemap.export.utils";
import { getGBDKObjectExport } from "../utils/export/gbdk-object-export.utils";
import { getRGBDSObjectExport } from "../utils/export/rgbds-object-export.utils";
import { getGBDKSolidMapExports } from "../utils/export/gbdk-solid-map.export.utils";
import { getRGBDSSolidMapExports } from "../utils/export/rgbds-solid-map.export.utils";

export const exportExecutionData = (executionData:ExecutionData)=>{

    var exportList:ExportListItem[] = [];
    
    // Use the proper export action
    switch(executionData.exportType){
        case "gbdk": 

            // GBDK will need two files, a .c file and a .h file
            exportList = [
                {
                    // Define a c file
                    file: `${ executionData.outputDirectory + sep + executionData.identifier }.c`,
                    extension:"c",
                    contents:[],
                },
                {
                    // Define a header file
                    file: `${ executionData.outputDirectory + sep + executionData.identifier }.h`,
                    extension:"h",
                    contents: [],
                },
            ];
            break;
        case "rgbds": 
            exportList = [
                {
                    // Define a single .asm file
                    file: `${ executionData.outputDirectory + sep + executionData.identifier }.asm`,
                    extension:"asm",
                    contents:[],
                }
            ];
            break;
        default:break;
    }

    // Use the proper export action
    switch(executionData.exportType){
        case "gbdk": getGBDKExport(executionData,exportList);break;
        case "rgbds": getRGBDSExport(executionData,exportList);break;
        default:break;
    }

    // If object's are enabled
    if(executionData.enableObjects){
        switch(executionData.exportType){
            case "gbdk": getGBDKObjectExport(executionData,exportList);break;
            case "rgbds": getRGBDSObjectExport(executionData,exportList);break;
        }
    }
    // If solid map's are enabled
    if(executionData.enableSolidMap){
        switch(executionData.exportType){
            case "gbdk": getGBDKSolidMapExports(executionData,exportList);break;
            case "rgbds": getRGBDSSolidMapExports(executionData,exportList);break;
        }
    }


    // Export each of the files provided
    exportList.forEach((exportItem:ExportListItem)=>{
        const finalString = exportItem.contents.join("\n")
        const lineBreakModified = finalString.replace(/[\r\n]{2,}/g,'\n')
        fs.writeFileSync(exportItem.file,lineBreakModified);
    })

}