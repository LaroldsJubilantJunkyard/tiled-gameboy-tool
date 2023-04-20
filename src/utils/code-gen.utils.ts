import { ExecutionData, ObjectField } from "../models/tiled-gameboy-tool-types";
import { getIdentifierForString } from "./string.utils";

export const getObjectFieldDeclaration = (objectField:ObjectField):string=>{
    switch(objectField.type){
        case "uint8": return `uint8_t ${getIdentifierForString(objectField.name)};`;
        case "uint16": return `uint16_t ${getIdentifierForString(objectField.name)};`;
        case "int8": return `int8_t ${getIdentifierForString(objectField.name)};`;
        case "int16": return `int16_t ${getIdentifierForString(objectField.name)};`;
        case "string": return `char *${getIdentifierForString(objectField.name)};`;
        case "boolean": return `uint8_t ${getIdentifierForString(objectField.name)};`;
    }
    return ""
}

export const getExecutionBankPragma = (executionData:ExecutionData)=>{

    /**
     * There is no banked specified if the user doesnt pass "autobanked", or an integer
     */
    const noBank = executionData.bank==null||(!Number.isInteger(executionData.bank)&&executionData.bank.trim().toUpperCase()!="AUTOBANKED");

    if(noBank)return "";

    // The actual bank or 255 for autobanking
    const bank = (!Number.isInteger(executionData.bank) ? "255":"");
    return `#pragma bank ${bank}`
}