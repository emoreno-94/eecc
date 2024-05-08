#!/usr/bin/env bash

# directorio donde se encuentra este script
SCRIPT_HOME="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

source ${SCRIPT_HOME}/nodeLoader.sh
npm start
