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
    }
    generateStat(number){
        return Math.floor(Math.random()*number) + 1; // returns 1 to number; enter value above 1
    }
    attack(defender){
        let baseDmg = this.damageAttack - defender.damageDefence;
        let finalDmg;
    
        if (Math.random() < this.luck){ // 2.5% to 25% chance to deal critical damage
            let criticalHitDamage = this.damageBase + this.generateStat(this.strength); // randomized crit dmg every attack i.e. 5 + (1 to maxStrength)
            finalDmg = baseDmg + criticalHitDamage;
            console.log(`${this.name} CRITICAL HIT!`)
        } else finalDmg = baseDmg;
    
        if (finalDmg < 1) finalDmg = 1;

        if (Math.random() < defender.agility/20){ // 5% - 50% chance to dodge
            finalDmg = 0;
            console.log(`${defender.name} DOGED!!!`);
        } else defender.hitpoints -= finalDmg;

        console.log(`${this.name} attacked for ${finalDmg} damage. ${defender.name} has ${defender.hitpoints}HP left.`)
    }
    battle(defender){
        while (this.hitpoints > 0 && defender.hitpoints > 0){
            this.attack(defender);
            defender.attack(this);
        }
        if (this.hitpoints <= 0 && defender.hitpoints <= 0){
            console.log(`RESULT: It's a tie`, this.hitpoints, defender.hitpoints) 
            console.log(`5 coins added!`);
            game.score += 5;
        } else if (this.hitpoints <= 0 && defender.hitpoints > 0){
            console.log(`RESULT: ${defender.name} wins! HP left: `, defender.hitpoints);
            return false;
        } 
        else if (this.hitpoints > 0 && defender.hitpoints <= 0){
            console.log(`RESULT: ${this.name} wins! HP left: `, this.hitpoints);
            console.log(`10 coins added!`);
            game.score += 10;
            return true;
        } 
    }
}

class Hero extends Character {
    constructor(name){
        super(name);
        this.prayed = false;
    }
    pray(){ 
        if (this.prayed === false) {
            this.hitpoints += 10
            this.damageAttack += 5
            this.damageDefence += 2
            this.agility += 4 // additional 20% chance to dodge
            this.luck *= 1.5 // 50% boost to luck i.e. increase chance to critical attack
            this.prayed = true;
            console.log(`Thank God!!!!!!!!!!!!!!!!!!!!!!`, this.damageAttack, this.damageDefence, this.agility, this.luck)
        }
    }
    attack(defender){
        if (this.hitpoints < 25) this.pray(); // if HP less than 25
        super.attack(defender);
    }
}

function startBattle(name) {
    let human = new Hero(name);
    let comp = new Character("Nemesis");
    game.currentRound++;
    console.log(`BATTLE #${game.currentRound} START`)

    // start battle
    human.battle(comp);

    console.log(human);
    console.log(comp);
    console.log(game.currentRound, game.score);
}

function startGame(){
    // startBattle("Brian");
    while (game.currentRound < 10) startBattle("Brian");
    console.log(`coins won:`, game.score);
}

game = {
    score: 0,
    currentRound: 0,
}

startGame();