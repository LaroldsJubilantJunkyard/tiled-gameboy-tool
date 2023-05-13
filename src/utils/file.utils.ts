import fs from "fs"
import {sep,isAbsolute,resolve} from 'path'
const parser = require('xml2json');


export function readXMLFileAsJson<T>(file:string):T{
    
    var contents = fs.readFileSync(file,{encoding:"utf-8", flag:'r'})
    var stringContents = contents.toString()

    var jsonString= parser.toJson(stringContents)
    var json = JSON.parse(jsonString);

    // Return as the type speciied
    return json as T
}


export function getAbsoluteUrl(url:string,baseDir:string|null=null):string{

    // Use the current working directory if base directory is provided
    if(baseDir==null)baseDir=__dirname;

    // Return things as-is, if it's already absolute
    return isAbsolute(url)
        ? resolve(url)

        // Resolve using the current working directly if it's not absolute
        : resolve(baseDir,url)
}