import { getExecutionBankPragma } from "./code-gen.utils"

describe('code generation utilities',()=>{

    test('generates no pragma bank code for no bank specification',()=>{

        expect(getExecutionBankPragma(null)).toEqual("")
        expect(getExecutionBankPragma("")).toEqual("")
    })

    test('generates pragma bank 0 code for nonbanked',()=>{

        expect(getExecutionBankPragma("NONBANKED")).toEqual("#pragma bank 0")
    })

    test('generates specified bank code for explicitly-defined banks',()=>{

        expect(getExecutionBankPragma("0")).toEqual("#pragma bank 0")
        expect(getExecutionBankPragma("1")).toEqual("#pragma bank 1")
        expect(getExecutionBankPragma("2")).toEqual("#pragma bank 2")
    })

    test('generates pragma bank 255 code for autobanked',()=>{

        expect(getExecutionBankPragma("AUTOBANKED")).toEqual("#pragma bank 255")
    })
})