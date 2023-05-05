
import { singleItemOrArray } from './micc.utils';

describe('miccelaneous utilities',()=>{
    
    test('can convert a single item to an array',()=>{

        expect(singleItemOrArray("single-item")).toEqual(["single-item"])
    })
    
    test('will return the same array provided',()=>{

        expect(singleItemOrArray(["single-item"])).toEqual(["single-item"])
    })
})