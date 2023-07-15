import { Level } from "ldtk/dist/typedef";

export interface LDtkTileFlips{
    flipHorizontally:boolean;
    flipVertically:boolean;
}

export interface LDtkLevelData{
    flips:LDtkTileFlips[];
    indices:number[];
    width:number;
    height:number;
    name:string;
    level:Level;
}