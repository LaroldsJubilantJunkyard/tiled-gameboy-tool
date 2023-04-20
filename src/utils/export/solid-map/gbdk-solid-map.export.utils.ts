import { ExecutionData, ExportListItem } from "../../../models/tiled-gameboy-tool-types"
import { splitArrayIntoRows } from '../../array.utils'

export const getGBDKSolidMapExports = (executionData:ExecutionData,exportList:ExportListItem[])=>{
    const tileCount = executionData.mapHeight * executionData.mapWidth;

    const hData = `const uint8_t ${executionData.identifier}_SolidMap[${tileCount}];`;

    const cData = 
`const uint8_t ${executionData.identifier}_SolidMap[${tileCount}]={
${splitArrayIntoRows(executionData.solidMap,executionData.mapWidth).map(x=>`\t${x.join(",")}`).join(",\n")}
};`;

    
    exportList.find(x=>x.extension=="c")?.contents.push(cData)
    exportList.find(x=>x.extension=="h")?.contents.push(hData)

}