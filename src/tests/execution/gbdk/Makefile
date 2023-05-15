#
# Simple Makefile that compiles all .c and .s files in the same folder
#

# If you move this project you can change the directory 
# to match your GBDK root directory (ex: GBDK_HOME = "C:/GBDK/"

ifndef GBDK_HOME
	GBDK_HOME = C:/gbdk/
endif

LCC = $(GBDK_HOME)bin/lcc 
PNG2ASSET = $(GBDK_HOME)bin/png2asset 
GAMEBOY_TILEMAP_TOOL = ../../../../dist/windows/tiled-gameboy-tool

# You can uncomment the line below to turn on debug output
# LCC = $(LCC) -debug

# You can set the name of the .gb ROM file here
PROJECTNAME    = Example

BINS	    = $(PROJECTNAME).gb
CSOURCES   = $(wildcard gen/*.c)

all: run-gbdk-tiled run-gbdk-ldtk

prepare: clean
	mkdir -p gen
	mkdir -p obj

png2asset-gbdk-tiled: prepare
	$(PNG2ASSET) ./res/World1Tileset.png -c ./gen/World1Tileset.c -map -noflip
	$(PNG2ASSET) ./res/Enemies.png -c ./gen/Enemies.c -sh 16 -sw 18
	$(GAMEBOY_TILEMAP_TOOL) --gbdk --tiled ./res/World1Area1.tmx --output-dir ./gen --export-objects

png2asset-gbdk-ldtk: prepare
	$(PNG2ASSET) ./res/World1Tileset.png -c ./gen/World1Tileset.c -map -noflip
	$(PNG2ASSET) ./res/Enemies.png -c ./gen/Enemies.c -sh 16 -sw 18
	$(GAMEBOY_TILEMAP_TOOL) --gbdk --ldtk ./res/ldtk-test-project.ldtk --output-dir ./gen --export-objects

compile.bat: Makefile
	@echo "REM Automatically generated from Makefile" > compile.bat
	@make -sn | sed y/\\//\\\\/ | grep -v make >> compile.bat

# Compile and link all source files in a single call to LCC
run-gbdk-tiled: png2asset-gbdk-tiled	$(CSOURCES)
	$(LCC) -Igen -o obj/$(BINS) main.tiled.c $(CSOURCES)

# Compile and link all source files in a single call to LCC
run-gbdk-ldtk: png2asset-gbdk-ldtk	$(CSOURCES)
	$(LCC) -Igen -o obj/$(BINS) main.ldtk.c $(CSOURCES)

clean:
	rm -f *.o *.lst *.map *.gb *.ihx *.sym *.cdb *.adb *.asm
	rm -f  gen/*.*
	rm -f  obj/*.*

