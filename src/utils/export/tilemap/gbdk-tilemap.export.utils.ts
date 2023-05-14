import {
  ExecutionData,
  ExecutionDataLevel,
  ExportListItem,
} from "../../../models/tiled-gameboy-tool-types";
import { getExecutionBankPragma, getCodeFileHeader, splitIntoDataRows } from "../../code-gen.utils";
import { splitArrayIntoRows } from "../../array.utils";



export const getGBDKExportCContents = (
  executionData: ExecutionData,
  executionDataLevel: ExecutionDataLevel
): string => {
  const tileCount = executionDataLevel.mapHeight * executionDataLevel.mapWidth;

  /**
   * There is no banked specified if the user doesnt pass "autobanked", or an integer
   */
  const bankData = getExecutionBankPragma(executionData.bank);

  const exportCContent = 
`${bankData}

${getCodeFileHeader(executionData)}

#include <gbdk/platform.h>
#include "${executionDataLevel.identifier}.h"

BANKREF(${executionDataLevel.identifier})

const unsigned char ${executionDataLevel.identifier}_map[${tileCount}] = {
${splitIntoDataRows(executionDataLevel.finalItems,executionDataLevel.mapWidth,(x)=>"0x"+x.index.toString(16))}
};

const unsigned char ${executionDataLevel.identifier}_map_attributes[${tileCount}] = {
${splitIntoDataRows(executionDataLevel.tilemapAttributes,executionDataLevel.mapWidth,(x)=>"0x"+x.toString(16))}
};
`;

  return exportCContent;
};

export const getGBDKExportHContents = (
  executionData: ExecutionData,
  executionDataLevel: ExecutionDataLevel
): string => {


  console.log("executionData in header")
  console.log(executionData)
  const tileCount = executionDataLevel.mapHeight * executionDataLevel.mapWidth;

  const exportHContent = 
`${getCodeFileHeader(executionData)}

#include <gbdk/platform.h>

#define ${executionDataLevel.identifier}_TILE_COUNT ${tileCount}
#define ${executionDataLevel.identifier}_WIDTH ${executionDataLevel.mapWidth}
#define ${executionDataLevel.identifier}_HEIGHT ${executionDataLevel.mapHeight}

extern const unsigned char ${executionDataLevel.identifier}_map[${tileCount}];
extern const unsigned char ${executionDataLevel.identifier}_map_attributes[${tileCount}] ;
`;
  return exportHContent;
};


export const getGBDKExport = (
  executionData: ExecutionData,
  executionDataLevel: ExecutionDataLevel,
  exportList: ExportListItem[] 
):void => {

  exportList.find(x=>x.extension=="c")?.contents.push(getGBDKExportCContents(executionData,executionDataLevel))
  exportList.find(x=>x.extension=="h")?.contents.push(getGBDKExportHContents(executionData,executionDataLevel))

};
