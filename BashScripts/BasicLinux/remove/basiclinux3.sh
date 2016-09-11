#!/bin/bash

. $DIR/util.sh

echo "Step 3, removing /home/basiclinux/list/pswd//pass word:listcontent from filesystem"

removeFile "${homedir}list/pswd/pass word:listcontent"

removeDir ${homedir}list/pswd
removeDir ${homedir}list
