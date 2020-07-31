# eecc

[![CircleCI](https://circleci.com/gh/cswcl/eecc.svg?style=svg)](https://circleci.com/gh/cswcl/eecc)

[![DeepScan grade](https://deepscan.io/api/projects/2448/branches/15546/badge/grade.svg)](https://deepscan.io/dashboard#view=project&pid=2448&bid=15546)

Descarga el listado de especies en categoría de conservación de la pagina https://clasificacionespecies.mma.gob.cl/
y lo guarda en una base de datos

## Instrucciones

1. Crear archivo `config/local.js` con base `config/example.local.js`

2. `npm ci`

3. `npm run db:migrate:latest`

4. Dependiendo de lo que se quiera hacer **hay 2 opciones** de ejecución:

    - `npm start` para solo ejecutar el crawler

    - Editar el archivo `example.cron.sh` y luego instalar
      para que el crawler quede andando dependiendo de la programación dada.
      Notar que los logs quedarán en el archivo `eecc.log`
