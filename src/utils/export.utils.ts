import { ExecutionData } from "../models/tiled-gameboy-tool-types"

export const getObjectStructName =(executionData:ExecutionData)=>{
    return executionData.objectStructName ? executionData.objectStructName :`${executionData.identifier}_Object`
}

export const getObjectsListName =(executionData:ExecutionData)=>{
    return `${executionData.identifier}_Objects`
}
export const getTileMapName =(executionData:ExecutionData)=>{
    return `${executionData.identifier}_Map`
}
export const getTileMapAttributesName =(executionData:ExecutionData)=>{
    return `${executionData.identifier}_MapAttributes`
}
export const getSolidMapName =(executionData:ExecutionData)=>{
    return `${executionData.identifier}_SolidMap`
}