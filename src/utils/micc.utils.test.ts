
import { getColumnAndRow, singleItemOrArray } from './micc.utils';

describe('miccelaneous utilities',()=>{
    
    test('can convert a single item to an array',()=>{

        expect(singleItemOrArray("single-item")).toEqual(["single-item"])
    })
    
    test('will return the same array provided',()=>{

        expect(singleItemOrArray(["single-item"])).toEqual(["single-item"])
    })

    test('will return proper row and column', ()=>{

        expect(getColumnAndRow(25,10)).toEqual({column:5,row:2})
        expect(getColumnAndRow(5,10)).toEqual({column:5,row:0})
        expect(getColumnAndRow(10,10)).toEqual({column:0,row:1})
        expect(getColumnAndRow(20,10)).toEqual({column:0,row:2})
    })
})