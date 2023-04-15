export const singleItemOrArray = (value:any)=>{
    return Array.isArray(value) ? value : [value]
}