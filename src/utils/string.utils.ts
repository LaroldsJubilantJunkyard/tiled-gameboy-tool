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