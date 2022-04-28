const inquirer = require('inquirer');
const Enemy = require('./Enemy.js');
const Player = require('./Player');


function Game(){
    //properties
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;

    // methods
    Game.prototype.initalizeGame = function() {
        //initialize enemies property
        this.enemies.push(new Enemy('goblin', 'sword'));
        this.enemies.push(new Enemy('orc', 'baseball bat'));
        this.enemies.push(new Enemy('skeleton', 'axe'));

        //keep track of current enemy
        this.currentEnemy = this.enemies[0];

        // initialize the inquirer prompt.
        inquirer
            .prompt({
                type: 'text',
                name: 'name',
                message: 'What is your name?'
            })
            // destructure name from the prompt object
            .then(({name}) => {
                this.player = new Player(name);

                
                this.startNewBattle(this.currentEnemy, this.player);
            });

    };

    Game.prototype.battle = function() {

    };

    Game.prototype.checkEndOfBattle = function() {

    };

    Game.prototype.startNewBattle = function() {

    };
}

module.exports = Game;