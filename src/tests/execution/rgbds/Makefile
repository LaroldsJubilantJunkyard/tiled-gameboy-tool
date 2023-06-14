ifndef EXECUTION_PLATFORM
	EXECUTION_PLATFORM = windows
endif

SRCDIR      = src
OBJDIR      = obj
GENDIR      = gen
RESDIR      = res
DISTDIR     = dist

GAMEBOY_TILEMAP_TOOL = ../../../../dist/$(EXECUTION_PLATFORM)/tiled-gameboy-tool 

# You can set the name of the .gb ROM file here
PROJECTNAME    = rgbds-tiled-rom

BINS	    = $(PROJECTNAME).gb

MKDIRS      = $(OBJDIR) $(GENDIR) $(DISTDIR) $(RESDIR) # See bottom of Makefile for directory auto-creation

all: run-rgbds-tiled


rgbgfx-rgbds: 
	rgbgfx -o $(GENDIR)/World1Tileset.2bpp  $(RESDIR)/World1Tileset.png
	rgbgfx -o $(GENDIR)/Enemies.2bpp  $(RESDIR)/Enemies.png
	$(GAMEBOY_TILEMAP_TOOL) --rgbds --tiled $(RESDIR)/World1Area1_RGBDS.tmx --output-dir $(GENDIR) --export-objects

compile.bat: Makefile
	@echo "REM Automatically generated from Makefile" > compile.bat
	@make -sn | sed y/\\//\\\\/ | grep -v make >> compile.bat

# Compile and link all source files in a single call to LCC
run-rgbds-tiled: rgbgfx-rgbds
	rgbasm -L -o $(OBJDIR)/main.o $(SRCDIR)/main.asm
	rgbasm -L -o $(OBJDIR)/World1Area1_RGBDS.o $(GENDIR)/World1Area1_RGBDS.asm
	rgblink -o $(DISTDIR)/$(BINS) $(OBJDIR)/main.o $(OBJDIR)/World1Area1_RGBDS.o
	rgbfix -v -p 0xFF $(DISTDIR)/$(BINS)
clean:
	rm -f  $(GENDIR)/*.*
	rm -f  $(OBJDIR)/*.*
	rm -f  $(DISTDIR)/*.*

# create necessary directories after Makefile is parsed but before build
# info prevents the command from being pasted into the makefile
ifneq ($(strip $(EXT)),)           # Only make the directories if EXT has been set by a target
$(info $(shell mkdir -p $(MKDIRS)))
endif