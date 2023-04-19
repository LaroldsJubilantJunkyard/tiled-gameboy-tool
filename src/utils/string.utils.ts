import {sep} from 'path'

export const getIdentifierForFile = (file:string):string=>{

    const split = file.split(sep)
    const last = split[split.length-1]

    return getIdentifierForString(last.substring(0,last.indexOf(".")))
}

export const getIdentifierForString = (str:string):string=>{

    // replace all non alphanumeric
    return str.replace(/[^A-Za-z0-9_]+/g,"_");
}


/**
 * From: https://www.geeksforgeeks.org/how-to-replace-a-character-at-a-particular-index-in-javascript/
 * @param origString 
 * @param replaceChar 
 * @param index 
 * @returns 
 */
export function replaceChar(origString:string, replaceChar:string, index:number) {
    let firstPart = origString.substr(0, index);
    let lastPart = origString.substr(index + 1);
      
    let newString = firstPart + replaceChar + lastPart;
    return newString;
  }
  