#!/bin/bash
. $DIR/util.sh

echo "Step 15 find /home/basiclinux/find/*"
for file in ${homedir}find/file*
do
  removeFile $file
done
removeDir ${homedir}find
