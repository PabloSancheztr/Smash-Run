# Smash Run
Práctica: Juegos en Red<br>
Vídeo de la práctica: https://www.youtube.com/watch?v=rhTYsJCCyiI&feature=youtu.be

  #### 1. Autores
  #### 2. Descripción del juego
  #### 3. Reglas del juego
  #### 4. Referencias
  #### 5. Capturas y diagramas
  #### 6. Instrucciones para ejecutar
  #### 7. Protocolo websockets
  #### 8. Agradecimientos

## 1. Autores
**Nombre y apellidos:** Pablo Manuel Sánchez Trujillo<br>
**Correo corporativo:** pm.sancheztr@alumnos.urjc.es<br>
**Cuenta GitHub:** PabloSancheztr<br>

**Nombre y apellidos:** Álvaro Sal Fernández <br>
**Correo corporativo:** a.salf@alumnos.urjc.es<br>
**Cuanta GitHub:** Asalfer<br>

**Nombre y apellidos:** Álvaro Navas Castillo<br>
**Correo corporativo:** a.navasca@alumnos.urjc.es<br>
**Cuenta de GitHub:** 13alvaro13<br>

## 2. Descripción del juego

El juego se basa en carreras competitivas en tiempo real entre 2 jugadores.<br>
Se crearán estrellas que otorgarán puntos al marcador de cada jugador.<br>
Llegar primero a la meta otorga puntos adicionales.<br>
El jugador con más puntuación al final de la partida gana.<br>


## 3. Reglas del juego

- Podrá moverse con el teclado (derecha/arriba/izquierda)


## 4. Referencias
- Mario Run  https://www.youtube.com/watch?v=wSL56aLy8BI
- Juego del Pangolín https://www.google.com/doodles/valentines-day-2017-day-1?hl=es

## 5. Capturas y diagramas
![picture](https://github.com/PabloSancheztr/Smash-Run/blob/master/captura4.png)<br>
El juego comienza con un menú principal desde donde se podrá acceder al juego en sí o a la tabla de puntuaciones<br><br><br>

![picture](https://github.com/PabloSancheztr/Smash-Run/blob/master/captura5.png)<br>
La tabla de puntuaciones muestra en orden descendente las mejores puntuaciones conseguidas y el nombre de los jugadores que las han
conseguido. Desde esta pantalla se puede volver al menú principal

![picture](https://github.com/PabloSancheztr/Smash-Run/blob/master/captura1.png) <br>
Al pulsar 'jugar' los dos jugadores comenzarán en la tuberia de salida (cuando este implementado en red saldrán en la misma posicion, por el momento uno sale por delante de otro por temas de visualización de los dos personajes) <br><br><br>

![picture](https://github.com/PabloSancheztr/Smash-Run/blob/master/captura2.png)<br>
Los jugadores iran por el mapa haciendo una carrera por llegar antes a la meta, durante este trayecto se encontrarán estrellas, que
podrán ser recolectadas por los jugadores, las cuales les otorgarán una puntuación que les ayudará a ganar la carrera <br><br><br>

![picture](https://github.com/PabloSancheztr/Smash-Run/blob/master/captura3.png)<br>
Cuando el primer jugador llegue a la meta se acabará la carrera y se hará un recuento de los puntos obtenidos a lo largo de la carrera (llegar primero a la meta también otorga puntos a ese jugador). El jugador con más puntos ganará la carrera<br><br><br>

**Diagrama de secuencias**<br>
![picture](https://github.com/PabloSancheztr/Smash-Run/blob/master/Sin%20t%C3%ADtulo.png)<br>
En este diagrama de secuencias se puede observar como funcionan los distintos elementeos de la web y cómo interaccionan entre ellos.

**Diagrama de clases**<br>
![picture](https://github.com/PabloSancheztr/Smash-Run/blob/master/diagrama%20de%20clases%20websocket.png)<br>
En este diagrama de clases se puede observar como funcionan los distintos elementeos del servidor y cómo interaccionan entre ellos.


## 6. Instrucciones para ejecutar
a- Abre el archivo desde el entorno Eclipse, o cualquier entorno vitaminado con Spring.<br>
b- Ejecuta el servidor.<br>
c- Abre tu navegador e introduce la url -> 127.0.0.1:8080/menu.html <br>
d- Disfrutar jugando.<br>

## 7. Protocolo websockets
Para los websockets hemos utilizado el protocolo ws. El cual utiliza una comunicación asíncrona entre cliente y servidor. Está diseñada para ser implementada en navegadores y servidores web, pero puede utilizarse por cualquier aplicación cliente/servidor. La API de WebSocket está siendo normalizada por el W3C, mientras que el protocolo WebSocket ya fue normalizado por la IETF.<br>
Para establecer una conexión WebSocket, el cliente manda una petición de negociación WebSocket, y el servidor manda una respuesta de negociación WebSocket.<br>
El cliente envía la posición del jugador que controlas( 'x' e 'y' ) al servidor y este al resto de los clientes. Con un booleano seleccionamos si es 'x' o 'y' para que se interpreten los datos recibidos de forma correcta.<br>


## 8. Agradecimientos
- Conceptos básicos y primeras ideas:<br>
    Phaser
    
- Sprites personaje:<br>
    A.J Nitro_______________TheGuy07__________Alvin-Earthworm<br>
    Ragey___________________Chrispriter1______JumpmanMFGG<br>
    Tufftony________________LuigiRulz_________Yoshi101333<br>
    Alpha-the-Hedgehog______BrawlFan1_________DarkMarc9<br>
    (xXbooKingXx)___________SMBZ1_____________FaisalAden<br>
    ZatchHunter_____________ShadeFalcon_______Shadow6224<br>
    Legend-Tony980__________KingAsylus91______Mario-Galaxy<br>
    Yoshiller_______________ssjsupermario<br>
    
 - Tiles mapa<br>
    BMSantos
