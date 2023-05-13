import { ExecutionData, ExportListItem } from '../../../models/tiled-gameboy-tool-types'
import { getCodeFileHeader, splitIntoDataRows } from '../../code-gen.utils'

const getRGBDSExportContents = (executionData:ExecutionData)=>{
    
    const writeContent = 
`${getCodeFileHeader(executionData)}

SECTION "${executionData.identifier}Section", ROM0

${executionData.identifier}_Map::
${splitIntoDataRows(executionData.finalItems,executionData.mapWidth,(x)=>"$"+x.index.toString(16),"DB",false)}
${executionData.identifier}_MapEnd::

${executionData.identifier}_Map_Attributes::
${splitIntoDataRows(executionData.tilemapAttributes,executionData.mapWidth,(x)=>"$"+x.toString(16),"DB",false)}
${executionData.identifier}_Map_AttributesEnd::`
    return writeContent;
}

export const getRGBDSExport = (executionData:ExecutionData,exportList: ExportListItem[] ):void=>{
    exportList[0].contents.push(getRGBDSExportContents(executionData))
}
