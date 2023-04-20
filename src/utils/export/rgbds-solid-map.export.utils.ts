import fs from 'fs'
import {sep} from 'path'
import { ExecutionData, ExportListItem, FinalItems } from "../../models/tiled-gameboy-tool-types"
import { ITiledTileset, ITiledTilesetDataTile, ITiledTilesetDataTileProperty, ITiledTilesetFileData } from "../../models/tiled-types"
import { singleItemOrArray } from '../micc.utils'
import { splitArrayIntoRows } from '../array.utils'

export const getRGBDSSolidMapExports = (executionData:ExecutionData,exportList:ExportListItem[])=>{
    const cData = `

${executionData.identifier}_SolidMap::
${splitArrayIntoRows(executionData.solidMap,executionData.mapWidth).map(x=>`\tDB ${x.map(x=>"$"+x.toString(16)).join(",")}`).join("\n")}
${executionData.identifier}_SolidMapEnd::

    `

    
    exportList[0].contents.push(cData)

}