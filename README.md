La temática elegida para el proyecto ha sido una selección de libros y editoriales que se relacionan con un listado de usuarios registrados en la página.

El proyecto está dividido en 5 carpetas con sus subapartados correspondientes; Api, config, data, middleware, seeds

En la carpeta API se gestionan los controladores, rutas y modelos de los documentos a tratar.

Los controladores realizarán el CRUD específico de cada colección. Los controladores de tipo GET permitirán obtener información de los datos registrados en la BBDD. Los controladores POST permiten añadir nueva información a la BBDD. Los controladores PUT permiten modificar datos existentes y, finalmente, los controladores DELETE permiten eliminar datos de la BBDD.

En cuanto a los controladores de users, existen controladores PUT y DELETE similares a los anteriores. Pero además, el controlador Registrer permite crear un nuevo usuario y el controlador LOGIN acceder a la plataforma y generar un token de uso.

En la carpeta rutas están indicadas las url de acceso a cada controlador separadas por cada una de las colecciones. Es decir, existe una serie de rutas para libros, otra para editoriales y otra para usuarios. Todas ellas tienen como incio común http://localhost:3000/api/v1/

En la carpeta config está determinada la conexión con la bbdd y la gestión de token a través de las librerías mongoose y jsonwebtoken. Esta se realiza de manera automática al arrancar el servidor a través de index.js

La carpeta data almacena un modelo de referencia para la colección editoriales y libros, que servirá de semilla a la carpeta Seeds en caso de tener que formatear la BBDD.

Por último, la carpeta middleware tiene almacenada la configuración de usuarios segun el rol en que se los defina, diferenciando entre users y admins. El rol de admin podrá acceder a todos los controladores de usuario, mientras que el rol de user estará limitado a los métodos get y, en caso de tratarse de sí mismo a quien se hace referencia, al método DELETE.
