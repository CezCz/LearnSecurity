#!/bin/bash

. $DIR/util.sh

echo "Step 9, remove /home/basiclinux/grep/A"

removeFile ${homedir}grep/A
removeDir ${homedir}grep
