#!/bin/bash
. $DIR/util.sh

echo "Step 14, remove headtail/A"
removeFile ${homedir}headtail/A
removeDir ${homedir}headtail
