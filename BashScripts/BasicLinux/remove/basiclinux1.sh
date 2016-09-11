#!/bin/bash

echo "Removing Step 1, Deleting /usr/local/share/man/man1/basicman.1* and .../man/man6/basicman.6*"
basicman1=/usr/local/share/man/man1/basicman.1*
basicman6=/usr/local/share/man/man6/basicman.6*

if [ -e $basicman1 ] || [ -e $basicman6 ]
then
  sudo rm -f $basicman1 $basicman6*
fi
