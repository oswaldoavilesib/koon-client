# Koon App in Next JS
Para correr en local es necesario tener la base de datos con docker. 
...
Corre el siguiente comando en la terminal: docker-compose up -d
...

*El -d, significa _detached_

##Configurar las variables de entorno
Renombrar el archivo __.env.template__a__.env__

*MongoDB URL Local: 
´´´´
MONGO_URL=mongodb://localhost:27017/kaandb
´´´´

* Reconstruir los módulos de node  y levantar Next
´´´´
yarn install
yarn dev
´´´´

## Llenar la base de datos con información de pruebas
Llamar a: 
´´´´

´´´´