#!/bin/bash
. $DIR/util.sh

echo "Step 10, remove /home/basiclinux/grep/B "

removeFile ${homedir}grep/B
removeDir ${homedir}grep
