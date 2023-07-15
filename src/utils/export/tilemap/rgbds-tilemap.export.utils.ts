import { ExecutionData, ExecutionDataLevel, ExportListItem } from '../../../models/tiled-gameboy-tool-types'
import { getCodeFileHeader, splitIntoDataRows } from '../../code-gen.utils'

const getRGBDSExportContents = (executionData:ExecutionData,executionDataLevel:ExecutionDataLevel)=>{
    
    const writeContent = 
`${getCodeFileHeader(executionData)}

SECTION "${executionDataLevel.identifier}Section", ROM0

${executionDataLevel.identifier}_Map::
${splitIntoDataRows(executionDataLevel.finalItems,executionDataLevel.mapWidth,(x)=>"$"+x.index.toString(16),"DB",false)}
${executionDataLevel.identifier}_MapEnd::

${executionDataLevel.identifier}_Map_Attributes::
${splitIntoDataRows(executionDataLevel.tilemapAttributes,executionDataLevel.mapWidth,(x)=>"$"+x.toString(16),"DB",false)}
${executionDataLevel.identifier}_Map_AttributesEnd::`
    return writeContent;
}

export const getRGBDSExport = (executionData:ExecutionData,executionDataLevel:ExecutionDataLevel,exportList: ExportListItem[] ):void=>{
    exportList[0].contents.push(getRGBDSExportContents(executionData,executionDataLevel))
}
