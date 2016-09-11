#!/bin/bash

echo "Step 1, man 6 basicman manpagesarecool"
mandir=/usr/local/share/man/
man1=${mandir}man1/
man6=${mandir}man6/
basicman1=${man1}basicman.1
basicman6=${man6}basicman.6
#Create manpage directory for manpage(1) for basicman
if [ ! -d $man1 ]
then
  sudo mkdir -p $man1
fi
#Create manpage directory for manpage(6) for basicman
if [ ! -d $man6 ]
then
  sudo mkdir -p $man6
fi

#Create manpage(1) and fill it with content
if [ ! -f $basicman1 ] && [ ! -f ${basicman1}.gz ]
then
  printf ".\\\\\" Manpage for basicman.
.\\\\\" Contact czarek.czernecki@gmail.com  for anything.
.TH man 1 \"04 Sep 2016\" \"1.0\" \"basicman man page\"
.SH NAME
basicman \- simple manual to checkout
.SH DESCRIPTION
This is man 1 of basicman, try 6th page of this manual.
.SH BUGS
No known bugs.
.SH AUTHOR
Cezary Czernecki(czarek.czernecki@gmail.com)
" | sudo tee $basicman1 > /dev/null

  sudo gzip $basicman1
fi

#Create manpage(6) and fill it with content
if [ ! -f $basicman6 ] && [ ! -f ${basicman6}.gz ]
then
  printf ".\\\\\" Manpage for basicman.
.\\\\\" Contact czarek.czernecki@gmail.com  for anything.
.TH man 6 \"04 Sep 2016\" \"1.0\" \"basicman man page\"
.SH NAME
basicman \- simple manual to checkout
.SH DESCRIPTION
Password is \- manpagesarecool
.SH BUGS
No known bugs.
.SH AUTHOR
Cezary Czernecki(czarek.czernecki@gmail.com)
" | sudo tee $basicman6 > /dev/null 

  sudo gzip $basicman6
fi
