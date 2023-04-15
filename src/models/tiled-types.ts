export interface ITiledTilesetDataTileProperty{

    name:string
    type:string;
    value:string
}

export interface ITiledProperties{

    property:ITiledTilesetDataTileProperty|ITiledTilesetDataTileProperty[]
}

export interface ITiledTilesetDataTile{

    id:string;
    properties:ITiledProperties
}

export interface ITiledTilesetDataTileset{

    tilewidth:number
    tileheight:number

    tile:ITiledTilesetDataTile|ITiledTilesetDataTile[]
}

export interface ITiledTilesetFileData{

    tileset:ITiledTilesetDataTileset
}

export interface ITiledTileset{

    firstgid:string
    source:string;
    data:ITiledTilesetFileData
}

export interface ITiledMapLayerData{

    encoding:string;
    $t:string
}
export interface ITiledMapLayer{

    id:string;
    name:string;
    width:string;
    height:string;
    data:ITiledMapLayerData
}
export interface ITiledMapObjectGroupObject{

    id:string
    gid:string
    name?:string
    x:string
    y:string
    width:string
    height:string
    properties:ITiledProperties
}
export interface ITiledMapObjectGroup{

    id:string
    name:string
    object:ITiledMapObjectGroupObject|ITiledMapObjectGroupObject[]
}

export interface ITiledMapData{
    width:string;
    height:string
    objectgroup:ITiledMapObjectGroup|ITiledMapObjectGroup[]
    tileset:ITiledTileset[]
    layer:ITiledMapLayer|ITiledMapLayer[]
}

export interface ITiledFileData{

    map:ITiledMapData
}