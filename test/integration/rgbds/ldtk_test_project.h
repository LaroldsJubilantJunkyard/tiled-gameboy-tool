#include <gbdk/platform.h>

#define ldtk_test_project_TILE_COUNT 0
#define ldtk_test_project_WIDTH 0
#define ldtk_test_project_HEIGHT 0

extern const unsigned char ldtk_test_project_map[0];
extern const unsigned char ldtk_test_project_map_attributes[0] ;

#define ldtk_test_project_OBJECT_COUNT 0

typedef struct ldtk_test_project_Object {

    uint16_t y;
    uint16_t x;
    uint8_t id;
    	char *gbdkstring_dialogue;

} ldtk_test_project_Object; 

extern const ldtk_test_project_object ldtk_test_projectObjects[0];