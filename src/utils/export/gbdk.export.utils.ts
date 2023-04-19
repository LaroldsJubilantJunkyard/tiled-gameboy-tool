import {
  ExecutionData,
  ExportListItem,
} from "../../models/tiled-gameboy-tool-types";
import { sep } from "path";
import { getExecutionBankPragma } from "../execution.utils";



export const getGBDKExportCContents = (
  executionData: ExecutionData
): string => {
  const tileCount = executionData.mapHeight * executionData.mapWidth;

  const outputData = executionData.finalItems.map((x) => {
    return "0x" + x.index.toString(16);
  });
  const outputDataAttributes = executionData.finalItems.map((x) => {
      return "0x" + x.attribute.toString(16)
  });

  /**
   * There is no banked specified if the user doesnt pass "autobanked", or an integer
   */
  const bankData = getExecutionBankPragma(executionData);

  const exportCContent = `
${bankData}

//AUTOGENERATED FILE FROM tiled-gameboy-tool

#include <stdint.h>
#include <gbdk/platform.h>
#include "${executionData.identifier}.h"

BANKREF(${executionData.identifier})

const unsigned char ${executionData.identifier}_map[${tileCount}] = {
	${outputData.join(",")}
};

const unsigned char ${executionData.identifier}_map_attributes[${tileCount}] = {
	${outputDataAttributes.join(",")}
};

    
`;

  return exportCContent;
};

export const getGBDKExportHContents = (
  executionData: ExecutionData
): string => {
  const tileCount = executionData.mapHeight * executionData.mapWidth;

  const exportHContent = `
//AUTOGENERATED FILE FROM tiled-gameboy-tool

#include <stdint.h>
#include <gbdk/platform.h>

#define ${executionData.identifier}_TILE_COUNT ${tileCount}
#define ${executionData.identifier}_WIDTH ${executionData.mapWidth}
#define ${executionData.identifier}_HEIGHT ${executionData.mapHeight}

const unsigned char ${executionData.identifier}_map[${tileCount}];
const unsigned char ${executionData.identifier}_map_attributes[${tileCount}] ;

    
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
