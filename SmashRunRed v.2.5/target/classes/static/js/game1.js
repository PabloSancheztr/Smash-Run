var game = new Phaser.Game(1000, 400, Phaser.CANVAS, 'canvas', { preload: preload, create: create, update: update, forceSetTimeOut: true}); // (ancho, alto, ...
var stars;
var score1 = 0;
var score2 = 0;
var websocket = false;
var pos_x = 20;
var pos_y = 220;
var connection = new WebSocket('ws://192.168.0.42:8080/pos');

function preload()
{
    game.load.tilemap('map', 'assets/map/map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('mapTiles', 'assets/map/mapTiles.png');
    game.load.image('ground', 'assets/Sprites/platform.png');
	game.load.image('star', 'assets/Sprites/star.png');
    game.load.spritesheet('yoshi', 'assets/Sprites/yoshi_run.png', 31, 30);
    game.load.spritesheet('yoshi2', 'assets/Sprites/yoshi_run2.png', 31, 30);
    
    game.time.timeToCall = 1000/2;
}

function create() 
{
    game.world.setBounds(0, 0, 30000, 300);

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
   
    /****************************************
     **************** Map *******************
    *****************************************/
    map = game.add.tilemap('map');
    tiles = game.add.sprite('mapTiles');

    map.addTilesetImage('sin_nombre.tsx', 'mapTiles', 16, 16, 0, 1, 1);

    /**** Colisiones ****/
    map.setCollisionBetween(1, 15);
    map.setCollisionBetween(17, 2576);

    groundLayer = map.createLayer(0); //createLayer

   
    /****************************************
     ************ Players *******************
    *****************************************/
    // The player and its settings
    player1 = game.add.sprite(20, 220, 'yoshi');
    player2 = game.add.sprite(20, 220, 'yoshi2');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player1);
    game.physics.arcade.enable(player2);

    //  Player physics properties. Give the little guy a slight bounce.
    player1.body.gravity.y = 400;
    player1.body.collideWorldBounds = true;

    player2.body.gravity.y = 400;
    player2.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player1.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8], 18, true);
    player1.animations.add('right', [10, 11, 12, 13, 14, 15, 16, 17, 18], 18, true);

    player2.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8], 18, true);
    player2.animations.add('right', [10, 11, 12, 13, 14, 15, 16, 17, 18], 18, true);

   
    //  Finally some stars to collect
    createStars();
    
    // Crear webSockets
	connection.onopen = function () {
		console.log("Conexion abierta");
		//player2.body.position.x = msg.data;
	}
	connection.onerror = function(e) {
		console.log("WS error: " + e);
	}
	
	var numMsg = true;
	connection.onmessage = function(msg) {
		var dato = parseFloat(msg.data)
		
		if(numMsg){
			//console.log("WS message: x = " + dato);
			pos_x = dato;
			numMsg = false;
		}else{
			//console.log("WS message: y = " + dato);
			pos_y = dato;
			numMsg = true;
		}
	}
}


