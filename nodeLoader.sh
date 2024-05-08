#!/usr/bin/env bash

# para más detalles: https://gist.github.com/simov/cdbebe2d65644279db1323042fcf7624 
# usa este script para correr node en cron: se debe sourcear esto y luego se puede usar "node"
export NVM_DIR=${NVM_DIR:=${HOME}/.nvm}
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # carga nvm

NODE_LOADER_HOME=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

cd ${NODE_LOADER_HOME}

nvm use `cat "${NODE_LOADER_HOME}/.nvmrc"` --silent # carga la versión de node especificada .nvmrc
