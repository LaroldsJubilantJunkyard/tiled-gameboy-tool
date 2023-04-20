import fs from "fs"
import {sep,isAbsolute} from 'path'
const parser = require('xml2json');


export function readXMLFileAsJson<T>(file:string):T{
    
    var contents = fs.readFileSync(file,{encoding:"utf-8", flag:'r'})
    var stringContents = contents.toString()

    var jsonString= parser.toJson(stringContents)
    var json = JSON.parse(jsonString);

    return json as T
}


export function getAbsoluteUrl(url:string,baseDir:string|null=null):string{
    if(baseDir==null)baseDir=process.cwd();
    return isAbsolute(url)
        ? url
        : baseDir + sep + url;
}