function update() 
{	
    /****************************************
     ************ Estrellas******************
    *****************************************/
    game.physics.arcade.collide(stars, groundLayer);
    game.physics.arcade.overlap(player1, stars, collectStarPl1, null, this);
    game.physics.arcade.overlap(player2, stars, collectStarPl2, null, this);

    function collectStarPl1 (player1, star) {
        
        // Removes the star from the screen
        star.kill();
    
        //  Add and update the score1
        score1 += 10;
    }
    function collectStarPl2 (player2, star) {
        
        // Removes the star from the screen
        star.kill();
    
        //  Add and update the score1
        score2 += 10;
    }


    /****************************************
     ************ Camera ********************
    *****************************************/
    game.camera.follow(player1);
    // La camara deja de seguir al jugador al final del mapa, porque si no aparece un bug de pared invisible
    if(player1.body.position.x > 15500)
    {
        game.camera.follow(null);
    }


    cursors = game.input.keyboard.createCursorKeys();
    /****************************************
    ********* Player1 controls **************
    *****************************************/
    //  Collide the player and the stars with the platforms
    var hitPlatform1 = game.physics.arcade.collide(player1, groundLayer);

    //  Reset the players velocity (movement)
    player1.body.velocity.x = 0;

    if (game.input.keyboard.isDown(Phaser.Keyboard.A))
    {
        //  Move to the left
        player1.body.velocity.x = -150;

        player1.animations.play('left');
        
    	websocket = true;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.D))
    {
        //  Move to the right
        player1.body.velocity.x = 150;

        player1.animations.play('right');
        
    	websocket = true;
    }
    else
    {
        //  Stand still
        player1.animations.stop();

        player1.frame = 9;
    }

    //  Allow the player to jump if they are touching the ground.
    if (game.input.keyboard.isDown(Phaser.Keyboard.W) && hitPlatform1)
    {
        player1.body.velocity.y = -200;
        
    	websocket = true;
    }


    /****************************************
    ********* Player2 controls **************
    *****************************************/
    var hitPlatform2 = game.physics.arcade.collide(player2, groundLayer);
    player2.body.position.x;
    
    //Reset the velocity of Player2
    player2.body.velocity.x = 0;

    /****************************************
    ******** Muertes por caida **************
    *****************************************/
    // Checkpoint 0
    if(player1.body.position.x < 6500 && (player1.body.position.y < 0 || player1.body.position.y == 370))
    {
        restartP1();
    }
    if(player2.body.position.x < 6500 && (player2.body.position.y < 0 || player2.body.position.y == 370))
    {
        restartP2();
    }

    // Checkpoint 1
    if((player1.body.position.x >= 6500 && player1.body.position.x < 11330) && (player1.body.position.y < 0 || player1.body.position.y == 370))
    {
        restartP1Chekpoint1();
    }
    if((player2.body.position.x >= 6500 && player2.body.position.x < 11330) && (player2.body.position.y < 0 || player2.body.position.y == 370))
    {
        restartP2Checkpoint1();
    }

    // Checkpoint 2
    if(player1.body.position.x >= 11330 && (player1.body.position.y < 0 || player1.body.position.y == 370))
    {
        restartP1Chekpoint2();
    }
    if(player2.body.position.x >= 11330 && (player2.body.position.y < 0 || player2.body.position.y == 370))
    {
        restartP2Checkpoint2();
    }


    /****************************************
    ************** Ganador ******************
    *****************************************/
    if((player1.body.position.x >= 15930 && player1.body.x <= 15935) && (player1.body.position.y >= 161 && player1.body.position.y <= 162))
    {
		score1 += 50;
		quien_gana();
        game.paused = true;

        setTimeout(restartP1(), 3000);
        setTimeout(restartP2(), 3000);
        setTimeout(createStars(), 3000);
    }
    if((player2.body.position.x >= 15930 && player2.body.x <= 15935) && (player2.body.position.y >= 161 && player2.body.position.y <= 162))
    {
		score2 += 50;
		quien_gana();
        game.paused = true;

        setTimeout(restartP1(), 3000);
        setTimeout(restartP2(), 3000);
        setTimeout(createStars(), 3000);
    }
    
    /****************************************
     ************ Websockets ****************
     ****************************************/
	connection.send(player1.body.position.x);
	connection.send(player1.body.position.y);
    
	player2.body.position.x = pos_x;
	player2.body.position.y = pos_y;
}

//Reseteamos las posiciones del jugador1 para empezar otra partida
function restartP1()
{
    player1.body.position.x = 20;
    player1.body.position.y = 220;
    game.paused = false;
}

function restartP2()
{
    player2.body.position.x = 20;
    player2.body.position.y = 220;
    game.paused = false;
}

function restartP1Chekpoint1() {
    player1.body.position.x = 6500;
    player1.body.position.y = 226;
}

function restartP2Checkpoint1() {
    player2.body.position.x = 6500;
    player2.body.position.y = 226;
}

function restartP1Chekpoint2() {
    player1.body.position.x = 11330;
    player1.body.position.y = 162;
}

function restartP2Checkpoint2() {
    player2.body.position.x = 11330;
    player2.body.position.y = 162;
}



function quien_gana(){
	var nombre1 = " ";
	var nombre2 = " ";
	
	if(score1 > score2)
	{
		nombre1 = prompt("Green has ganado con " + score1 + " puntos! \n Introduce tu nombre: ");
		
		postPuntos(nombre1, score1);
	}
	else if(score2 > score1)
	{
		nombre2 = alert("Blue ha ganado con " + score2 + " puntos!");
	}
	else
	{
		nombre1 = prompt("¡Oh, ha habido un empate! \n Green tu puntuacion ha sido de " + score1 + " puntos \n Introduce tu nombre: ");
	}
}

function createStars() 
{
    stars = game.add.group();
    
     //  We will enable physics for any star that is created in this group
    stars.enableBody = true;

    for (var i = 1; i < 250; i++)
    {
        var star = stars.create(i * 200, 0, 'star');

        star.body.gravity.y = 100;

        star.body.bounce.y = i *0.004;
    }
}





