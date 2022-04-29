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

                
                this.startNewBattle();
            });

    };

    Game.prototype.battle = function() {

        // if player turn is true.
        if (this.isPlayerTurn){
            // prompt user to attack or use a potion
            inquirer.prompt({
                type: 'list',
                message: 'what would you like to do? ',
                name: 'action',
                choices: ['Attack', 'Use potion']
            })
            .then(({action}) => {
                //IF -using potion  apply selected potion effect to user.
                if (action === 'Use potion'){
                    // if potion inventory is empty return will end player turn.
                    // if potion not empty it will proceed to the prompt
                    if (!this.player.getInventory()) {
                        console.log("you don't have any potions!");
                        return this.checkEndOfBattle();
                    }
                    inquirer
                    .prompt({
                        type: 'list',
                        message: 'Which potion would you like to use?',
                        name: 'action',
                        choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                    })
                    .then(({action}) => {
                        const potionDetails = action.split(': ');


                        this.player.usePotion(potionDetails[0] - 1);
                        console.log(`You used a ${potionDetails[1]} potion.`);

                        this.checkEndOfBattle();
                    })
                // if not using potion....attack enemy 
                } else {
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);

                    console.log(`You attacked the ${this.currentEnemy.name}`);
                    console.log(this.currentEnemy.getHealth());

                    this.checkEndOfBattle();
                }
            })
        // else player turn not true enemy attack player.
        } else {

            const damage = this.currentEnemy.getAttackValue();

            this.player.reduceHealth(damage);

            console.log(`You were attacked the ${this.currentEnemy.name}`);
            console.log(this.player.getHealth())
        }

    };

    Game.prototype.checkEndOfBattle = function() {
        // checks for end of turn for each battle.
        // verify if both characters are alive to continue fighting and run battle again.
        if (this.player.isAlive() && this.currentEnemy.isAlive()) {
            this.isPlayerTurn = !this.isPlayerTurn;
            this.battle();

            // if player is still alive and enemy is not. player wins a potion and roundnumber increases.
        } else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
            console.log(`You've defeated the ${this.currentEnemy.name}`);

            // adds a potion to the player.
            this.player.addPotion(this.currentEnemy.potion);
            console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion`);

            // adds a exptra round.
            this.roundNumber++;

            // if the round number is less than the enemy length.  else if its the last enemy,  player wins
            if (this.roundNumber < this.enemies.length) {
                this.currentEnemy = this.enemies[this.roundNumber];
                this.startNewBattle();
            } else {
                console.log('You win!');
            }
        } else {
            console.log("You've been defeated!");
        }

    };

    Game.prototype.startNewBattle = function() {
        // establish who will take first turn based on galility value
        if (this.player.agility > this.currentEnemy.agility) {
            this.isPlayerTurn = true;
        } else {
            this.isPlayerTurn = false;
        }

        // display the Player objects status
        console.log('Your stats are as follows:');
        console.table(this.player.getStats());
        
        // display the description of the current Enemy.

        console.log(this.currentEnemy.getDescription());

        this.battle();
    };
}

module.exports = Game;