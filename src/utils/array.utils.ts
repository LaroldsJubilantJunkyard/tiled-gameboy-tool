/**
 * Given a flat array, this function will create a two dimensional array of the specified length
 * @param array An array of single
 * @param length The maximum length of each array
 * @param arrayMap An optional mapping to apply to each row
 * @returns A two dimensional array, where each sub-array has the maximum length specified
 */
export const splitArrayIntoRows = <T>(array:T[],length:number,arrayMap?:(x:any)=>any):T[][]=>{

    var rows:T[][] = [];

    // For each item in the input array
    for(var i=0;i<array.length;i++){

        // Get our row by dividing by the length
        var row = Math.floor(i/length);

        // Make sure we have a row
        if(row>=rows.length){
            rows.push([])
        }

        rows[row].push(array[i])
    }

    // Apply the map if we have it
    if(arrayMap)return rows.map(arrayMap)
    else return rows
}