const battleBackgroundImage = new Image();
battleBackgroundImage.src = "./img/battleBackground.png";
const battleBackground = new Sprite({position: {x:0, y:0}, image: battleBackgroundImage})

let enemy;
let fighter;
let renderedSprites;
let battleAnimationId;
let queue;

let randomMonster = () => {
    if (Math.random() < 0.33) {
        document.querySelector("#enemyName").innerHTML = "Draggle"
        return monsters.Draggle;
    } else if (Math.random() > 0.33) {
        document.querySelector("#enemyName").innerHTML = "Momo"
        return monsters.Momo;
    } else {
        document.querySelector("#enemyName").innerHTML = "Emby"
        return monsters.Emby;
    }
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
        document.querySelector("#attacksBox").append(button);
    })

    // event listeners related to battle
    document.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", (e)=>{
            const selectedAttack = attacks[e.currentTarget.innerHTML];
            fighter.attack({ 
                attack: selectedAttack,
                recipient: enemy,
                renderedSprites
            })

            if (enemy.health <= 0) {
                // handle drops
                let newKey = enemy.drops[0];
                if (!adv.bag[`${newKey}`]) adv.bag[`${newKey}`] = 0; // if no such key, initiate it
                adv.bag[`${newKey}`] += 1;

                // handle rare drops
                let newKeyRare = enemy.rareDrops[0];
                if (Math.random() < 0.2) {
                    if (!adv.bag[`${newKeyRare}`]) adv.bag[`${newKeyRare}`] = 0; 
                    adv.bag[`${newKeyRare}`] += 1; // 20% chance to get rare drop
                }

                // show on UI
                document.querySelector("#itemOverlay").innerHTML = `ITEMS: [x]`;
                // TODO: show obj length? https://stackoverflow.com/a/6700

                // handle gold
                adv.gold += enemy.gold - Math.floor(Math.random() * enemy.gold/4); // e.g. minus (up to ~25%)
                document.querySelector("#goldOverlay").innerHTML = `GOLD: ${adv.gold}`;

                // handle XP
                adv.attr.xp += enemy.xp;
                document.querySelector("#xpOverlay").innerHTML = `XP: ${adv.attr.xp}`;


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
                            battle.initiated = false;
                            audio.Map.play();
                        }
                    })
                })
            }

            // enemy attacks
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
                                battle.initiated = false;
                                audio.Map.play();
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

animate();
// initBattle();
// animateBattle();

document.querySelector("#dialogueBox").addEventListener("click", (e)=>{
    if (queue.length > 0){
        queue[0]();
        queue.shift();
    } else e.currentTarget.style.display = 'none';
})