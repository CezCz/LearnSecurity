#!/bin/bash

. $DIR/util.sh

echo "Step 5, ls list/pswd/privledges"
removeFile "${homedir}list/pswd/privledges"

removeDir ${homedir}list/pswd
removeDir ${homedir}list
