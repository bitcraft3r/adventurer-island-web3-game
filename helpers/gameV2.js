// RPG Turn-based battle

class Character {
    constructor(){
        this.hp_max = 100;
        this.hp_now = 100;
        this.strength = 1; // TODO: Group STR/AGI/WIS into ATTRIBUTE Object
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

// /** TODO: FIX - CAN'T REGISTER CLICKING ON THE NEWLY LOADED NFTS */

// const selectNFT = document.querySelectorAll(".user-nft");
// selectNFT.addEventListener("click", function(){
//     console.log("clicked you!!");
//     document.getElementById("selected-adv").innerHTML = `
//     <h4>Selected Adventurer:</h4>
//     <div>
//         <p>ID: Adventurer #???</p>
//         <p>STR: <span id="select-str">11</span></p>
//         <p>AGI: <span id="select-agi">11</span></p>
//         <p>WIS: <span id="select-wis">11</span></p>
//     </div>
//     `;
// })

class Game {
    constructor(){
        this.battleId = 0;
        this.hero = {};
        this.spawn = {};
        this.roundsFought = 0;
        this.attacks = [];
        this.winner = [];
        this.playerTurn = true;
        this.gameOver = false;
    }
}

let games = [];
let gameConfig = {
    currentBattleId: 0,
}

function startGame() {
    gameConfig.currentBattleId++;
    // TODO: Extend Game data and gameConfig

    let currentGame = new Game();
    currentGame.battleId = gameConfig.currentBattleId;
    currentGame.hero = myHero;
    currentGame.spawn = new Spawn();

    console.log(currentGame);

    games.push(currentGame);
}

// let myTurn = true;
// let gameOver = false;
let myHero;
let spawns = [];

const gameFeed = document.getElementById("game-result");

const generateHeroButton = document.getElementById("genButton");
generateHeroButton.addEventListener("click", function() {
    console.log("Generating Hero...");
    let inputName = document.getElementById("input-hero-name").value;
    let inputClass = document.getElementById("select-class").value;
    let inputStr = Number(document.getElementById("select-str").innerHTML);
    let inputAgi = Number(document.getElementById("select-agi").innerHTML);
    let inputWis = Number(document.getElementById("select-wis").innerHTML);

    myHero = createHero(inputName, inputClass, inputStr, inputAgi, inputWis);
    
    let heroBox = document.getElementById("show-hero");
    heroBox.innerHTML = `${myHero.name}, ${myHero.gameClass}, ${myHero.id}, STATS: ${myHero.strength}, ${myHero.agility}, ${myHero.wisdom}, ${myHero.damage}`

    console.log(myHero);

    // add to game log
    let para = document.createElement("p");
    let node = document.createTextNode(`Hero ${myHero.name} (${myHero.gameClass}) generated.`);
    para.appendChild(node);
    gameFeed.appendChild(para);
});

const generateSpawnButton = document.getElementById("genSpawnButton");
generateSpawnButton.addEventListener("click", function(){
    console.log("Logging Last Spawn...");

    let spawnBox = document.getElementById("show-spawn");
    spawnBox.innerHTML = `${games[games.length-1].spawn.strength}, ${games[games.length-1].spawn.agility}, ${games[games.length-1].spawn.wisdom}, ${games[games.length-1].spawn.damage}`

    console.log(games[games.length-1].spawn);
})

const startGameButton = document.getElementById("start-game-button");
startGameButton.addEventListener("click", function(){
    console.log(`Starting...`)
    startGame();

    // add to game log
    let para = document.createElement("p");
    let node = document.createTextNode(`Game #${games.length} initiated.`);
    para.appendChild(node);
    gameFeed.appendChild(para);
})

const attackButton = document.getElementById("attack-button");
attackButton.addEventListener("click", function(){

    if (games[games.length-1].playerTurn === true) {
        myHero.attack(games[games.length-1].spawn);
        document.getElementById("last-attack").innerHTML = `You attacked for ${myHero.damage} DMG!`;
        document.getElementById("last-defend").innerHTML = `Spawn has ${games[games.length-1].spawn.hp_now}HP left.`;

        // end turn
        games[games.length-1].playerTurn = false;
    
        // add to game log
        let para = document.createElement("p");
        let node = document.createTextNode(`You attacked for ${myHero.damage} DMG! Spawn has ${games[games.length-1].spawn.hp_now}HP left.`);
        para.appendChild(node);
        gameFeed.appendChild(para);
    } else console.log(`not your turn`);

})

const defendButton = document.getElementById("defend-button");
defendButton.addEventListener("click", function(){

    if (games[games.length-1].playerTurn === false) {
        
        games[games.length-1].spawn.attack(myHero);
        document.getElementById("last-attack").innerHTML = `You have ${myHero.hp_now}HP left.`;
        document.getElementById("last-defend").innerHTML = `Spawn attacked for ${games[games.length-1].spawn.damage} DMG!`;
    
        // end turn
        games[games.length-1].playerTurn = true;

        // add to game log
        let para = document.createElement("p");
        let node = document.createTextNode(`Spawn attacked for ${games[games.length-1].spawn.damage} DMG! You have ${myHero.hp_now}HP left.`);
        para.appendChild(node);
        gameFeed.appendChild(para);

    } else console.log(`not spawn turn`);
})


// // Start turn-based game
// function init() {
//     spawns.push(new Spawn());

    
//     let thisHero = myHero;

//     let currentRound = 0;

//     console.log(thisHero);
//     console.log(spawns[0]);

//     while (spawns[0].hp_now > 0 && thisHero.hp_now > 0 && gameOver === false){

//         // // Start round
//         // currentRound++;
//         // console.log(`ROUND ${currentRound}, FIGHT!`);

//         if (myTurn === true){
//             // Start round
//             currentRound++;
//             console.log(`ROUND ${currentRound}, ATTACK!`);
//             // player select action e.g. attack, use spell
//             document.getElementById("battle-attack").addEventListener("click", function(){
//                 thisHero.attack(spawns[0]);
//             })
//             console.log(`${thisHero.name} attacked with ${thisHero.damage}. Spawn has ${spawns[0].hp_now}HP left.`);
//             // action is executed
//             myTurn = false;// end turn
//         } else if (myTurn === false){
//             // Start round
//             console.log(`ROUND ${currentRound}, DEFEND!`);
//             // computer's turn
//             // action is selected and executed
//             spawns[0].attack(thisHero);
//             console.log(`Spawn attacked with ${spawns[0].damage}. ${thisHero.name} has ${thisHero.hp_now}HP left.`);
//             // end turn
//             myTurn = true;
//         }
        
//         if (spawns[0].hp_now <= 0 || thisHero.hp_now <= 0){
//             gameOver = true;
//             console.log(`BATTLE ENDED AFTER ${currentRound} ROUNDS! YOUR HP: ${thisHero.hp_now}. SPAWN HP: ${spawns[0].hp_now}`);
//         }

//     }

// }

// // example how to add innerHTML
// document.getElementById("your-hero").innerHTML = ``;
// document.getElementById("battle-screen").innerHTML = tokens.map(createElement).join("");

// function createElement(token){
//     return `        <div class="user-nft">
//     <h3 class="nft-name">${token.metadata.name}</h3>
//     <img src="${token.metadata.image}" alt="" width="300">
//     <div class="attributes">
//         <div>Strength: ${token.metadata.attributes[0].value}</div>
//         <div>Agility: ${token.metadata.attributes[1].value}</div>
//         <div>Wisdom: ${token.metadata.attributes[2].value}</div>
//     </div>
// </div>`
// }


// init();
// init("Moonbeam", "Archer");
// init("Moondust", "Wizard");