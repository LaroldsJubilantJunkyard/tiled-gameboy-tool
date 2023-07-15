import fs from 'fs'
import {sep} from 'path'
import { ExecutionData, ExecutionDataLevel, ExportListItem } from '../../../models/tiled-gameboy-tool-types'
import { splitArrayIntoRows } from '../../array.utils'
export const getRGBDSSolidMapExports = (executionData:ExecutionData,executionDataLevel:ExecutionDataLevel,exportList:ExportListItem[])=>{
    const cData = `

${executionDataLevel.identifier}_SolidMap::
${splitArrayIntoRows(executionDataLevel.solidMap,executionDataLevel.mapWidth).map(x=>`\tDB ${x.map(x=>"$"+x.toString(16)).join(",")}`).join("\n")}
${executionDataLevel.identifier}_SolidMapEnd::
    `
    
    exportList[0].contents.push(cData)

}