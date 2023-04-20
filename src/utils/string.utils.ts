import {sep} from 'path'

export const getIdentifierForFile = (file:string):string=>{

    const split = file.split(sep)
    const last = split[split.length-1]

    return getIdentifierForString(last.substring(0,last.indexOf(".")))
}

export const getIdentifierForString = (str:string):string=>{

    // replace all non alphanumeric
    return str.replace(/[^A-Za-z0-9_]+/g,"_").toLowerCase();
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
  

  /**
   * This functions splits a string by line breaks, and removes extra line breaks. This 
   * @param str The multi-line string to remove double line breaks from
   * @returns Returns the original string, minus double-line breaks
   */
  export function removeDoubleLineBreaks (str:string){

    // Split by line break characters
    const finalStringSplit = str.split("\n")
    const finalStringModified:string[] = []

    // Loop for eachline
    for(var i=1;i<finalStringSplit.length;i++){

        if(finalStringModified.length>0){
            // If the last line we added is blank
            if(finalStringModified[finalStringModified.length-1].trim().length==0){

                // If the current line was break, skip this line
                if(finalStringSplit[i].trim().length==0)continue;

            }
        }

        finalStringModified.push(finalStringSplit[i])
    }
    return finalStringModified.join("\n").trim();
  }