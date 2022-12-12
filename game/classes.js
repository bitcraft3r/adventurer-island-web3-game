class Sprite {
    constructor({ position, image, frames = {max:1, hold:10}, sprites, animate=false, rotation=0 }){
        this.position = position;
        this.image = new Image();
        this.frames = {...frames, val:0, elapsed:0};
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
        }
        this.image.src = image.src;
        this.animate = animate;
        this.sprites = sprites;
        this.opacity = 1;
        this.rotation = rotation;
    }
    draw(){
        c.save();
        c.translate(this.position.x + this.width/2, this.position.y + this.height/2);
        c.rotate(this.rotation); // 1 radian ~45degrees
        c.translate(-this.position.x - this.width/2, -this.position.y - this.height/2);
        c.globalAlpha = this.opacity;
        c.drawImage(
            this.image, 
            this.frames.val * this.width, // x coordinate to being cropping from
            0, // y coordinate to begin cropping from
            this.image.width/this.frames.max, // crop width
            this.image.height, // crop height
            this.position.x,
            this.position.y,
            this.image.width/this.frames.max, // size of output width
            this.image.height, // size of output height
        );
        c.restore();

        if (!this.animate) return; // same as if (this.moving === true){ add code below here } i.e. if not true, return. if true continue below code.

        if (this.frames.max > 1) {
            this.frames.elapsed++;
        }

        if (this.frames.elapsed % this.frames.hold === 0){
            if (this.frames.val < this.frames.max-1) this.frames.val++;
            else this.frames.val = 0;
        }
    }
}

class Adventurer {
    constructor(name, str, agi, wis){
        this.name = name;
        this.attr = {
            strength: str,
            agility: agi,
            wisdom: wis,
            luck: Math.floor(Math.random()*10) + 1,
            damage: 10,
            defence: 1,
            xp: 0,
            hp: 100,
            level: 1,
        };
        this.class = "";
        this.bag = {};
        this.gold = 0;
        this.gear = {};
    }
}

