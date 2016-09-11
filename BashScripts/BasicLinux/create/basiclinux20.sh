#!/bin/bash

echo "Step 20, tar"
mkdir -p ${homedir}tar

echo "PidgeonPrinciple" > ${homedir}tar/A

du -b ${homedir}tar/A

tar --remove-file -cvf ${homedir}tar/file ${homedir}tar/A
tar -jcvf ${homedir}tar/file ${homedir}tar/file
tar -zcvf ${homedir}tar/file ${homedir}tar/file
tar -zcvf ${homedir}tar/file ${homedir}tar/file
tar --remove-file -cvf ${homedir}tar/fileA ${homedir}tar/file
tar --remove-file -cvf ${homedir}tar/file ${homedir}tar/fileA
tar -jcvf ${homedir}tar/file ${homedir}tar/file
tar -zcvf ${homedir}tar/fileA ${homedir}tar/file
tar --remove-file -cvf ${homedir}tar/file ${homedir}tar/fileA
tar -jcvf ${homedir}tar/file ${homedir}tar/file
tar -zcvf ${homedir}tar/file ${homedir}tar/file
tar -jcvf ${homedir}tar/file ${homedir}tar/file
