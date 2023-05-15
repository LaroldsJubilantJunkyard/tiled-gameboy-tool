import { LDtk, World } from "ldtk"
import {existsSync} from 'fs'
export const loadLDTKWorld = async (file:string) => {

    // Make sure the file actually exists
    if(!existsSync(file))return null;

    try{

        // Try to load the ldtk world
        return (await World.loadRaw(file))
    }catch(e){
        return null;
    }
}