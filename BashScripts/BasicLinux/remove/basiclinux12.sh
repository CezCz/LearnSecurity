#!/bin/bash
. $DIR/util.sh

echo "Step 12, remove /home/basiclinux/grep/D"
removeFile ${homedir}grep/D
removeDir ${homedir}grep
