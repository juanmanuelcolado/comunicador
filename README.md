# Comunicador

Aplicación mobile enfocada en la plataforma Android para personas de diferentes edades que presentaban una gran variedad de dificultades comunicativas, cognitivas y físicas.

## Proyecto

El proyecto está creado con la herramienta [ionic](http://ionicframework.com/), utiliza tecnologías web para luego mostrar el resultado en el dispositivo movil.

### Dependencias

En primer lugar, asegurarse de contar con [npm](https://www.npmjs.org/) instalado correctamente.

A partir de `npm` podemos instalar las demás dependencias necesarias:

```bash
$ sudo npm install -g cordova ionic gulp
```

Una vez terminado el comando anterior, podemos inicializar el proyecto, corriendo los siguientes comandos:

```bash
$ npm install
$ gulp install
```

### Desarrollo

Una vez instaladas las dependencias, todo lo que tenemos que hacer para poder comenzar el desarrollo local es correr un server local para servir los archivos.

Esto lo podemos hacer de dos formas distintas:

**Ionic**
```bash
$ cd www
$ ionic serve
```

**Python**
```bash
$ cd www

# Python < 2
$ python -m http.server 8000

# Python >= 3
$ python -m SimpleHTTPServer 8000

# Abrir un explorador web con la url http://localhost:8000
```


Por último, en la ruta del proyecto corremos

```bash
$ gulp
```

### Prueba en el dispositivo

Para poder ver el resultado del proyecto en un dispositivo [Android](http://www.android.com/) debemos correr los siguientes comandos:

```bash
$ ionic platform add android
$ ionic build ios
```

## Referencias

Para más información, los sitios de las herramientas utilizadas son:

* [Ionic](http://ionicframework.com/)
* [npm](https://www.npmjs.org/)
* [Gulp](http://gulpjs.com/)
* [Phonegap/cordova](http://phonegap.com/)