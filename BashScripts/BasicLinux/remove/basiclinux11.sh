#!/bin/bash
. $DIR/util.sh

echo "Step 11, remove /home/basiclinux/grep/C "
removeFile ${homedir}grep/C
removeDir ${homedir}grep
