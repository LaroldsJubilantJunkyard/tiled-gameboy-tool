#
# Simple Makefile that compiles all .c and .s files in the same folder
#

# If you move this project you can change the directory 
# to match your GBDK root directory (ex: GBDK_HOME = "C:/GBDK/"

ifndef GBDK_HOME
	GBDK_HOME = C:/gbdk/
endif

ifndef EXECUTION_PLATFORM
	EXECUTION_PLATFORM = windows
endif

LCC = $(GBDK_HOME)bin/lcc 
PNG2ASSET = $(GBDK_HOME)bin/png2asset 
GAMEBOY_TILEMAP_TOOL = ../../../../dist/$(EXECUTION_PLATFORM)/tiled-gameboy-tool 
# You can uncomment the line below to turn on debug output
# LCC = $(LCC) -debug

# You can set the name of the .gb ROM file here
PROJECTNAME    = Example


SRCDIR      = src
OBJDIR      = obj
GENDIR      = gen
RESDIR      = res
DISTDIR     = dist

BINS	    = $(PROJECTNAME).gb
CSOURCES   = $(wildcard gen/*.c)


MKDIRS      = $(OBJDIR) $(GENDIR) $(DISTDIR) $(RESDIR) # See bottom of Makefile for directory auto-creation

all: run-gbdk-tiled run-gbdk-ldtk


png2asset-gbdk-tiled: 
	$(PNG2ASSET) $(RESDIR)/World1Tileset.png -c $(GENDIR)/World1Tileset.c -map -noflip
	$(PNG2ASSET) $(RESDIR)/Enemies.png -c $(GENDIR)/Enemies.c -sh 16 -sw 18
	$(GAMEBOY_TILEMAP_TOOL) --gbdk --tiled $(RESDIR)/World1Area1.tmx --output-dir $(GENDIR) --export-objects

png2asset-gbdk-ldtk: 
	$(PNG2ASSET) $(RESDIR)/World1Tileset.png -c $(GENDIR)/World1Tileset.c -map -noflip
	$(PNG2ASSET) $(RESDIR)/Enemies.png -c $(GENDIR)/Enemies.c -sh 16 -sw 18
	$(GAMEBOY_TILEMAP_TOOL) --gbdk --ldtk $(RESDIR)/ldtk-test-project.ldtk --output-dir $(GENDIR) --export-objects

compile.bat: Makefile
	@echo "REM Automatically generated from Makefile" > compile.bat
	@make -sn | sed y/\\//\\\\/ | grep -v make >> compile.bat

# Compile and link all source files in a single call to LCC
run-gbdk-tiled: png2asset-gbdk-tiled
	$(LCC) -I$(GENDIR) -o $(OBJDIR)/$(BINS) $(SRCDIR)/main.tiled.c $(CSOURCES)

# Compile and link all source files in a single call to LCC
run-gbdk-ldtk: png2asset-gbdk-ldtk
	$(LCC) -I$(GENDIR) -o $(OBJDIR)/$(BINS) $(SRCDIR)/main.ldtk.c $(CSOURCES)

clean:
	rm -f  $(GENDIR)/*.*
	rm -f  $(OBJDIR)/*.*

# create necessary directories after Makefile is parsed but before build
# info prevents the command from being pasted into the makefile
$(info $(shell mkdir -p $(MKDIRS)))