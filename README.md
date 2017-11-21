# eecc
Descarga el listado de especies en categoría de conservación de la pagina http://www.mma.gob.cl/clasificacionespecies/listado-especies-nativas-segun-estado-2014.htm y lo guarda en una base de datos

# Instrucciones


1. Crear archivo `config/local.js` con base `confif/example.local.js`
2. `npm install` # instalacion de dependencias
3. `npm run db:migrate:latest` # migración inicial
4. `npm run db:seed:run` # insertar datos iniciales
5. Dependiendo de lo que se quiera hacer **hay 2 opciones** de ejecución:
    
    - `npm start` # para solo ejecutar el crawler
    - Editar el archivo `example.cron.sh` y luego instalar 
      para que el crawler quede andando dependiendo de la programación dada.
      Notar que los logs quedarán en el archivo `eecc.log`

