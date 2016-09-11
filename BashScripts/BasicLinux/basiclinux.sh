#!/bin/bash

if [ $# -ne 2 ]
then
  echo "Usage:"
  echo "First param: create || delete"
  echo "Second param: #number || all"
  exit 1
fi

if [ "$1" == create ] || [ "$1" == remove ]; then

  homedir=/home/basiclinux/
  export homedir

  if [ "$1" == create ]; then
    #Add user basiclinux
    if ! getent passwd basiclinux
    then
      sudo useradd -m -d $homedir -s /bin/bash -p $(perl -e 'print crypt("basiclinux", "salt"),"\n"') basiclinux
      echo "User basiclinux created"
    else
      echo "User basiclinux already created skiping"
    fi
  fi

  DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
  export DIR
  all=$(ls -l ${DIR}/$1/basiclinux?*.sh | wc -l)

  if [ $2 == all ]; then
    for file in basiclinux`seq 1 $all`.sh; do
        ${DIR}/$1/$file
    done

  elif [ $2 -ge 1 ] && [ $2 -le $all ]; then
    ${DIR}/$1/basiclinux$2.sh
  else
    echo "Second parameter invalid"
  fi

fi
