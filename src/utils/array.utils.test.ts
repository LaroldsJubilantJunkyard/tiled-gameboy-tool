
import { splitArrayIntoRows } from './array.utils';

describe('array utilities',()=>{
    
    test('can split array into multiple sub arrays',()=>{

        const inputArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

        const split = splitArrayIntoRows(inputArray,5)

        // Make sure we have 3 aarrays
        expect(split).toHaveLength(3);

        // make sure we have the same amount of elements
        expect(split[0]).toHaveLength(5);
        expect(split[1]).toHaveLength(5);
        expect(split[2]).toHaveLength(5);

        // Make sure the first elements are correct
        expect(split[0][0]).toEqual(1)
        expect(split[1][0]).toEqual(6)
        expect(split[2][0]).toEqual(11)

    });
    
    test('can map split array values',()=>{

        const inputArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

        // Multiple each value by 10
        const split = splitArrayIntoRows(inputArray,5,(x:number[])=>x.map((y:number)=>y*10))

        // Make sure we have 3 aarrays
        expect(split).toEqual([
            [10,20,30,40,50],
            [60,70,80,90,100],
            [110,120,130,140,150]
        ])

    })
    
})