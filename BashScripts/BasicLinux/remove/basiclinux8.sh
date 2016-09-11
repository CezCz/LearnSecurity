#!/bin/bash

. $DIR/util.sh

echo "Step 8, remove changedir/Phasellus/nec/sapien/vel/mauris/sollicitudin/interdum/nec/eu/ligula/*"

removeFile ${homedir}changedir/Phasellus/nec/sapien/vel/mauris/sollicitudin/interdum/nec/eu/ligula/A > /dev/null
removeFile ${homedir}changedir/Phasellus/nec/sapien/vel/mauris/sollicitudin/interdum/nec/eu/ligula/B > /dev/null
removeFile ${homedir}changedir/Phasellus/nec/sapien/vel/mauris/sollicitudin/interdum/nec/eu/ligula/C > /dev/null

removeAll ${homedir}changedir/Phasellus
removeDir ${homedir}changedir
