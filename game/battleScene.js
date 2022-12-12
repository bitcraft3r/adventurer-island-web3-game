const battleBackgroundImage = new Image();
battleBackgroundImage.src = "./img/battleBackground.png";
const battleBackground = new Sprite({position: {x:0, y:0}, image: battleBackgroundImage})

let enemy;
let fighter;
let renderedSprites;
let battleAnimationId;
let queue;

// set monster's appearance probability
let randomMonster = () => {
    if (adv.attr.level === 1){
        document.querySelector("#enemyName").innerHTML = "Momo"
        return monsters.Momo;
    }
    else if (adv.attr.level === 2){
        if (Math.random() < 0.4) {
            document.querySelector("#enemyName").innerHTML = "Momo"
            return monsters.Momo;
        } else {
            document.querySelector("#enemyName").innerHTML = "Draggle"
            return monsters.Draggle;
        }
    }
    else if (adv.attr.level === 3){
        let randomNumber = Math.random();
        if (randomNumber < 0.35) {
            document.querySelector("#enemyName").innerHTML = "Momo"
            return monsters.Momo;
        } else if (randomNumber < 0.75) {
            document.querySelector("#enemyName").innerHTML = "Draggle"
            return monsters.Draggle;
        } else {
            document.querySelector("#enemyName").innerHTML = "Emby"
            return monsters.Emby;
        }
    }
    else if (adv.attr.level === 4){
        let randomNumber = Math.random();
        if (randomNumber < 0.15) {
            document.querySelector("#enemyName").innerHTML = "Momo"
            return monsters.Momo;
        } else if (randomNumber < 0.4) {
            document.querySelector("#enemyName").innerHTML = "Draggle"
            return monsters.Draggle;
        } else if (randomNumber < 0.9) {
            document.querySelector("#enemyName").innerHTML = "Emby"
            return monsters.Emby;
        } else {
            document.querySelector("#enemyName").innerHTML = "Woodle"
            return monsters.Woodle;
        }
    }
    else if (adv.attr.level === 5){
        let randomNumber = Math.random();
        if (randomNumber < 0.05) {
            document.querySelector("#enemyName").innerHTML = "Momo"
            return monsters.Momo;
        } else if (randomNumber < 0.1) {
            document.querySelector("#enemyName").innerHTML = "Draggle"
            return monsters.Draggle;
        } else if (randomNumber < 0.4) {
            document.querySelector("#enemyName").innerHTML = "Emby"
            return monsters.Emby;
        } else if (randomNumber < 0.8) {
            document.querySelector("#enemyName").innerHTML = "Woodle"
            return monsters.Woodle;
        } else {
            document.querySelector("#enemyName").innerHTML = "Rocky"
            return monsters.Rocky;
        }
    }
    else if (adv.attr.level >= 6){
        let randomNumber = Math.random();
        if (randomNumber < 0.025) {
            document.querySelector("#enemyName").innerHTML = "Momo"
            return monsters.Momo;
        } else if (randomNumber < 0.05) {
            document.querySelector("#enemyName").innerHTML = "Draggle"
            return monsters.Draggle;
        } else if (randomNumber < 0.1) {
            document.querySelector("#enemyName").innerHTML = "Emby"
            return monsters.Emby;
        } else if (randomNumber < 0.3) {
            document.querySelector("#enemyName").innerHTML = "Woodle"
            return monsters.Woodle;
        } else if (randomNumber < 0.65) {
            document.querySelector("#enemyName").innerHTML = "Rocky"
            return monsters.Rocky;
        } else {
            document.querySelector("#enemyName").innerHTML = "Beradin"
            return monsters.Beradin;
        }
    }
    // TODO: unable beat Rocky at level 4 & 5. 
    // TODO: too much Beradin on level 6
}

