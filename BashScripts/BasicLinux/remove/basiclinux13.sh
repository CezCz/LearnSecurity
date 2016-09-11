#!/bin/bash
. $DIR/util.sh

echo "Step 13, head -1 headtail/A && tail -1 headtail/A"
removeFile ${homedir}headtail/A
removeDir ${homedir}headtail
