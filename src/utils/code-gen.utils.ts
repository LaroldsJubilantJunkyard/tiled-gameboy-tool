import { ObjectField } from "../models/tiled-gameboy-tool-types";
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

export const getExecutionBankPragma = (bank:string|null)=>{

    // Make sure we have a valid value
    if(bank==null||bank.trim().length==0)return "";
    if(bank.trim().toLowerCase()=="autobanked")return `#pragma bank 255`;
    if(bank.trim().toLowerCase()=="nonbanked")return `#pragma bank 0`;

    // if it's a number, use it exactly
    if(!Number.isNaN(bank))return `#pragma bank ${bank}`;

    // If all else fails, return empty
    return "";
}