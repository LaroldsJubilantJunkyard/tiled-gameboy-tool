import {sep} from 'path'

export const getIdentifierForFile = (file:string):string=>{

    const split = file.split(sep)
    const last = split[split.length-1]

    return last.substring(0,last.indexOf("."))
}