import {
  ExecutionData,
  ExportListItem,
} from "../../../models/tiled-gameboy-tool-types";
import { getExecutionBankPragma, getCodeFileHeader, splitIntoDataRows } from "../../code-gen.utils";
import { splitArrayIntoRows } from "../../array.utils";



export const getGBDKExportCContents = (
  executionData: ExecutionData
): string => {
  const tileCount = executionData.mapHeight * executionData.mapWidth;

  /**
   * There is no banked specified if the user doesnt pass "autobanked", or an integer
   */
  const bankData = getExecutionBankPragma(executionData.bank);

  const exportCContent = 
`${bankData}

${getCodeFileHeader(executionData)}

#include <gbdk/platform.h>
#include "${executionData.identifier}.h"

BANKREF(${executionData.identifier})

const unsigned char ${executionData.identifier}_map[${tileCount}] = {
${splitIntoDataRows(executionData.finalItems,executionData.mapWidth,(x)=>"0x"+x.index.toString(16))}
};

const unsigned char ${executionData.identifier}_map_attributes[${tileCount}] = {
${splitIntoDataRows(executionData.tilemapAttributes,executionData.mapWidth,(x)=>"0x"+x.toString(16))}
};
`;

  return exportCContent;
};

export const getGBDKExportHContents = (
  executionData: ExecutionData
): string => {
  const tileCount = executionData.mapHeight * executionData.mapWidth;

  const exportHContent = 
`${getCodeFileHeader(executionData)}

#include <gbdk/platform.h>

#define ${executionData.identifier}_TILE_COUNT ${tileCount}
#define ${executionData.identifier}_WIDTH ${executionData.mapWidth}
#define ${executionData.identifier}_HEIGHT ${executionData.mapHeight}

extern const unsigned char ${executionData.identifier}_map[${tileCount}];
extern const unsigned char ${executionData.identifier}_map_attributes[${tileCount}] ;
`;
  return exportHContent;
};


export const getGBDKExport = (
  executionData: ExecutionData,
  exportList: ExportListItem[] 
):void => {

  exportList.find(x=>x.extension=="c")?.contents.push(getGBDKExportCContents(executionData))
  exportList.find(x=>x.extension=="h")?.contents.push(getGBDKExportHContents(executionData))

};
