/**
 * XML to json will output a single-item array as just an object (not an array with only one item).
 * The  value can be passed into this function to make sure you can operate as an array
 * @param value An array or a single object.
 * @returns An array of the given type
 */
export const singleItemOrArray = <T>(value:T|T[]):T[]=>{
    return Array.isArray(value) ? value : [value]
}

export const getColumnAndRow = (index:number,width:number)=>{
    const mapColumnCount = Math.floor(width);
    const column = (index%mapColumnCount);
    const row = Math.floor(index/mapColumnCount);
    return {column,row}
}