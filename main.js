/**
 * 
 * Characters have 3 attributes: STR, AGI, WIS
 * STR: Determines attack damage
 * AGI: Decreases damage received, plus chance to dodge attack
 * WIS: Chance to deal critical hit
 * 
 */

class Character {
    constructor(name){
        this.name = name;
        this.hitpoints = 100;
        this.strength = this.generateStat(10);
        this.agility = this.generateStat(10);
        this.wisdom = this.generateStat(10);
        this.damageBase = 5;
        this.damageAttack = this.damageBase + this.strength;
        this.damageDefence = this.agility / 2;
        this.luck = this.wisdom / 40;
        this.criticalHitDamageExtra = this.damageBase + this.generateStat(this.strength);
    }
    generateStat(number){
        return Math.floor(Math.random()*number) + 1; // returns 1 to number; enter value above 1
    }
    attack(defender){
        let baseDmg = this.damageAttack - defender.damageDefence;
        let finalDmg;
    
        if (Math.random() < this.luck){ // 2.5% to 25% chance to deal critical damage
            finalDmg = baseDmg + this.criticalHitDamageExtra;
            console.log(`CRITICAL HIT!`)
        } else finalDmg = baseDmg;
    
        if (finalDmg < 1) finalDmg = 1;

        if (Math.random() < this.agility/20){ // 5% - 50% chance to dodge
            finalDmg = 0;
            console.log(`DOGED!!!`);
        } else defender.hitpoints -= finalDmg;

        console.log(`${this.name} attacked for ${finalDmg} damage. ${defender.name} has ${defender.hitpoints}HP left.`)
    }
    battle(defender){
        while (this.hitpoints > 0 && defender.hitpoints > 0){
            this.attack(defender);
            defender.attack(this);
        }
        if (this.hitpoints <= 0 && defender.hitpoints <= 0){
            console.log(`it's a tie`, this.hitpoints, defender.hitpoints) 
        } else if (this.hitpoints <= 0 && defender.hitpoints > 0){
            console.log(`${defender.name} wins! HP left: `, defender.hitpoints);
            return false;
        } 
        else if (this.hitpoints > 0 && defender.hitpoints <= 0){
            console.log(`${this.name} wins! HP left: `, this.hitpoints);
            return true;
        } 
    }
}

class Hero extends Character {
    constructor(name){
        super(name);
    }
    pray(){
        this.damageAttack += 5 // damage increase +5
        this.damageDefence += 2 // defence increase +1
        this.agility += 5 // additional 25% chance to dodge (does not increase because damageDefence value already set before)
        this.luck *= 1.5 // 50% boost to luck i.e. increase chance to critical attack
        game.prayed = true;
        console.log(`Thank God!!!!!!!!!!!!!!!!!!!!!!`, this.damageAttack, this.damageDefence, this.agility, this.luck)
    }
    attack(defender){
        if (this.hitpoints < 40 && defender.hitpoints >= 60) this.pray(); // if HP less than 20 and enemy HP >= 50

        let baseDmg = this.damageAttack - defender.damageDefence;
        let finalDmg;
    
        if (Math.random() < this.luck){ // 2.5% to 25% chance to deal critical damage
            finalDmg = baseDmg + this.criticalHitDamageExtra;
            console.log(`CRITICAL HIT!`)
        } else finalDmg = baseDmg;
    
        if (finalDmg < 1) finalDmg = 1;

        if (Math.random() < this.agility/20){ // 5% - 50% chance to dodge
            finalDmg = 0;
            console.log(`DOGED!!!`);
        } else defender.hitpoints -= finalDmg;

        console.log(`${this.name} attacked for ${finalDmg} damage. ${defender.name} has ${defender.hitpoints}HP left.`)
    }
}

function startBattle(human, comp) {

    if (human.battle(comp) === true) { // Checking condition Runs the game. if player wins, also does below.
        console.log(`10 coins added!`);
        game.score += 10;
    } 

    // reset on exit
    game.prayed = false;
    human.hitpoints = 100;
    comp.hitpoints = 100;
}

function startGame(human, comp){


    startBattle(human, comp);
}

game = {
    score: 0,
    prayed: false,
}

let player = new Hero("Player One");
let computer = new Character("Nemesis");
console.log(player);
console.log(computer);

startGame(player, computer);
startGame(player, computer);
startGame(player, computer);


console.log(`coins won:`, game.score);