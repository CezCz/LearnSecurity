#!/bin/bash

echo "Step 15 find /home/basiclinux/find/ -size 2k -user basiclinux"
sudo mkdir -p ${homedir}find
max=8192    # number of bytes
for ((counter=1; counter<=273; counter++))
do
    sudo dd bs=1 count=$(($RANDOM%max + 1)) if=/dev/urandom of=${homedir}find/file$counter > /dev/null
done

sudo dd bs=2041 count=1 if=/dev/urandom of=${homedir}find/file274 > /dev/null
(echo 'FOOBAR'; cat file274) | sudo tee ${homedir}file274 > /dev/null
sudo chown basiclinux:basiclinux ${homedir}find/file274

for ((counter=274; counter<=548; counter++))
do
    sudo dd bs=1 count=$(($RANDOM%max + 1)) if=/dev/urandom of=${homedir}find/file$counter > /dev/null
done

for i in `seq 1 16 548`
do
   if [ ! $( du -b ${homedir}find/file$i | cut -d' ' -f1 ) -eq 2048 ]
   then
    sudo chown basiclinux:basiclinux ${homedir}find/file$i
   fi
done
