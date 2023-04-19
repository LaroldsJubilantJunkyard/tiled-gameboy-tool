"dist/index-win.exe" --enable-objects --object-field gbdk.type uint8 ^
                                      --object-field gbdkString.dialogue string ^
                                      --output-dir dist ^
                                       World1Area1.tmx

"dist/index-win.exe" --enable-objects --export-type rgbds   --object-field gbdk.type uint8 ^
                                                            --object-field gbdkString.dialogue string ^
                                                            --output-dir dist/dist2 ^
                                                            World1Area1.tmx