function initBattle() {
    document.querySelector("#userInterface").style.display = "block";
    document.querySelector("#dialogueBox").style.display = "none";
    document.querySelector("#enemyHealthBar").style.width = "100%";
    document.querySelector("#playerHealthBar").style.width = "100%";
    document.querySelector("#attacksBox").replaceChildren();

    // set fight scene's player name as the Adventurer name
    document.querySelector("#playerName").innerHTML = adv.name;

    // clear/reset log
    document.querySelector("#battleLogItems").replaceChildren();

    // RESET MONSTER POSITIONS
    monsters.Adventurer.position = {x:260, y:280};
    monsters.Momo.position = {x:800, y:100}, 
    monsters.Draggle.position = {x:800, y:100}, 
    monsters.Emby.position = {x:800, y:100}, 
    monsters.Woodle.position = {x:785, y:65}, 
    monsters.Rocky.position = {x:740, y:60}, 
    monsters.Beradin.position = {x:780, y:55}, 

    // set fighter's hp using adv's hp
    monsters.Adventurer.health = adv.attr.hp

    // initialize fighter and enemy
    enemy = new Monster(randomMonster());
    fighter = new Monster(monsters.Adventurer);
    renderedSprites = [fighter, enemy];
    queue = [];
    fighter.name = adv.name;

    // show HP of adv & monster for start of game
    document.querySelector("#playerHP").innerHTML = `HP: ${fighter.health}/${fighter.healthMax}`; 
    document.querySelector("#enemyHP").innerHTML = `HP: ${enemy.health}/${enemy.healthMax}`;

    fighter.attacks.forEach(attack => {
        // populate attacksBox dynamically with player's available attacks
        const button = document.createElement('button');
        button.innerHTML = attack.name;
        button.setAttribute("id", "fightButton");
        document.querySelector("#attacksBox").append(button);
    })

    // event listeners related to battle
    document.querySelectorAll("#fightButton").forEach((button) => {
        button.addEventListener("click", (e)=>{
            const selectedAttack = attacks[e.currentTarget.innerHTML];
            fighter.attack({ 
                attack: selectedAttack,
                recipient: enemy,
                renderedSprites
            })

            // IF PLAYER WINS THE BATTLE
            if (enemy.health <= 0) {
                // handle drops
                let newKey = enemy.drops[0];
                if (Math.random() < 0.75) {
                    if (!adv.bag[`${newKey}`]) adv.bag[`${newKey}`] = 0; // if no such key, initiate it
                    adv.bag[`${newKey}`] += 1; // 75% chance to get normal drop
                }

                // handle rare drops
                let newKeyRare = enemy.rareDrops[0];
                if (Math.random() < 0.2) {
                    if (!adv.bag[`${newKeyRare}`]) adv.bag[`${newKeyRare}`] = 0; 
                    adv.bag[`${newKeyRare}`] += 1; // 20% chance to get rare drop
                    console.log(`you found a rare item (${newKeyRare})!`)
                }

                // show on UI
                // document.querySelector("#itemOverlay").innerHTML = `ITEMS: [x]`;
                // TODO: show obj length? https://stackoverflow.com/a/6700

                // handle gold
                adv.gold += enemy.gold - Math.floor(Math.random() * enemy.gold/4); // e.g. minus (up to ~25%)
                document.querySelector("#goldOverlay").innerHTML = `GOLD: ${adv.gold}`;

                // handle XP gained
                adv.attr.xp += enemy.xp;

                // log level before win fight
                let levelBefore = adv.attr.level;

                // handle leveling up
                if (adv.attr.xp >= 30 && adv.attr.xp < 80) adv.attr.level = 2;
                else if (adv.attr.xp >= 80 && adv.attr.xp < 150) adv.attr.level = 3;
                else if (adv.attr.xp >= 150 && adv.attr.xp < 250) adv.attr.level = 4;
                else if (adv.attr.xp >= 250 && adv.attr.xp < 400) adv.attr.level = 5;
                else if (adv.attr.xp >= 400 && adv.attr.xp < 600) adv.attr.level = 6;
                else if (adv.attr.xp >= 600 && adv.attr.xp < 850) adv.attr.level = 7;
                else if (adv.attr.xp >= 850 && adv.attr.xp < 1150) adv.attr.level = 8;
                else if (adv.attr.xp >= 1150 && adv.attr.xp < 1500) adv.attr.level = 9;
                else if (adv.attr.xp >= 1500 && adv.attr.xp < 2000) adv.attr.level = 10;

                // log level after win fight
                let levelAfter = adv.attr.level;

                // display LEVEL and XP
                document.querySelector("#xpOverlay").innerHTML = `LEVEL: ${adv.attr.level} (${adv.attr.xp} XP)`;

                queue.push(()=>{
                enemy.faint();
                })
                queue.push(()=>{
                    gsap.to("#overlappingDiv", {
                        opacity: 1,
                        onComplete: () => {
                            cancelAnimationFrame(battleAnimationId);
                            animate();
                            document.querySelector("#userInterface").style.display = `none`;
                            gsap.to("#overlappingDiv", {
                                opacity: 0
                            })
                            // end battle - player won
                            battle.initiated = false;
                            audio.Map.play();
                            // open level up screen
                            if (levelBefore !== levelAfter) {
                                // show screen
                                document.querySelector("#levelUpOverlay").style.display = "block";

                                // populate title
                                document.querySelector("#levelUpTitle").innerHTML = `YOU HAVE REACHED LEVEL ${levelAfter}!`;
                                
                                // levelUp logic
                                // populate text based on level

                                // level 2: select class
                                if (levelAfter === 2){
                                    // select class
                                    document.querySelector("#levelUpText").innerHTML = `
                                    <div id="classBox">Select Class:
                                        <select id="chooseClass">
                                            <option value="Swordsman">Swordsman</option>
                                            <option value="Archer">Archer</option>
                                            <option value="Wizard">Wizard</option>
                                        </select>
                                    </div>
                                    `;
                                } 

                                // level 3: get new attack
                                if (levelAfter === 3){
                                    // clear old text
                                    document.querySelector("#levelUpText").replaceChildren();

                                    // add a new attack
                                    if (adv.class === "Swordsman") monsters.Adventurer.attacks.push(attacks.Slash);
                                    else if (adv.class === "Archer") monsters.Adventurer.attacks.push(attacks.Bullseye);
                                    else if (adv.class === "Wizard") monsters.Adventurer.attacks.push(attacks.Fireball);

                                    // update dom
                                    document.querySelector("#levelUpTextMore").innerHTML =`
                                    <div id="newSkill">
                                        You have gained a new skill (${monsters.Adventurer.attacks[monsters.Adventurer.attacks.length-1].name})!
                                    </div>
                                    `;
                                }+``

                                // level 4++: add stats
                                if (levelAfter >= 4){
                                    // clear old text
                                    document.querySelector("#levelUpText").replaceChildren();
                                    document.querySelector("#levelUpTextMore").replaceChildren();
                                    
                                    // +3 stats points to add to attributes
                                    document.querySelector("#levelUpText").style.display = "block";
                                    document.querySelector("#levelUpText").innerHTML =`
                                    <div id="addStatsBox">You have gained +3 Attribute Points. Select which Stat you want to increase:
                                        <div id="chooseStats">
                                            <p id="chooseStatsStr">STR: ${adv.attr.strength}</p><input id="addStr" type="number" min="0" max="3">
                                            <p id="chooseStatsAgi">AGI: ${adv.attr.agility}</p><input id="addAgi" type="number" min="0" max="3">
                                            <p id="chooseStatsWis">WIS: ${adv.attr.wisdom}</p><input id="addWis" type="number" min="0" max="3">
                                        </div>
                                    </div>
                                    `;

                                    // show addStatsBox
                                    document.querySelector("#addStatsBox").style.display = "block";

                                    // update adv's stat dynamically on ui to include the input values chosen

                                    // in level up screen 4++, able to select attributes to add points to.
                                    // when user changes the input value -> update the currentStat being shown.
                                    // e.g. if STR: 11, when i change input of increaseStr from 0 to 1, ui changes to STR: 12.
                                    let inputStr = document.querySelector('#addStr');
                                    let inputAgi = document.querySelector('#addAgi');
                                    let inputWis = document.querySelector('#addWis');
                                    let outputStr = document.querySelector('#chooseStatsStr');
                                    let outputAgi = document.querySelector('#chooseStatsAgi');
                                    let outputWis = document.querySelector('#chooseStatsWis');

                                    // when value of stats input box change, update total stats on ui

                                    inputStr.addEventListener('change', (event) => {
                                        // Get the current value of the input field
                                        let valueStr = Number(event.target.value);
                                        // Update the output element with the current input value
                                        outputStr.innerHTML = `STR: ${adv.attr.strength + valueStr}`;
                                    });
                                    inputAgi.addEventListener('change', (event) => {
                                        let valueAgi = Number(event.target.value);
                                        outputAgi.innerHTML = `AGI: ${adv.attr.agility + valueAgi}`;
                                    });
                                    inputWis.addEventListener('change', (event) => {
                                        let valueWis = Number(event.target.value);
                                        outputWis.innerHTML = `WIS: ${adv.attr.wisdom + valueWis}`;
                                    });
                                    // In the above example, we are using the querySelector method to get references to the input and output elements in the DOM. Then we are using addEventListener to listen for input events on the input element. When the input event is triggered, the callback function gets the current value of the input field and updates the output element with that value.
                                } 
                                
                                // level 5: equip weapon
                                if (levelAfter === 5){
                                    // show weapon if available, otherwise show none
                                    if (adv.class === "Swordsman" && adv.bag.sword > 0){
                                        document.querySelector("#levelUpTextMore").innerHTML =`
                                            <div id="equipWeaponBox">Equip ${adv.class}'s Weapon:
                                                <select id="equipWeapon">
                                                    <option value="sword">Sword (${adv.bag.sword})</option>
                                                </select>
                                                </div>
                                            </div>
                                            `;
                                    }
                                    else if (adv.class === "Archer" && adv.bag.bow > 0){
                                        document.querySelector("#levelUpTextMore").innerHTML =`
                                        <div id="equipWeaponBox">Equip ${adv.class}'s Weapon:
                                            <select id="equipWeapon">
                                                <option value="bow">Bow (${adv.bag.bow})</option>
                                            </select>
                                            </div>
                                        </div>
                                        `;
                                    }
                                    else if (adv.class === "Wizard" && adv.bag.wand > 0){
                                        document.querySelector("#levelUpTextMore").innerHTML =`
                                        <div id="equipWeaponBox">Equip ${adv.class}'s Weapon:
                                            <select id="equipWeapon">
                                                <option value="wand">Wand (${adv.bag.wand})</option>
                                            </select>
                                            </div>
                                        </div>
                                        `;
                                    } 
                                    else {
                                        document.querySelector("#levelUpTextMore").innerHTML =`
                                            <div id="equipWeaponBox">Equip ${adv.class}'s Weapon:
                                                <select id="equipWeapon">
                                                    <option value="none">None</option>
                                                </select>
                                                </div>
                                            </div>
                                            `;
                                    }
                                }
                            }
                        }
                    })
                })
            }

            // handle enemy attacks

            // randomize selection of enemy attacks
            const randomAttack = enemy.attacks[Math.floor(Math.random() * enemy.attacks.length)];

            queue.push(()=>{
                enemy.attack({ 
                    attack: randomAttack,
                    recipient: fighter,
                    renderedSprites
                })
                if (fighter.health <= 0) {
                    queue.push(()=>{
                    fighter.faint();
                    })
                    queue.push(()=>{
                        gsap.to("#overlappingDiv", {
                            opacity: 1,
                            onComplete: () => {
                                cancelAnimationFrame(battleAnimationId);
                                animate();
                                document.querySelector("#userInterface").style.display = `none`;
                                gsap.to("#overlappingDiv", {
                                    opacity: 0
                                })
                                // end battle - player lost
                                battle.initiated = false;
                                audio.Map.play();
                                // penalty for fainting - lose [10% + (0 to 10%)] of gold (then round up)
                                let goldToDeduct = Math.ceil( adv.gold/10 + adv.gold*Math.random()/10 ); 
                                // deduct the gold from adv object
                                adv.gold -= goldToDeduct;
                                // show the new gold value on map overlay
                                document.querySelector("#goldOverlay").innerHTML = `GOLD: ${adv.gold}`;
                                // show the penalty description screen
                                document.querySelector("#penaltyOverlay").style.display = 'block';
                                document.querySelector("#penaltyText").innerHTML = `You dropped ${goldToDeduct} Gold.`;
                            }
                        })
                    })
                }
            })
        })
    })

}

function animateBattle() {
    battleAnimationId = window.requestAnimationFrame(animateBattle);
    battleBackground.draw();

    renderedSprites.forEach(sprite => {
        sprite.draw()
    })
}

// logic for what happens after adventurer selects attack (and dialogue box appears)
document.querySelector("#dialogueBox").addEventListener("click", (e)=>{
    if (queue.length > 0){
        // execute (then remove) remaining queue items starting from front of array
        queue[0]();
        queue.shift();
    } else e.currentTarget.style.display = 'none'; // once queue is empty, next click will close dialogue box
})

// start animation with animate() from index.js
animate();