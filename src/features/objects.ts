import { ExecutionData, ExportListItem} from "../models/tiled-gameboy-tool-types";
import fs from 'fs'
import {sep} from 'path'
import { getGBDKObjectExport } from "../utils/export/gbdk-object-export.utils";
import { getRGBDSObjectExport } from "../utils/export/rgbds-object-export.utils";

export default (data:any,executionData:ExecutionData)=>{

    var exportList:ExportListItem[] = [];
    
    switch(executionData.exportType){
        case "gbdk": exportList = getGBDKObjectExport(executionData);break;
        case "rgbds": exportList = getRGBDSObjectExport(executionData);break;
    }

    exportList.forEach((exportItem:ExportListItem)=>{
        fs.writeFileSync(exportItem.file,exportItem.contents);
    })

    
}