El proyecto está dividido en 5 carpetas con sus subapartados correspondientes; Api, config, data, middleware, seeds

La temática elegida para el proyecto ha sido una selección de libros y editoriales en relación con una base de usuarios.

Los usuarios tienen asociada una colección de libros, que a su vez, está vindulada a una serie de editoriales para detallar la información seleccionada.

En la carpeta API se gestionan los controladores, rutas y modelos de los documentos a tratar. En este caso, usuarios, libros y editoriales. Los controladores realizarán el CRUD específico de cada colección, los modelos definirán como se tienen que almacenar las informaciones de estos elementos, y las rutas definirán a través de donde y con qué metodo se accede.

En la carpeta config está determinada la conexión con la bbdd y la gestión de token a través de las librerías mongoose y jsonwebtoken.

La carpeta data almacena un modelo de referencia para la colección editoriales, que servirá de semilla a la carpeta Seeds en caso de tener que formatear la BBDD.

Por último, la carpeta middleware tiene almacenada la configuración de usuarios segun el rol en que se los defina, diferenciando entre users y admins.

Todo ello es controlado y dirigido por el fichero index.js
#   - P R O Y E C T O 7 - A P I - R E S T - A U T H  
 