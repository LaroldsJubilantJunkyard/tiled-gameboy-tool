
import { ExecutionData, ExecutionDataLevel, ExportListItem } from "../models/tiled-gameboy-tool-types";
import fs from 'fs'
import {sep} from 'path'
import { getRGBDSExport } from "../utils/export/tilemap/rgbds-tilemap.export.utils";
import { getGBDKExport } from "../utils/export/tilemap/gbdk-tilemap.export.utils";
import { getGBDKObjectExport } from "../utils/export/objects/gbdk-object-export.utils";
import { getRGBDSObjectExport } from "../utils/export/objects/rgbds-object-export.utils";
import { getGBDKSolidMapExports } from "../utils/export/solid-map/gbdk-solid-map.export.utils";
import { getRGBDSSolidMapExports } from "../utils/export/solid-map/rgbds-solid-map.export.utils";
import { removeDoubleLineBreaks } from "../utils/string.utils";

const getGBDKDefualtExportList = (executionData:ExecutionData,executionDataLevel:ExecutionDataLevel):ExportListItem[]=>{

    
    // GBDK will need two files, a .c file and a .h file
    return [
        {
            // Define a c file
            file: `${ executionData.outputDirectory + sep + executionDataLevel.identifier }.c`,
            extension:"c",
            contents:[],
        },
        {
            // Define a header file
            file: `${ executionData.outputDirectory + sep + executionDataLevel.identifier }.h`,
            extension:"h",
            contents: [],
        },
    ];
}

export const getRGBDSDefaultExportList =(executionData:ExecutionData,executionDataLevel:ExecutionDataLevel):ExportListItem[]=>{
    return [
        {
            // Define a single .asm file
            file: `${ executionData.outputDirectory + sep + executionDataLevel.identifier }.asm`,
            extension:"asm",
            contents:[],
        }
    ];
}

export const exportExecutionData = (executionData:ExecutionData)=>{

    console.log(`Exporting ${executionData.levels.length} Levels at: ${executionData.outputDirectory}`)

    executionData.levels.forEach(executionDataLevel=>{

        var exportList:ExportListItem[] = [];
        
            // Use the proper export action
            switch(executionData.exportType){
                case "gbdk":  exportList = getGBDKDefualtExportList(executionData,executionDataLevel); break;
                case "rgbds":  exportList = getRGBDSDefaultExportList(executionData,executionDataLevel); break;
                default:break;
            }

            // Use the proper export action
            switch(executionData.exportType){
                case "gbdk": getGBDKExport(executionData,executionDataLevel,exportList);break;
                case "rgbds": getRGBDSExport(executionData,executionDataLevel,exportList);break;
                default:break;
            }

            // If object's are enabled
            // This can be done via the --export-objects argument
            if(executionData.enableObjects){
                switch(executionData.exportType){
                    case "gbdk": getGBDKObjectExport(executionData,executionDataLevel,exportList);break;
                    case "rgbds": getRGBDSObjectExport(executionData,executionDataLevel,exportList);break;
                    default:break;
                }
            }
            // If solid map's are enabled
            // This can be done via the --export-solid-map argument
            if(executionData.enableSolidMap){
                switch(executionData.exportType){
                    case "gbdk": getGBDKSolidMapExports(executionData,executionDataLevel,exportList);break;
                    case "rgbds": getRGBDSSolidMapExports(executionData,executionDataLevel,exportList);break;
                    default:break;
                }
            }



            // Export each of the files provided
            exportList.forEach((exportItem:ExportListItem)=>{

                // Merge all the contents
                // Remove extra line breaks
                const finalString = removeDoubleLineBreaks(exportItem.contents.join("\n"))
            
                fs.writeFileSync(exportItem.file,finalString);
            })
        })

}