#include <gb/gb.h>
#include <stdint.h>
#include "World1Tileset.h"
#include "world1area1.h"
#include "Enemies.h"

void main(void)
{

    set_sprite_data(0,Enemies_TILE_COUNT,Enemies_tiles);
    set_bkg_data(0,World1Tileset_TILE_COUNT,World1Tileset_tiles);

    SHOW_BKG;
    SHOW_SPRITES;
    SPRITES_8x16;
    DISPLAY_ON;

    uint8_t sprite = 0;

    for(uint8_t i=0;i<20;i++){

        for(uint8_t j=0;j<18;j++){

            uint16_t index = world1area1_WIDTH*j+i;
            uint8_t tile = world1area1_map[index];



            if(tile==255){

                uint8_t object = world1area1_map_attributes[index];

                uint8_t x = world1area1_objects[object].x+8;
                uint8_t y = world1area1_objects[object].y+16;
                sprite+=move_metasprite(Enemies_metasprites[0],0,sprite,x,y);
            }else{
                set_bkg_tile_xy(i,j,tile);
            }
        }


    }


    // Loop forever
    while(1) {


		// Game main loop processing goes here


		// Done processing, yield CPU and wait for start of next frame
        wait_vbl_done();
    }
}
