#!/bin/bash
. $DIR/util.sh

echo "Step 19, /home/basiclinux/filter/*"
removeFile ${homedir}filter/B
removeDir ${homedir}filter
