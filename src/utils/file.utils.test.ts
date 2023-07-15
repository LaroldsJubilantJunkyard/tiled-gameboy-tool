import { getAbsoluteUrl, readXMLFileAsJson } from "./file.utils"
import {resolve,sep} from 'path'
describe('file utils',()=>{

    test('xml files can be read as json',()=>{
        
    const testXmlAsJson = readXMLFileAsJson(resolve(__dirname,"..","..",'mock_data',"test-xml.xml"))

    expect(testXmlAsJson).toEqual({
        toplevel:{
            secondlevel:{
                param1:"secondlevel-param1",
                thirdlevel:[
                    "content1",
                    "content2",
                    "content3",
                ]
            }
        }
    })
    })


    test.onLinux('absolute URLs can get retrieved from relative URLs',()=>{

        expect(getAbsoluteUrl("/MyPath/Here/To/MyFile.extension")).toEqual(sep+"MyPath"+sep+"Here"+sep+"To"+sep+"MyFile.extension")
    })
    test.onLinux('absolute URLs can get retrieved from relative URLs',()=>{

        expect(getAbsoluteUrl("Here/To/MyFile.extension","/MyOtherPath")).toEqual(sep+"MyOtherPath"+sep+"Here"+sep+"To"+sep+"MyFile.extension")
    })
    test.onLinux('absolute URLs can get retrieved from relative URLs using the current working directory',()=>{

        const realProcess = global.process

        // Mock the process.cwd() with a different directory
        global.process = {...realProcess,cwd:()=>"/MyFinalPath"}

        expect(getAbsoluteUrl("Here/To/MyFile.extension")).toEqual(sep+"MyFinalPath"+sep+"Here"+sep+"To"+sep+"MyFile.extension");

        global.process=realProcess;
    })


    test.onWindows('absolute URLs can get retrieved from relative URLs',()=>{

        expect(getAbsoluteUrl("D://MyPath/Here/To/MyFile.extension")).toEqual("D:"+sep+"MyPath"+sep+"Here"+sep+"To"+sep+"MyFile.extension")
    })
    test.onWindows('absolute URLs can get retrieved from relative URLs',()=>{

        expect(getAbsoluteUrl("Here/To/MyFile.extension","C://MyOtherPath")).toEqual("C:"+sep+"MyOtherPath"+sep+"Here"+sep+"To"+sep+"MyFile.extension")
    })
    test.onWindows('absolute URLs can get retrieved from relative URLs using the current working directory',()=>{

        const realProcess = global.process

        // Mock the process.cwd() with a different directory
        global.process = {...realProcess,cwd:()=>"E://MyFinalPath"}

        expect(getAbsoluteUrl("Here/To/MyFile.extension")).toEqual("E:"+sep+"MyFinalPath"+sep+"Here"+sep+"To"+sep+"MyFile.extension");

        global.process=realProcess;
    })
})