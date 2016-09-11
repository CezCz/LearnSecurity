#!/bin/bash

echo "Step 15 find find -size 2k -user basiclinux"
mkdir -p ${homedir}find
max=8192    # number of megabytes
for ((counter=1; counter<=273; counter++))
do
    dd bs=1 count=$(($RANDOM%max + 1)) if=/dev/urandom of=${homedir}find/file$counter
done

dd bs=2041 count=1 if=/dev/urandom of=${homedir}find/file274
(echo 'FOOBAR'; cat file274) > file274
chown basiclinux:basiclinux ${homedir}find/file274

for ((counter=274; counter<=548; counter++))
do
    dd bs=1 count=$(($RANDOM%max + 1)) if=/dev/urandom of=${homedir}find/file$counter
done


for i in `seq 1 21 548`
do
   if [ ! $( du -b ${homedir}find/file$i | cut -d' ' -f1 ) -eq 2048 ]
   then
    chown basiclinux:basiclinux ${homedir}find/file$i
   fi
done
