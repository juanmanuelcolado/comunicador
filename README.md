# Comunicador

Aplicación orientada a celulares (principalmente con Android) como método alternativo aumentativo de comunicación para personas con [TEA](http://es.wikipedia.org/wiki/Trastornos_del_espectro_autista).

## Índice

* [Proyecto y tecnología utilizada](#proyecto-y-tecnología-utilizada)
* [Preparar nuestra PC](#preparar-nuestra-pc)
  * [En Windows](#en-windows)
  * [En Linux](#en-linux)
  * [Descargar paquetes del SDK](#descargar-paquetes-del-sdk)
* [Descargar el proyecto y unificar los javascripts](#descargar-el-proyecto-y-unificar-los-javascripts)
* [Estructura básica del proyecto](#estructura-básica-del-proyecto)
* [Pruebas!](#pruebas)
  * [En el explorador](#en-el-explorador)
  * [En el emulador](#en-el-emulador)
  * [En un celular real](#en-un-celular-real)
* [Interactuar con el server](#interactuar-con-el-server)
* [Capacitación](#capacitación)

## Proyecto y tecnología utilizada

Este proyecto está realizado con herramientas que permiten desarrollar con lenguajes web (javascript y html), y convertir esto en una aplicación mobile nativa. Los tres elementos más importantes son:

* [AngularJS](https://angularjs.org/): Es una biblioteca (y un framework) que permite crear páginas web (o, en este caso, aplicaciones móviles) de “una sola página”. Es decir, no se recarga toda la página/aplicación con cada interacción, sino sólo las partes que se desea que cambien. Agrupa una serie de funcionalidades que hacen mucho más sencillo el desarrollo, evitando duplicaciones y “reinventar la rueda” una y otra vez. También facilita la separación de responsabilidades en componentes, haciendo un código más limpio y sencillo de separar para que los desarrolladores puedan editarlo.
* [Phonegap](http://phonegap.com/)/[Cordova](https://cordova.apache.org/): Es un framework para convertir lo que se haya desarrollado con tecnologías web, a aplicaciones nativas de distintas plataformas para celulares o tablets.
* [Ionic](http://ionicframework.com/): Es una biblioteca que utiliza las funcionalidades de AngularJS, y les agrega comportamientos y estilos específicos para utilizarse en aplicaciones de celulares. Utiliza phonegap/cordova para generar la aplicación para celulares, y también permite probar la aplicación en un navegador fácilmente.

## Preparar nuestra PC

Para poder descargar, editar y probar este proyecto, tendremos que instalar una serie de programas. Intentamos describir todo paso a paso para evitar la mayor cantidad de “sorpresas” posibles.

### En Windows

* [Java Platform JDK](http://www.oracle.com/technetwork/es/java/javase/downloads/index.html): Incluye el enotrno para ejecutar aplicaciones de Java, junto con otras cosas exclusivas para desarrolladores. Si bien no se programa en java en este proyecto, es necesario para que funcionen cosas como emuladores de Android. En algunos casos puede ser necesario indicarle a windows una ruta a la carpeta del jdk, para poder utilizarse desde la terminal. Para agregarla, hacer:
  * Clic derecho en Computer
  * Properties
  * Advanced System Settings
  * Solapa "Advanced"
  * Environment Variables
  * Seleccionar "Path" en el **segundo** cuadrito (el de System Variables).
  * Edit
  * Poner esta ruta, cambiando lo que está entre comillas: ;"RutaEnDondePusieronElJDK" \bin
  * Si había terminales abiertas, cerrarlas y volverlas a abrir.
* [Android SDK](http://developer.android.com/sdk/index.html#Other): Sirve para poder crear los instaladores de las aplicaciones y para probar la aplicación en un celular virtual (un emulador) dentro de la PC.
  * ¿En dónde instalarlo? Se debe instalar en la carpeta **`C:\Program Files (x86)\Android\android-studio\sdk`** ¿Por qué? Porque ésa es la carpeta por defecto cuando se instala el paquete completo de Android Studio, y es la carpeta por defecto utilizada en los archivos del proyecto para interactuar con el sdk.
  * Luego de instalarlo, nos va a ofrecer abrirlo para descargar los paquetes que necesitemos para crear aplicaciones para distintas versiones de Android. Ponemos que **No** (o destildamos la opción). Eso lo vamos a hacer más adelante en este readme/tutorial.
* Vamos a tener accesos directos para abrir tanto el SDK (de donde bajamos paquetes), como AVD (de donde creamos emuladores). Sin embargo, no podremos acceder desde la consola a menos que le digamos a Windows en dónde están dos rutas. Para usar ionic, **necesitamos** que estén esas rutas. Entonces, hacemos lo mismo que antes del path, pero para estas dos rutas:
  * ;C:\Program Files (x86)\Android\android-studio\sdk\platform-tools
  * ;C:\Program Files (x86)\Android\android-studio\sdk\tools
* [Apache Ant](http://ant.apache.org/bindownload.cgi): Sirve para construir proyectos de software. Es requerido por otros programas que se nombran más adelante. Hay que descargar el .zip, descomprimirlo, y agregar la ruta:
  * ;"RutaEnDondePusieronApacheAnt" \bin
* [NodeJS](https://nodejs.org/): Sirve para “construir aplicaciones de red escalables, de forma rápida y sencilla”. Es requerido por otros programas que se nombran más adelante.
* [npm](https://www.npmjs.com/): Permite instalar programas, junto con los paquetes que éstos necesitan (es decir, sus dependencias). **No** hace falta instalar nada, ya que node incluye a npm.
* [Python](https://www.python.org/downloads/): La PC necesita poder entender cosas hechas con Python para que puedan funcionar bien los programas a instalar. Debemos bajar la versión **2.7.x**. Luego de instalarlo, agregar su ruta:
  * ;”Ruta donde se instaló Python  2.7”
* [Cordova](https://cordova.apache.org/): Abrir la consola (Windows + R -> cmd -> Enter) y escribir: `npm install -g cordova`
* [Ionic](http://ionicframework.com/): `npm install -g ionic`
* [Gulp](http://gulpjs.com/): Lo utilizaremos para que todos los archivos javascript que creemos y editemos, se “junten” en un solo archivo actualizado que usará la aplicación, y para otras cosas como “minify” archivos. La aplicación sólo usará un script nuestro, y éste estará actualizado gracias a gulp. Abrir la consola y escribir: `npm install -g gulp`
* [Git](http://git-scm.com/): Permite usar una consola (“Git Bash”) con comandos de git para el versionado del proyecto, tal como usaríamos en linux.
* [Visual Studio](https://www.visualstudio.com/en-us/downloads/download-visual-studio-vs.aspx): Este paso puede ser innecesario. Sólo se hace si en el paso siguiente ven un error por no encontrar un archivo **“VCBuild.exe”**. Si es así, seleccionar y descargar Visual Studio **“Express 2013 with Update 4 for Windows Desktop”**. Esto puede llevar bastante tiempo.
* [q](https://www.npmjs.com/package/q): Es un paquete para realizar acciones de forma asincrónica mediante “promesas”. Descargar ejecutando `npm install q`
* Más Dependencias: Para que funcione bien lo de gulp, tenemos que hacer lo siguiente:
  * Descargar el proyecto en alguna carpeta (si hay dudas con este paso, ver [más abajo](#descargar-el-proyecto-y-unificar-los-javascripts) cómo hacerlo).
  * Desde la consola, entrar a la carpeta del proyecto.
  * Ejecutar `npm install` y esperar.
  * Sólo deben aparecer warnings como máximo. Si aparece algún error en rojo, resolverlo, y actualizar este Readme.
* [Sublime Text](http://www.sublimetext.com/): Es un editor de texto elegante con el que podemos abrir toda la carpeta “www” para acceder de forma cómoda a los archivos. Tiene algunos shortcuts interesantes, y podemos agregarle cosas. Por ejemplo:
  * [Ionic Snippets](https://packagecontrol.io/packages/Ionic%20Snippets)

### En Linux
Para ver qué instala cada comando, ver el apartado anterior.
Los comandos acá mencionados, sirven para Ubuntu y demás distribuciones de la familia Debian.

* [Java Platform JDK](http://www.oracle.com/technetwork/es/java/javase/downloads/index.html): `sudo apt-get install default-jdk`
* [Android SDK](http://developer.android.com/sdk/index.html#Other): Descargar el SDK y descomprimirlo en la carpeta que queramos. Luego, hacer lo mismo del path de windows, pero para linux:
  * `printf "\nexport PATH=${PATH}: “ElLugarDondeLoHayanDescargado” /sdk/platform-tools: “ElLugarDondeLoHayanDescargado” /sdk/tools" >> ~/.profile`
  * `printf "\nexport PATH=${PATH}: “ElLugarDondeLoHayanDescargado” /sdk/platform-tools: “ElLugarDondeLoHayanDescargado” /sdk/tools" >> ~/.bashrc`
  * **Reiniciar la PC** o cerrar sesión y volverla a abrir.
* [Apache Ant](http://ant.apache.org/bindownload.cgi): `sudo apt-get install ant`
* [NodeJS](https://nodejs.org) junto con [npm](https://www.npmjs.com/):
  * `sudo add-apt-repository -y ppa:chris-lea/node.js`
  * `sudo apt-get update`
  * `sudo apt-get install --y nodejs`
* Si el sistema operativo es de 64 bits:
  * `sudo apt-get install lib32stdc++6`
  * `sudo apt-get install lib32z1`
* [Python](https://www.python.org/downloads/):
  * `sudo apt-get install python`
  * `sudo apt-get install -y python-software-properties python g++ make`
* [Cordova](https://cordova.apache.org/): `sudo npm install -g cordova`
* [Ionic](http://ionicframework.com/): `sudo npm install -g ionic`
* [Gulp](http://gulpjs.com/): `npm install --g gulp`
* [Git](http://git-scm.com/): sudo apt-get install --yes build-essential curl git
* [q](https://www.npmjs.com/package/q): `npm install q`
* Más Dependencias:
  * Descargar el proyecto en alguna carpeta.
  * Desde la consola, entrar a la carpeta del proyecto.
  * Ejecutar `npm install` y esperar.
* [Sublime Text](http://www.sublimetext.com/):
  * `sudo add-apt-repository ppa:webupd8team/sublime-text-3`
  * `sudo apt-get update`
  * `sudo apt-get install sublime-text-installer`

### Descargar paquetes del SDK

Para crear un instalador de android a partir de nuestro código, ionic debe poder interactuar con el sdk de Android. Debido a esto, hay que descargar paquetes:
* Escribimos en la consola: `android sdk`
* Esto nos abre una ventana de donde podemos descargar paquetes. Por lo menos, seleccionar:
  * En la sección “Tools”, las “Android SDK Build Tools” de versiones **19 y posteriores**.
  * Seleccionar la sección completa de “Android 4.4.2 (API **19**)” **y las siguientes**.
  * Seleccionar los extras que quieran. En el caso de que tengan un procesador intel que soporte virtualización, y quieran descargar “Intel x86 Emulator Accelerator (HAXM installer)”, recuerden que éste no es simplemente un “paquete” más, sino un archivo instalador que hay que ejecutar luego de que se descargue todo.
  * Hacer clic a “Install packages”.
  * Acepten las licencias de la lista de paquetes seleccionados. Asegúrense de que más abajo de la lista también esté todo aceptado.
  * Clic en “Install”. Aclaración: Esto puede llevar **mucho** tiempo. Son varios GB de información, así que asegúrense de poder dejar su PC encendida por horas (y/o contar con una muy buena conexión).
  * Listo. Con esto, Ionic sabrá qué herramientas utilizar para crear nuestro instalador.

Nota: Dentro del proyecto que descargarán con git, hay dos archivos llamados “local.properties”. En ambos hay una ruta predeterminada donde debemos poner el sdk. Si queremos ponerlo en otra ruta, debemos modificar ambos archivos para que lo encuentre en una ruta distinta. De más está decir, que si se descarga el proyecto en linux, sí o sí habrá que cambiar esta ruta, ya que no existe una ruta que comience con “C:\”. Si la cambian, asegúrense de no incluir los archivos al hacer un commit (**usen .gitignore**, o bien, **deshagan los cambios** que hayan hecho).

## Descargar el proyecto y unificar los javascripts

Con los pasos anteriores, ya deberíamos tener todo preparado para poder descargar el proyecto, modificarlo, probarlo, y subir los cambios. Antes de hacer modificaciones, debemos hacer lo siguiente:

1. Primero tenemos que descargar la aplicación:
  * Abrimos la consola de git (busquen "Git Bash" entre sus programas).
  * Creamos una carpeta que usemos para este proyecto.
  * Entramos a esa carpeta con la consola y ponemos `git init`
  * Luego agregamos el repositorio del proyecto: `git remote add origin https://github.com/ProyectoDane/comunicador.git` (para pegar en Git bash, usar la tecla Insert)
  * Listo, tenemos todo configurado. Traigamos el proyecto: `git pull origin master`
2. Ahora tenemos que iniciar gulp:
  * Simplemente abrimos una consola, ponemos `gulp`, y lo dejamos corriendo.
  * Modificamos un archivo de javascript. Agregamos un espacio, guardamos, y lo volvemos a quitar. Cualquier modificación. Esto le dice a gulp “Che, fijate que acabo de modificar un archivo. Andá y actualizá el archivo js que contiene todos los pequeños archivos de mi proyecto”.
  * Ahora sí, estamos listos para modificar cosas del proyecto y probarlas.

## Estructura básica del proyecto

Los que participen en este proyecto deberán investigar sobre angular y elementos relacionados. Sin embargo, haremos una breve introducción:
* En el archivo index.html se indican qué scripts vamos a utilizar, algo de configuración y demás cosas generales. Notar la parte donde dice `<ion-nav-view></ion-nav-view>` Esto significa que en ese lugar de la “página” vamos a ir intercambiando los fragmentos de html que definimos en otros lugares. De esta forma, no se recarga todo el sistema, sino que cambia sólo esa parte.
* Hay una carpeta de templates, que contiene las “views” que va mostrando la aplicación al navegarla. Es código html combinado con herramientas de angular. Son las partes visibles que se irán intercambiando en la aplicación al interactuar con ella.
* En la carpeta js tenemos, entre otras cosas:
  * Un archivo llamado app.js que tiene aspectos generales de la aplicación. Para ir entrando en tema, al enviarle el mensaje “config” al módulo de dicha aplicación, le estamos diciendo cómo tiene que manejar cada ruta del sistema, qué template y qué controller debe utilizar.
  * Carpetas de “controllers” para las vistas. Un Controller, básicamente, sirve para manejar los datos y definir acciones que se disparan a partir de interactuar con las vistas.
  * Carpeta db, que contiene toda la parte de guardar la información de la aplicación con una pequeña base de datos interna.
* Para ver qué template/controller se corresponde con cada parte que se ve del sistema, iniciar la aplicación con `ionic serve` y navegarla. En la URL se indica a qué corresponde cada parte mostrada.
* La carpeta dist contiene el código de todos los js unidos mediante gulp, tal como se mencionó antes. Es decir: No se debe modificar manualmente.

## Pruebas!

Luego de que se realicen las modificaciones deseadas, tenemos que probar que funcione como corresponda.

Acá se explica cómo probar la aplicación de distintas formas y, además, cómo generar el archivo que usará el usuario para instalar la aplicación en su celular.

### En el explorador

La mayoría de las pruebas las van a hacer viendo a través de un explorador. Para hacer esto, alcanza con poner en la consola: `ionic serve`. Y listo, con eso podemos ir a **localhost:8100** e interactuar con la aplicación. La primera vez que pongamos ese comando quizá nos pregunte qué dirección ip usar. Seleccionamos el número de la opción localhost.

Desde el explorador, usen las herramientas para desarrolladores (F12 en chrome), y pulsen el ícono de un celular (con esto pueden ver la aplicación en tamaños coherentes y acceder a otras opciones).

### En el emulador

Para hacer pruebas en un emulador, no alcanza con tener descargadas las herramientas del SDK. Tenemos que crear un emulador específico, acorde a los celulares donde se va a usar la aplicación. Para crear un emulador, hacer lo siguiente:
* Ejecutar en la consola `android avd`
* Se nos abre una ventana para crear emuladores. Seleccionamos “Create”.
* Configuramos las características que queramos, recordando que es muy conveniente tildar “Use Host GPU” para que no sea tan lento (igualmente será muy lento, pero podría ser peor).
* Una vez creado el emulador, ejecutar en la consola `ionic run android` Si no tenemos ningún celular conectado físicamente, abrirá el emulador que hayamos creado.

Puede tardar **bastante** en arrancar, y ser **muy** lento mientras se usa también (no importa si tenemos 4 núcleos a 3,4GHz y 8GB de RAM). Debido a esto, se pueden probar otros emuladores, que al parecer son más rápidos, como genymotion. Para más información, ver este [enlace](http://ionicframework.com/docs/ionic-cli-faq/#genymotion).

### En un celular real

La mejor prueba es en un celular real. Siempre que puedan prescindir de un emulador, y probar en un celular real, ¡Háganlo! Es más fluido, muestra el comportamiento real, y permite probar mejor las funcionalidades (arrastrar con el dedo, uso de cámara, conectividad por distintos medios, etc.).

Si el celular está en modo desarrollador, y al conectarlo es detectado por los programas que estamos usando, podemos probar la aplicación mediante el comando `ionic run android`

Si no, podemos generar el instalador, e instalarlo como lo haría el usuario final:
* Generar el instalador con `ionic build android`
* Ir a “CarpetaDelProyecto\platforms\android\ant-build” y copiar el archivo de extensión .apk (el que **no** diga unaligned), y pegarlo en el sistema de archivos del celular.
* Desde el celular, abrir el archivo e instalarlo.

## Interactuar con el server

Se deberá descargar y ejecutar el server en una computadora que esté en la misma red del celular donde se hagan pruebas, y configurar al celular para dirigirse a ese servidor. Más adelante, deberá poder accederse mediante internet y, posiblemente, hacer que los celulares se conecten a esa dirección fija siempre (es decir, que ya no se pueda configurar por el usuario).

Para más información, ir al sitio donde está subido el servidor en este [enlace](https://github.com/ProyectoDane/comunicador-server).

## Subir los cambios

A la hora de hacer un commit para actualizar los cambios que hicimos, hay algunas variantes:
* Si modificamos archivos pero no creamos ni borramos ningún archivo completo, podemos ejecutar simplemente `git commit -am “Texto sobre lo que hicimos”`
* Si agregamos archivos, debemos hacer dos comandos:
  * `git add .`
  * `git commit -m “Texto de lo que hicimos”`
* Si además borramos archivos, hacer:
  * `git add --all`
  * `git commit -m “Texto de lo que hicimos”`

Luego, si estuvimos trabajando en la branch “master”, directamente subimos los cambios con `git push origin master`

Hay mucha información disponible en internet para ampliar esta introducción, trabajar con branches distintas, y solucionar problemas de merge o equivocaciones que podamos cometer.

## Capacitación

Los conceptos mencionados en este readme, como se dijo antes, son sólo introductorios para tener un panorama general acerca de qué se trata este proyecto, cómo está hecho, y cómo modificarlo.

Además de los enlaces que se fueron mencionando antes, hay varios sitios para comenzar a aprender sobre git, angular, javascript y demás (por ejemplo, hay varios tutoriales interactivos en [codeschool](http://www.codeschool.com/), y algunos son gratuitos).

En internet hay material, y mucho. Se utilizaron tecnologías actuales y accesibles, por lo que no deberían surgir muchas complicaciones a la hora de buscar información.
