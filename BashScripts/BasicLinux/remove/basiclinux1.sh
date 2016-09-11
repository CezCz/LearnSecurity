#!/bin/bash

echo "Removing Step 1, Deleting /usr/local/share/man/man1/basicman.1* and .../man/man6/basicman.6*"
mandir=/usr/local/share/man/
man1=${mandir}man1/
man6=${mandir}man6/
basicman1=${man1}basicman.1*
basicman6=${man6}basicman.6*

sudo rm -f $basicman1 $basicman6*
