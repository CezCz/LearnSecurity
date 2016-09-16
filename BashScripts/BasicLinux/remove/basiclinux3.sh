#!/bin/bash

. $DIR/util.sh

echo "Step 3, removing /home/basiclinux/list/pswd/listcontent from filesystem"

removeFile "${homedir}list/pswd/listcontent"

removeDir ${homedir}list/pswd
removeDir ${homedir}list
