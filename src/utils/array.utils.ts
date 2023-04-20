export const splitArrayIntoRows = <T>(array:T[],length:number,arrayMap?:(x:any)=>any):T[][]=>{

    var rows:T[][] = [];

    for(var i=0;i<array.length;i++){

        var row = Math.floor(i/length);

        if(row>=rows.length){
            rows.push([])
        }

        rows[row].push(array[i])
    }


    if(arrayMap)return rows.map(arrayMap)
    else return rows
}