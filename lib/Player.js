const Potion = require('./Potion');
const Character = require('./Character');


class Player extends Character{
    constructor(name = '') {
        super(name);

        this.inventory = [new Potion('health'), new Potion()];
    }

    // inherit prototype methods frim character here: 
    // Player.prototype = Object.create(Character.prototype);
    // returns an object with various player properties

    getStats = function() {
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility
        };
    };

    // returns the inventory array or false if empty
    getInventory = function() {
        if (this.inventory.length){
            return this.inventory;
        } 
        return false;
    };

// these will br replaced by the character class

    // Player.prototype.getHealth = function() {
    //     return`${this.name}'s health is now ${this.health}!`;
    // };

    // Player.prototype.isAlive = function() {
    //     if (this.health === 0) {
    //         return false;
    //     }
    //     return true;
        
    // };

    // Player.prototype.reduceHealth = function(health) {
    //     this.health -= health;

    //     if (this.health < 0) {
    //         this.health = 0;
    //     }
    // };

    // Player.prototype.getAttackValue = function() {
    //     const min = this.strength - 5;
    //     const max = this.strength + 5;

    //     return Math.floor(Math.random() * (max - min) + min);
    // };

  addPotion = function (potion) {
        this.inventory.push(potion);
    };

    usePotion = function(index) {
        const potion = this.getInventory().splice(index, 1)[0];

        switch (potion.name) {
            case 'agility': 
                this.agility += potion.value;
                break;
    
            case 'health': 
                this.health += potion.value;
                break;
            case 'strength': 
                this.strength += potion.value;
                break;
        }
    }
}


module.exports = Player;