#!/usr/bin/env bash

# inicialización necesaria para correr este script desde cron
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm

# directorio donde se encuentra este script
curdir=`dirname "$0"`
cd $curdir

nvm use `cat .nvmrc` # load node in .nvmrc

npm start > "eecc.log" 2>&1
