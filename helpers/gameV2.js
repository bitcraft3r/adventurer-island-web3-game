// RPG Turn-based battle

class Character {
    constructor(){
        this.hp_max = 100;
        this.hp_now = 100;
        this.strength = 1;
        this.agility = 1;
        this.wisdom = 1;
        this.damage = 1;
    }
    attack(defender){
        defender.hp_now -= this.damage;
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
        this.damage = 5 + this.strength; // warrior damage based on STR
    }
}

class Archer extends Adventurer {
    constructor(name, gameClass, str, agi, wis){
        super(name);
        this.name = name;
        this.gameClass = gameClass;
        this.strength = str; 
        this.agility = agi + 1; // get bonus +1 agi for archer
        this.wisdom = wis;
        this.id = "Adventurer #5";
        this.damage = 5 + this.agility; // archer damage based on AGI
    }
}

class Wizard extends Adventurer {
    constructor(name, gameClass, str, agi, wis){
        super(name);
        this.name = name;
        this.gameClass = gameClass;
        this.strength = str;
        this.agility = agi;
        this.wisdom = wis + 1; // get bonus +1 wis for wizard
        this.id = "Adventurer #7";
        this.damage = 5 + this.wisdom; // wizard damage based on WIS
    }
}

function createHero(name, gameClass, str, agi, wis) {
    if (gameClass === "Warrior"){
        return new Warrior(name, gameClass, str, agi, wis);    
    } else if (gameClass === "Archer"){
        return new Archer(name, gameClass, str, agi, wis);    
    } else if (gameClass === "Wizard"){
        return new Wizard(name, gameClass, str, agi, wis);    
    }
    else console.log("wrong input", name, gameClass, str, agi, wis);
}

let myTurn = true;
let gameOver = false;
let myHero;

// window.addEventListener('DOMContentLoaded', init(), false);

const generateHeroButton = document.getElementById("genButton");
generateHeroButton.addEventListener("click", function() {
    console.log("Hello World");
    let inputName = document.getElementById("input-hero-name").value;
    let inputClass = document.getElementById("select-class").value;
    let inputStr = Number(document.getElementById("select-str").innerHTML);
    let inputAgi = Number(document.getElementById("select-agi").innerHTML);
    let inputWis = Number(document.getElementById("select-wis").innerHTML);

    myHero = createHero(inputName, inputClass, inputStr, inputAgi, inputWis);
    
    let heroBox = document.getElementById("show-hero");
    heroBox.innerHTML = `${myHero.name}, ${myHero.gameClass}, ${myHero.id}`

    console.log(myHero);
});

function generateHero(){
}


// Start turn-based game
function init() {
    let newSpawn = new Spawn();

    
    let thisHero = myHero;

    let currentRound = 0;

    console.log(thisHero);
    console.log(newSpawn);

    while (newSpawn.hp_now > 0 && thisHero.hp_now > 0 && gameOver === false){

        // // Start round
        // currentRound++;
        // console.log(`ROUND ${currentRound}, FIGHT!`);

        if (myTurn === true){
            // Start round
            currentRound++;
            console.log(`ROUND ${currentRound}, ATTACK!`);
            // player select action e.g. attack, use spell
            thisHero.attack(newSpawn);
            console.log(`${thisHero.name} attacked with ${thisHero.damage}. Spawn has ${newSpawn.hp_now}HP left.`);
            // action is executed
            myTurn = false;// end turn
        } else if (myTurn === false){
            // Start round
            console.log(`ROUND ${currentRound}, DEFEND!`);
            // computer's turn
            // action is selected and executed
            newSpawn.attack(thisHero);
            console.log(`Spawn attacked with ${newSpawn.damage}. ${thisHero.name} has ${thisHero.hp_now}HP left.`);
            // end turn
            myTurn = true;
        }
        
        if (newSpawn.hp_now <= 0 || thisHero.hp_now <= 0){
            gameOver === true;
            console.log(`BATTLE ENDED AFTER ${currentRound} ROUNDS! YOUR HP: ${thisHero.hp_now}. SPAWN HP: ${newSpawn.hp_now}`);
        }

    }

}

// init();
// init("Moonbeam", "Archer");
// init("Moondust", "Wizard");