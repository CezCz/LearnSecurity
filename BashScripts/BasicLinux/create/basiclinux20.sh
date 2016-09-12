#!/bin/bash

echo "Step 20, detar /home/basiclinux/tar/file tar -jxvf file && tar -zxvf file && tar -xvf file"
sudo mkdir -p ${homedir}tar

echo "PidgeonHolePrinciple" | sudo tee ${homedir}tar/A > /dev/null

sudo tar --remove-file -cvf ${homedir}tar/file -C ${homedir}tar A
sudo tar -jcvf ${homedir}tar/file -C ${homedir}tar file
sudo tar -zcvf ${homedir}tar/file -C ${homedir}tar file
sudo tar -zcvf ${homedir}tar/file -C ${homedir}tar file
sudo tar --remove-file -cvf ${homedir}tar/fileA -C ${homedir}tar file
sudo tar --remove-file -cvf ${homedir}tar/file -C ${homedir}tar fileA
sudo tar -jcvf ${homedir}tar/file -C ${homedir}tar file
sudo tar -zcvf ${homedir}tar/fileA -C ${homedir}tar file
sudo tar --remove-file -cvf ${homedir}tar/file -C ${homedir}tar fileA
sudo tar -jcvf ${homedir}tar/file -C ${homedir}tar file
sudo tar -zcvf ${homedir}tar/file -C ${homedir}tar file
sudo tar -jcvf ${homedir}tar/file -C ${homedir}tar file
