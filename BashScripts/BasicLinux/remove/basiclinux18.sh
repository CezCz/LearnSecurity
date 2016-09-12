#!/bin/bash
. $DIR/util.sh

echo "Step 18, uniq filter/A | wc -l"
removeFile ${homedir}filter/A
removeDir ${homedir}filter
