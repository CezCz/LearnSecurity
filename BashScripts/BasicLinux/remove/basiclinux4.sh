#!/bin/bash

. $DIR/util.sh

echo "Step 4, remove list/pswd/.hiddencontent"

removeFile "${homedir}list/pswd/.hiddencontent"

removeDir ${homedir}list/pswd
removeDir ${homedir}list
