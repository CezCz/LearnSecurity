#!/bin/bash
. $DIR/util.sh

echo "Step 6, cat cat/pass"
removeFile ${homedir}cat/pass

removeDir ${homedir}cat
