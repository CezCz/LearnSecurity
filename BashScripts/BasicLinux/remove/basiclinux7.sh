#!/bin/bash

. $DIR/util.sh

echo "Step 7, remove ~/cat ~/cat/A/pass ~/cat/B/pass ~/cat/C/pass"
removeFile ${homedir}cat/A/pass
removeFile ${homedir}cat/B/pass
removeFile ${homedir}cat/C/pass

removeDir ${homedir}cat/A
removeDir ${homedir}cat/B
removeDir ${homedir}cat/C
removeDir ${homedir}cat
