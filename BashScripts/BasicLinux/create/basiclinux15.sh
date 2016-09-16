#!/bin/bash
. $DIR/util.sh

echo "Step 15 find /home/basiclinux/find/ -size 2048c -user basiclinux"
sudo mkdir -p ${homedir}find
max=8192    # number of bytes
for ((counter=1; counter<=274; counter++))
do
    cat /dev/urandom | tr -dc 'a-zA-Z0-9 ' | fold -w $(($RANDOM%max + 1)) | head -n 1 | sudo tee ${homedir}find/file$counter > /dev/null
    printDot counter
done

cat /dev/urandom | tr -dc 'a-zA-Z0-9 ' | fold -w 2040 | head -n 1 | sudo tee ${homedir}find/file274 > /dev/null
(echo 'FOOBAR' | cat - ${homedir}find/file274) | sudo tee ${homedir}find/file274 > /dev/null
sudo chown basiclinux:basiclinux ${homedir}find/file274

for ((counter=275; counter<=548; counter++))
do
    cat /dev/urandom | tr -dc 'a-zA-Z0-9 ' | fold -w $(($RANDOM%max + 1)) | head -n 1 | sudo tee ${homedir}find/file$counter > /dev/null
    printDot counter
done

for i in `seq 1 16 548`
do
   if [ ! $( du -b ${homedir}find/file$i | cut -f1 ) -eq 2048 ]
   then
    sudo chown basiclinux:basiclinux ${homedir}find/file$i
    sudo chmod 400 ${homedir}find/file$i
    printDot counter
   fi
done
