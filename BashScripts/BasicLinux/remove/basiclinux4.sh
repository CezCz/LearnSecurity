#!/bin/bash

. $DIR/util.sh

echo "Step 4, remove list/pswd/.password:hiddencontent"

removeFile "${homedir}list/pswd/.password:listcontent"

removeDir ${homedir}list/pswd
removeDir ${homedir}list
