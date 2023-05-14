import { ExecutionData, ExecutionDataLevel, ExportListItem } from "../../../models/tiled-gameboy-tool-types"
import { splitArrayIntoRows } from '../../array.utils'

export const getGBDKSolidMapExports = (executionData:ExecutionData,executionDataLevel:ExecutionDataLevel,exportList:ExportListItem[])=>{
    const tileCount = executionDataLevel.mapHeight * executionDataLevel.mapWidth;

    const hData = `const uint8_t ${executionDataLevel.identifier}_SolidMap[${tileCount}];`;

    const cData = 
`const uint8_t ${executionDataLevel.identifier}_SolidMap[${tileCount}]={
${splitArrayIntoRows(executionDataLevel.solidMap,executionDataLevel.mapWidth).map(x=>`\t${x.join(",")}`).join(",\n")}
};`;

    
    exportList.find(x=>x.extension=="c")?.contents.push(cData)
    exportList.find(x=>x.extension=="h")?.contents.push(hData)

}