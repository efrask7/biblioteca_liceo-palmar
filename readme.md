# Biblioteca Liceo Palmar (Beta)
*Aplicación de escritorio para gestionar libros y sus prestamos*

### Descripción

Este proyecto es una aplicación de escritorio para gestionar la biblioteca del Liceo Palmar. Permite realizar operaciones como agregar, editar, eliminar y buscar libros, así como gestionar los préstamos de los mismos, guardando los registros en una base SQLite.

### Tecnologías

- [Electron](https://www.electronjs.org/)
- [React](https://es.reactjs.org/)
- [Flowbite](https://flowbite-react.com/)
- [SQLite](https://www.npmjs.com/package/better-sqlite3)
- [Tailwind](https://tailwindcss.com/)
- [Xlsx](https://www.npmjs.com/package/xlsx)
- [React-Icons](https://react-icons.github.io/react-icons/)

### Instalación como programa
1. Descargar el instalador de la aplicación desde los [releases](https://github.com/efrask7/biblioteca_liceo-palmar/releases) según tu sistema operativo.
2. Ejecutar el instalador y seguir las instrucciones.
3. Una vez instalado, ejecutar la aplicación desde el acceso directo en el escritorio o desde el menú de inicio.

### Importante
- La aplicación se encuentra en la versión beta, por lo que puede tener errores y fallos en su funcionamiento.
- La aplicación fue desarrollada en un entorno de Windows, por lo que el instalador, el ejecutable y las actualizaciónes automaticas son específicos para este sistema operativo.
- La aplicación fue probada en Windows 10, Windows 11 y Ubuntu 24, aun pudiendo tener problemas en la instalación y ejecución en este ultimo sistema operativo.
- Al estar en la versión beta, la aplicación puede tener errores y fallos en su funcionamiento, si deseas debugear o colaborar con el desarrollo de la aplicación, puedes clonar el repositorio y seguir las instrucciones de instalación y uso.
- Para debugear la aplicación en ejecución, se puede usar la combinación de teclas `Ctrl + Shift + I` para abrir la consola de desarrollo. En Ubuntu es posible abrir la aplicación desde la terminal y ver los mensajes de error en la consola.


### Instalación para desarrollo

1. Clona el repositorio: 
  ```sh
  git clone https://github.com/efrask7/biblioteca_liceo-palmar.git
  ```
2. Navega al directorio del proyecto: 
  ```sh
  cd biblioteca_liceo-palmar
  ```
3. Instala las dependencias: 
  ```sh
  npm install
  ```

### Uso

- Para iniciar la aplicación en modo de desarrollo: 
  ```sh
  npm start
  ```
- Para empaquetar la aplicación: 
  ```sh
  npm run package
  ```
- Para crear un instalador: 
  ```sh
  npm run make
  ```

### Características

- Agregar, editar y eliminar libros.
- Buscar y filtrar libros.
- Gestionar préstamos de libros.
- Importar datos de libros desde un archivo Excel.
- Eliminar todos los registros de la base de datos.
- Modificar los iconos de la aplicación en Linux.
- Auto actualización de la aplicación en Windows.
- Ver los cambios de nuevas versiones en la aplicación.

### Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cualquier cambio que desees realizar.

### Autor

[efrask7](https://github.com/efrask7)