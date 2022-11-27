// RPG Turn-based battle

class Character {
    constructor(){
        this.hitpoints = 100;
        this.strength = 1;
        this.agility = 1;
        this.wisdom = 1;
        this.damage = 1;
    }
    attack(defender){
        defender.hitpoints -= this.damage;
    }
}

class Spawn extends Character {
    constructor(){
        super();
        this.strength = this.generateStat(10);
        this.agility = this.generateStat(10);
        this.wisdom = this.generateStat(10);
        this.damage = 5 + this.strength;
        this.drops = [];
        this.gold = 1;
    }
    generateStat(number){
        return Math.floor(Math.random()*number) + 1; // returns 1 to number; enter value above 1
    }
    transmogrify(){
        // if hero has unfair advantage, give spawn bonus stats
    }
}

class Adventurer extends Character {
    constructor(){
        super();
        this.damage = 5;
        this.bag = [];
        this.gold = 0;
        this.skills = {};
    }
    special(){

    }
    active(){

    }
    passive(){

    }
}

class Warrior extends Adventurer {
    constructor(name, gameClass, str, agi, wis){
        super(name);
        this.name = name; // use DOM input by user
        this.gameClass = gameClass; // use DOM input by user
        this.strength = str + 1; // use DOM input retrieved from NFT metadata // get bonus +1 str for warrior
        this.agility = agi; // use DOM input retrieved from NFT metadata
        this.wisdom = wis; // use DOM input retrieved from NFT metadata
        this.id = "Adventurer #2"; // use DOM input retrieved from NFT metadata
        this.damage = 5 + this.strength;
    }
}
class Archer extends Adventurer {}
class Wizard extends Adventurer {}

function createHero(name, gameClass, str, agi, wis) {
    return new Warrior(name, gameClass, str, agi, wis);
}

function startBattle(name, gameClass) {
    let newSpawn = new Spawn();
    let yourHero = createHero(name, gameClass, 7, 6, 6);
    let currentRound = 0;

    console.log(yourHero);
    console.log(newSpawn);

    while (newSpawn.hitpoints > 0 && yourHero.hitpoints > 0){
        
        // Start round
        currentRound++;
        console.log(`ROUND ${currentRound}, FIGHT!`);

        // You attack spawn first
        yourHero.attack(newSpawn);
        console.log(`${yourHero.name} attacked with ${yourHero.damage}. Spawn has ${newSpawn.hitpoints}HP left.`);
        
        // Spawn attacks you
        newSpawn.attack(yourHero);
        console.log(`Spawn attacked with ${newSpawn.damage}. ${yourHero.name} has ${yourHero.hitpoints}HP left.`);

    }

    console.log(`BATTLE ENDED AFTER ${currentRound} ROUNDS! YOUR HP: ${yourHero.hitpoints}. SPAWN HP: ${newSpawn.hitpoints}`);
}

startBattle("Moonfury", "Warrior");