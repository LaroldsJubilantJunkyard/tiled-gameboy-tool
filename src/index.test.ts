
import * as runTiledGameboyTool from "./run-tiled-gameboy-tool";
describe('the application entry point',()=>{

    test("the 'runTiledGameboyTool' function is called",()=>{

        const mockRunTiledGameboyTool = jest.spyOn(runTiledGameboyTool,"default").mockImplementationOnce(jest.fn());

        require("./index")

        expect(mockRunTiledGameboyTool).toBeCalled()
    })
})