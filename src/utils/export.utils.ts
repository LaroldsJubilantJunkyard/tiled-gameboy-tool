import { ExecutionData } from "../models/tiled-gameboy-tool-types"

export const getObjectStructName =(executionData:ExecutionData)=>{
    return executionData.objectStructName ? executionData.objectStructName :`${executionData.identifier}_Object`
}