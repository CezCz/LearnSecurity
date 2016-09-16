#!/bin/bash

. $DIR/util.sh

echo "Step 5, ls list/privledges"
removeFile "${homedir}list/privledges"

removeDir ${homedir}list
