var game = new Phaser.Game(800, 400, Phaser.CANVAS, 'canvas', { preload: preload, create: create, update: update}); // (ancho, alto, ...

function preload()
{
    game.load.tilemap('map', 'assets/map/map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('mapTiles', 'assets/map/mapTiles.png');

    game.load.image('ground', 'assets/Sprites/platform.png');
    game.load.spritesheet('yoshi', 'assets/Sprites/yoshi_run.png', 31, 30);
    game.load.spritesheet('yoshi2', 'assets/Sprites/yoshi_run2.png', 31, 30);
}

function create() 
{
    game.world.setBounds(0, 0, 5000, 300);

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
    player1 = game.add.sprite(35, 220, 'yoshi');
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


    /****************************************
     ************ Camera ********************
    *****************************************/
    game.camera.follow(player1);
}

function update() 
{
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
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.D))
    {
        //  Move to the right
        player1.body.velocity.x = 150;

        player1.animations.play('right');
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
    }


    /****************************************
    ********* Player2 controls **************
    *****************************************/
    var hitPlatform2 = game.physics.arcade.collide(player2, groundLayer);

    //Reset the velocity of Player2
    player2.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player2.body.velocity.x = -150;

        player2.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player2.body.velocity.x = 150;

        player2.animations.play('right');
    }
    else
    {
        //  Stand still
        player2.animations.stop();

        player2.frame = 9;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && hitPlatform2)
    {
        player2.body.velocity.y = -200;
    }

    // La camara deja de seguir al jugador al final del mapa, porque si no aparece un bug de pared invisible
    if(player1.body.position.x > 2000)
    {
        game.camera.follow(null);
    }


    /****************************************
    ******** Muertes por caida **************
    *****************************************/
    if(player1.body.position.y < 0 || player1.body.position.y == 370)
    {
        restartP1();
    }
    if(player2.body.position.y < 0 || player2.body.position.y == 370)
    {
        restartP2();
    }

    /****************************************
    ************** Ganador ******************
    *****************************************/
    if((player1.body.position.x >= 2340 && player1.body.x <= 2360) && (player1.body.position.y >= 33 && player1.body.position.y <= 34))
    {
        window.alert("Jugador 1 gana!!");
        game.paused = true;

        setTimeout(restartP1(), 3000);
        setTimeout(restartP2(), 3000);
    }
    if((player2.body.position.x >= 2340 && player2.body.x <= 2360) && (player2.body.position.y >= 33 && player2.body.position.y <= 34))
    {
        window.alert("Jugador 2 gana!!");
        game.paused = true;

        setTimeout(restartP1(), 3000);
        setTimeout(restartP2(), 3000);
    }
}

//Reseteamos las posiciones del jugador1 para empezar otra partida
function restartP1()
{
    player1.body.position.x = 35;
    player1.body.position.y = 220;
    game.paused = false;

    game.camera.follow(player1);
}

function restartP2()
{
    player2.body.position.x = 20;
    player2.body.position.y = 220;
    game.paused = false;
}