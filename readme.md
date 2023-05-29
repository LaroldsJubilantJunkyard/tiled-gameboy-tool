# Tiled Gameboy Tool

This tool was written to help modern gameboy game developers create games easier. [Tiled]() is a very-capable free open-source map editor. This project gives users the ability to export tiled tilemaps & objects for use with [GBDK](https://github.com/gbdk-2020/gbdk-2020) and/or [RGBDS](https://rgbds.gbdev.io/).

You can download GBDK-2020 [here](https://github.com/gbdk-2020/gbdk-2020)
You can download RGBDS [here](https://rgbds.gbdev.io/)

This tool works with [Tiled Map Editor](https://www.mapeditor.org/) and [The Level Designers Tookit](https://ldtk.io/)

**Important Notice:** This tool does not convert export tileset data, you should use [png2asset](https://gbdk-2020.github.io/gbdk-2020/docs/api/docs_toolchain.html#autotoc_md124) or [rgbgfx](https://rgbds.gbdev.io/docs/v0.4.2/rgbgfx.1/) for that.

## Arguments

- --gbdk 
- --rgbds
- --tiled <tiled-tmx-file>
- --ldtk <ldtk-file>
- -d <directory>, --output-dir <directory>
- -obj, --export-objects
- --embed-objects
- -id, --identifier <identifier>
- --object-field <type> <name>
- -b <bank>, --bank <bank>
- -sm, --export-solid-map
- --offset <offset-value>

## Walkthrough

Here's a basic walkthrough of how to use the program. As the bare minimum

### Specifying your map editor and file

Firstly, you'll need to pass in what file you are converting. Depending on which map editor you are using, you can do this with one of the two arguments:

- --tiled <tiled-tmx-file>
- --ldtk <ldtk-file>

Next, The tool still needs more information. It needs to know which gameboy toolset you are using.

### Specifying your output format GBDK vs RGBDS

GBDK is a programming library based on the C programming language. RGBDS is A free assembler/linker package for the Game Boy and Game Boy Color. You ned to tell the tool which one you are using. For that, you should use one of these two arguments:

- --gbdk 
- --rgbds

### Output Destination

If you want to specify, where your resultant files will be placed, use this argument.

- -d <directory>, --output-dir <directory>

This is great for organizing large or complicated projects.

### Handling Map Objects

If you want to export map objects from your map editor, pass the following argument:

- -obj, --export-objects

This will tell the tool to output objects found in your map editor. If you wish for those objects to be embedded inside of the final tilemap, use the following argument:

- --embed-objects

## Examples

Exporting a GBDK tilemap from tiled

`tiled-gameboy-tool --gbdk --tiled my/tiled/level1.tmx`

Exporting a GBDK tilemap from ldtk

`tiled-gameboy-tool --gbdk --ldtk my/ldtk/level1.ldtk`

Exporting a RGBDS tilemap from tiled

`tiled-gameboy-tool --rgbds --tiled my/tiled/level1.tmx`

Exporting a RGBDS tilemap from ldtk

`tiled-gameboy-tool --rgbds --ldtk my/ldtk/level1.ldtk`