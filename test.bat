"dist/windows/tiled-gameboy-tool.exe" --enable-objects --solid-map --object-field gbdk.type uint8 ^
                                      --object-field gbdkString.dialogue string ^
                                      --output-dir dist ^
                                       assets/World1Area1.tmx

"dist/windows/tiled-gameboy-tool.exe" --enable-objects --solid-map --export-type --rgbds     --object-field gbdk.type uint8 ^
                                                                            --object-field gbdkString.dialogue string ^
                                                                            --output-dir dist/dist2 ^
                                                                            assets/World1Area1.tmx