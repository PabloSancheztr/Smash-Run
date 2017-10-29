var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'juego', { preload: preload, create: create, update: update, render: render }); // (ancho, alto, ...
//var camera = new Phaser.camera();

function preload()
{
    game.load.image('background', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.spritesheet('yoshi', 'assets/yoshi_run.png', 34.6, 35);
}

function create() 
{
    game.world.setBounds(0, 0, 2000, 600);

    /****************************************
     ************ Background ****************
    *****************************************/
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'background');


    /****************************************
     ************ Platforms******************
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
     ************ Player ********************
    *****************************************/
    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'yoshi');
    game.add.sprite()

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8], 17, true);
    player.animations.add('right', [9, 10, 11, 12, 13, 14, 15, 16], 17, true);


    /****************************************
     ************ Camera ********************
    *****************************************/
    game.camera.follow(player);
    game.camera.deadzone = new Phaser.Rectangle(150, 400, 400, 600); // (posX inicial, posY inicial, ancho, alto)
}

function update() 
{
    //  Collide the player and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms);

    cursors = game.input.keyboard.createCursorKeys();

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown || game.input.keyboard.game.input.keyboard.isDown(Phaser.Keyboard.A))
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown || game.input.keyboard.game.input.keyboard.isDown(Phaser.Keyboard.D))
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 9;
    }

    //  Allow the player to jump if they are touching the ground.
    if ((cursors.up.isDown || game.input.keyboard.isDown(Phaser.Keyboard.W)) && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -350;
    }


    /****************************************
     ************ Camera ********************
    *****************************************/
}

function render()
{
    var zone = game.camera.deadzone;
    
    game.context.fillStyle = 'rgba(255,0,0,0.6)';
    game.context.fillRect(zone.x, zone.y, zone.width, zone.height);
}