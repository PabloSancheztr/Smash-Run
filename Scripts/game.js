var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameCanvas', { preload: preload, create: create, update: update, render: render }); // (ancho, alto, ...
//var camera = new Phaser.camera();

function preload()
{
    /*game.load.tilemap('map', 'assets/map/map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('ground_1x1', 'assets/tilemaps/tiles/ground_1x1.png');
    game.load.image('walls_1x2', 'assets/tilemaps/tiles/walls_1x2.png');
    game.load.image('tiles2', 'assets/tilemaps/tiles/tiles2.png');*/

    game.load.image('background', 'assets/Sprites/sky.png');
    game.load.image('ground', 'assets/Sprites/platform.png');
    game.load.spritesheet('yoshi', 'assets/Sprites/yoshi_run.png', 31, 35);
    game.load.spritesheet('yoshi2', 'assets/Sprites/yoshi_run2.png', 31, 35);
}

function create() 
{
    game.world.setBounds(0, 0, 2000, 600);

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    /****************************************
     ************ Background ****************
    *****************************************/
    //  A simple background for our game
    game.add.sprite(0, 0, 'background');

    /*
    map = game.add.tilemap('map');
    map.addTilesetImage('ground_1x1');
    map.addTilesetImage('walls_1x2');
    map.addTilesetImage('tiles2');

    layer = map.createLayer('Tile Layer 1');
    
    layer.resizeWorld();

    //  Set the tiles for collision.
    //  Do this BEFORE generating the Box2D bodies below.
    map.setCollisionBetween(1, 12);
    */

    /****************************************
     ************ Platforms *****************
    *****************************************/
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;


    /****************************************
     ************ Ground ********************
    *****************************************/
    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;


    /****************************************
     ************ Players *******************
    *****************************************/
    // The player and its settings
    player1 = game.add.sprite(35, game.world.height - 150, 'yoshi');

    player2 = game.add.sprite(20, game.world.height - 150, 'yoshi2');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player1);
    game.physics.arcade.enable(player2);

    //  Player physics properties. Give the little guy a slight bounce.
    player1.body.gravity.y = 300;
    player1.body.collideWorldBounds = true;

    player2.body.gravity.y = 300;
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
    game.camera.deadzone = new Phaser.Rectangle(150, 400, 400, 600); // (posX inicial, posY inicial, ancho, alto)
}

function update() 
{
    cursors = game.input.keyboard.createCursorKeys();

    /****************************************
    ********* Player1 controls **************
    *****************************************/
    //  Collide the player and the stars with the platforms
    var hitPlatform1 = game.physics.arcade.collide(player1, platforms);

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
    if (game.input.keyboard.isDown(Phaser.Keyboard.W) && player1.body.touching.down && hitPlatform1)
    {
        player1.body.velocity.y = -350;
    }


    /****************************************
    ********* Player2 controls **************
    *****************************************/
    var hitPlatform2 = game.physics.arcade.collide(player2, platforms);

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
    if (cursors.up.isDown && player2.body.touching.down && hitPlatform2)
    {
        player2.body.velocity.y = -350;
    }
}

function render()
{
    var zone = game.camera.deadzone;
    
    game.context.fillStyle = 'rgba(255,0,0,0.6)';
    game.context.fillRect(zone.x, zone.y, zone.width, zone.height);
}

