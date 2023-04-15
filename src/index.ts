#!/usr/bin/env node

import {sep} from 'path'
import { ExecutionData, Features, FinalItems } from "./models/tiled-gameboy-tool-types";
import { readTiledTMXFile, readTileset } from "./services/tiled.service";
import offsetFeature from './features/offset'
import objectsFeature, { getFields } from './features/objects'
import { ITiledFileData, ITiledTileset } from "./models/tiled-types";
import { singleItemOrArray } from "./utils/micc.utils";
import fs from 'fs'
import gbdkExport from './features/gbdk-export';
import { getIdentifierForFile } from './utils/string.utils';

var executionData:ExecutionData = {
    features:[],
    objectTypeName:null,
    objectGroups:[],
    finalItems:[],
    mapHeight:0,
    mapWidth:0,
    tilesets:[],
    bank:null,
    layers:[],
    outputDirectory:process.cwd(),
    inputFile:"",
    identifier:"",
    exportType:"gbdk"
}

if(process.argv.length<3){

    console.log("Not enough arguments passed");
    process.exit();
}

executionData.inputFile = process.argv[process.argv.length-1];
executionData.identifier=getIdentifierForFile(executionData.inputFile)

for(var i=2;i<process.argv.length;i++){

    var arg = process.argv[i]

    if(arg=="-d"||arg=="--output-dir"){

        executionData.outputDirectory=process.argv[++i]
    }
    else if(arg=="-otn"||arg=="--object-type-name"){
        executionData.objectTypeName=process.argv[++i]
    }
    else if(arg=="-obj"||arg=="--objects"){
        executionData.features.push({name:"objects",data:getFields(i+1),action:objectsFeature})
    }

    else if(arg=="-b"||arg=="--bank"){

        executionData.bank=process.argv[++i]
    }

    else if(arg=="-sm"||arg=="--solid-map"){

        executionData.features.push({name:"solid-map",data:process.argv[++i],action:offsetFeature})
    }
    else if(arg=="-x"||arg=="--export-type"){

        executionData.exportType=process.argv[++i]
    }

    else if(arg=="-o"||arg=="--offset"){

        executionData.features.push({name:"offset",data:Number(process.argv[++i]),action:offsetFeature})
    }
}

if(!fs.existsSync(executionData.inputFile)){

    console.log("File does not exist: "+executionData.inputFile);
    process.exit();

}

console.log("args: "+executionData.inputFile);

var json:ITiledFileData = readTiledTMXFile(executionData.inputFile)

executionData.mapWidth=Number(json.map.width)
executionData.mapHeight=Number(json.map.height)
executionData.tilesets = json.map.tileset.map((x:ITiledTileset):ITiledTileset=>{return {...x,data:readTileset(x.source)}})
executionData.layers= singleItemOrArray(json.map.layer);
executionData.objectGroups = singleItemOrArray(json.map.objectgroup)

var mapFunction = (x:FinalItems)=>"0x"+x.index.toString(16)

var items:FinalItems[] = executionData.layers[0].data.$t.split(",").map((x:string)=>{return {index:Number(x)-1,tileLayer:0}})

for(var i=1;i<executionData.layers.length;i++){

    var layer = executionData.layers[i].data["$t"].split(",").map(x=>Number(x))

    layer.forEach((x:number,index:number)=>{

        var indexedX=x-1

        if(indexedX>=0){
            items[index].index=indexedX;
            items[index].tileLayer=i;
        }
    })
}

// Apply each feature
executionData.features.forEach(x=>x.action(x.data,executionData))

fs.writeFileSync(executionData.outputDirectory+sep+"tilesets.json",JSON.stringify(executionData.tilesets))
fs.writeFileSync(executionData.outputDirectory+sep+"tilemap.json",items.map(mapFunction).join(","))

if(executionData.exportType=="gbdk")gbdkExport(executionData)