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