class Monster extends Sprite {
    constructor({ position, image, frames = {max:1, hold:10}, sprites, animate=false, rotation=0, health, damage, armour, isEnemy=false, name, attacks, xp, drops, rareDrops, gold }) {
        super({ position, image, frames, sprites, animate, rotation });
        this.health = health;
        this.healthMax = health;
        this.damage = damage;
        this.armour = armour
        this.isEnemy = isEnemy;
        this.name = name;
        this.attacks = attacks;
        this.xp = xp;
        this.drops = drops;
        this.rareDrops = rareDrops;
        this.gold = gold;
    }
    attack({attack, recipient, renderedSprites}){
        document.querySelector("#dialogueBox").style.display = 'block';
        document.querySelector("#dialogueBox").innerHTML = `${this.name} used ${attack.name}!`;

        let healthBar = "#enemyHealthBar";
        if (this.isEnemy) healthBar = '#playerHealthBar';

        // UPDATE ATTACKS DAMAGE
        if (this.isEnemy) { 
            // for enemy
            
            // UPDATE DAMAGE FOR "Tackle"
            if (attack.name === "Tackle"){
                attack.damage = this.damage;
            }

            // UPDATE DAMAGE FOR "Dive"
            if (attack.name === "Dive"){
                attack.damage = this.damage * 1.5;
            }

            // UPDATE DAMAGE FOR "Fireball (enemy)"
            if (attack.name === "Fireball"){
                attack.damage = Math.ceil(this.damage*1.5) + Math.ceil(Math.random() * (this.damage/2));
            }

        } else { 
            // for player

            // UPDATE DAMAGE FOR "Brawl"
            if (attack.name === "Brawl"){
                if (adv.attr.strength >= 10) attack.damage = adv.attr.strength;
                else attack.damage = 10;
            }
    
            // UPDATE DAMAGE FOR "Lucky"
            if (attack.name === "Lucky"){
                if (adv.attr.strength >= 10) attack.damage = Math.ceil(adv.attr.strength/2) + Math.ceil(Math.random()*adv.attr.strength*1.5);
                else attack.damage = 5 + Math.ceil(Math.random()*15);
            }

            // UPDATE DAMAGE FOR "Slash" "Bullseye" and "Fireball (player)"
            if (attack.name === "Slash") attack.damage = Math.floor(adv.attr.strength*1.5) + Math.ceil(Math.random() * (adv.attr.strength/2));
            else if (attack.name === "Bullseye") attack.damage = Math.floor(adv.attr.agility*1.5) + Math.ceil(Math.random() * (adv.attr.agility/2));
            else if (attack.name === "Fireball") attack.damage = Math.floor(adv.attr.wisdom*1.5) + Math.ceil(Math.random() * (adv.attr.wisdom/2));
        }

        let damageDealt;

        // handle attack damage
        if (this.isEnemy) { // logic for enemy attacks player
            damageDealt = attack.damage - adv.attr.defence
            recipient.health -= damageDealt;
            // TODO
            // add chance to evade attack
        } 
        else { // logic for player attacks enemy
            damageDealt = attack.damage - recipient.armour
            recipient.health -= damageDealt; 
            // TODO
            // add critical damage chance
        } 

        let enemyHpMax;
        if (this.isEnemy) enemyHpMax = this.healthMax;
        else enemyHpMax = recipient.healthMax;

        // update HP of adv & monster after each attack
        let showFighterHealth;
        if (fighter.health < 0) showFighterHealth = 0;
        else showFighterHealth = fighter.health;
        document.querySelector("#playerHP").innerHTML = `HP: ${showFighterHealth}/${adv.attr.hp}`;
        let showEnemyHealth;
        if (enemy.health < 0) showEnemyHealth = 0;
        else showEnemyHealth = enemy.health;
        document.querySelector("#enemyHP").innerHTML = `HP: ${showEnemyHealth}/${enemyHpMax}`;



        // push text to BATTLE LOG after attack is done
        if (recipient.health < 0) recipient.health = 0;
        let node = document.createElement("h6");
        let textnode = document.createTextNode(`${this.name} used ${attack.name} and did ${damageDealt}DMG! ${recipient.name} has ${recipient.health}HP left.`);
        node.appendChild(textnode);
        document.getElementById("battleLogItems").appendChild(node); // https://www.w3schools.com/jsref/met_node_appendchild.asp

        // handle rotation of fireball
        let rotation = 1;
        if (this.isEnemy) rotation = -3;

        // handle attack animations
        switch (attack.name) {
            case 'Fireball':
                audio.initFireball.play();
                const fireballImage = new Image();
                fireballImage.src = "./img/fireball.png"
                const fireball = new Sprite({
                    position: {x: this.position.x, y: this.position.y},
                    image: fireballImage,
                    frames: {max: 4, hold: 10},
                    animate: true,
                    rotation // same as `rotation: rotation`
                })
                // renderedSprites.push(fireball);
                renderedSprites.splice(1, 0, fireball); // add fireball before player sprite but after enemy sprite
                gsap.to(fireball.position, {
                    x: recipient.position.x,
                    y: recipient.position.y,
                    onComplete: () => {
                        // Enemy actually gets hit
                        audio.fireballHit.play();
                        gsap.to(healthBar, {
                            width: recipient.health*100/recipient.healthMax + "%"
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08,
                        })
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                        renderedSprites.splice(1, 1);
                    }
                })
            break;
            case 'Brawl':
                const tl3 = gsap.timeline();
                let movementDistance3 = 20;
                if (this.isEnemy) movementDistance3 = -20;

                tl3.to(this.position, {
                    x: this.position.x - movementDistance3,
                }).to(this.position, {
                    x: this.position.x + movementDistance3*2,
                    duration: 0.1,
                    onComplete: () => {
                        // Enemy actually gets hit
                        audio.tackleHit.play();
                        gsap.to(healthBar, {
                            width: recipient.health*100/recipient.healthMax + "%"
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08,
                        })
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                    }
                }).to(this.position, {
                    x: this.position.x,
                })
            break;
            case 'Lucky':
                const tl4 = gsap.timeline();
                let movementDistance4 = 20;
                if (this.isEnemy) movementDistance4 = -20;

                tl4.to(this.position, {
                    x: this.position.x - movementDistance4,
                }).to(this.position, {
                    x: this.position.x + movementDistance4*2,
                    duration: 0.1,
                    onComplete: () => {
                        // Enemy actually gets hit
                        audio.tackleHit.play();
                        gsap.to(healthBar, {
                            width: recipient.health*100/recipient.healthMax + "%"
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08,
                        })
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                    }
                }).to(this.position, {
                    x: this.position.x,
                })
            break;
            case 'Slash':
                const tl5 = gsap.timeline();
                let movementDistance5 = 20;
                if (this.isEnemy) movementDistance5 = -20;

                tl5.to(this.position, {
                    x: this.position.x - movementDistance5,
                }).to(this.position, {
                    x: this.position.x + movementDistance5*2,
                    duration: 0.1,
                    onComplete: () => {
                        // Enemy actually gets hit
                        audio.tackleHit.play();
                        gsap.to(healthBar, {
                            width: recipient.health*100/recipient.healthMax + "%"
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08,
                        })
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                    }
                }).to(this.position, {
                    x: this.position.x,
                })
            break;
            case 'Bullseye':
                const tl6 = gsap.timeline();
                let movementDistance6 = 20;
                if (this.isEnemy) movementDistance6 = -20;

                tl6.to(this.position, {
                    x: this.position.x - movementDistance6,
                }).to(this.position, {
                    x: this.position.x + movementDistance6*2,
                    duration: 0.1,
                    onComplete: () => {
                        // Enemy actually gets hit
                        audio.tackleHit.play();
                        gsap.to(healthBar, {
                            width: recipient.health*100/recipient.healthMax + "%"
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08,
                        })
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                    }
                }).to(this.position, {
                    x: this.position.x,
                })
            break;
            case 'Tackle':
                const tl = gsap.timeline();
                let movementDistance = 20;
                if (this.isEnemy) movementDistance = -20;

                tl.to(this.position, {
                    x: this.position.x - movementDistance,
                }).to(this.position, {
                    x: this.position.x + movementDistance*2,
                    duration: 0.1,
                    onComplete: () => {
                        // Enemy actually gets hit
                        audio.tackleHit.play();
                        gsap.to(healthBar, {
                            width: recipient.health*100/recipient.healthMax + "%"
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08,
                        })
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                    }
                }).to(this.position, {
                    x: this.position.x,
                })
            break;
            case 'Dive':
                const tl2 = gsap.timeline();

                tl2.to(this.position, {
                    y: this.position.y - 80,
                    duration: 0.4,
                }).to(this.position, {
                    y: this.position.y,
                    duration: 0.1,
                    onComplete: () => {
                        // Enemy actually gets hit
                        audio.tackleHit.play();
                        gsap.to(healthBar, {
                            width: recipient.health*100/recipient.healthMax + "%"
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08,
                        })
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                    }
                }).to(this.position, {
                    x: this.position.x,
                })
            break;
        }
    }
    faint(){
        audio.battle.stop();
        audio.victory.play();
        document.querySelector("#dialogueBox").innerHTML = `${this.name} fainted!`;
        gsap.to(this.position, {
            y: this.position.y + 20
        })
        gsap.to(this, {
            opacity: 0
        })
    }
}

class Boundary {
    static width = 48;
    static height = 48;
    constructor({position}){
        this.position = position;
        this.width = 48;
        this.height = 48;
    }
    draw(){
        c.fillStyle = 'rgba(255,0,0,0)';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}