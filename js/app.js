// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // row count from 1
    this.row = Math.floor(Math.random() * 3) + 2;
    this.x = -101; // x location
    this.speed = Math.floor(Math.random() * 150) + 200;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    if (this.x > 505) {
        // reset position when bug runs out of canvas
        this.x = -101;
        this.row = Math.floor(Math.random() * 3) + 2;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, (this.row - 1) * 83 - 30);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // sprite image
    this.sprite = "images/char-boy.png";
    this.col = 3;
    this.row = 6; // row count from 1
};

Player.prototype.update = function(key) {
    switch (key) {
        case 'left':
            if (this.col > 1) {this.col -= 1;}
            break;
        case 'up':
            if (this.row > 1) {this.row -= 1;}
            break;
        case 'right':
            if (this.col < 5) {this.col += 1;}
            break;
        case 'down':
            if (this.row < 6) {this.row += 1;}
            break;
    }
    if (this.row == 1) {
        // success, reset position
        this.col = 3;
        this.row = 6;
        // count score here
    }
};

Player.prototype.render = function() {
    var x = (this.col - 1) * 101,
        y = (this.row - 1) * 83 - 30;
    ctx.drawImage(Resources.get(this.sprite), x, y);
};

Player.prototype.handleInput = function(key) {
    this.update(key);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

player = new Player();

// set number of enemies and create them in array
numEnemy = 3;
allEnemies = [];
for (var i = 0; i < numEnemy; i++) {
    allEnemies.push(new Enemy());
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
