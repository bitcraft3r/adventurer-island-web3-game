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
        this.xp = 0;
        this.bag = [];
        this.gold = 0;
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

class Monster extends Sprite {
    constructor({ position, image, frames = {max:1, hold:10}, sprites, animate=false, rotation=0, isEnemy=false, name, attacks, xp, drops, rareDrops, gold }) {
        super({ position, image, frames, sprites, animate, rotation });
        this.health = 100;
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
        document.querySelector("#dialogueBox").innerHTML = `${this.name} used ${attack.name}!`

        let healthBar = "#enemyHealthBar";
        if (this.isEnemy) healthBar = '#playerHealthBar';
        recipient.health -= attack.damage;
        let rotation = 1;
        if (this.isEnemy) rotation = -3;

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
                renderedSprites.splice(1, 0, fireball); // add fireball after before player sprite but after enemy sprite
                gsap.to(fireball.position, {
                    x: recipient.position.x,
                    y: recipient.position.y,
                    onComplete: () => {
                        // Enemy actually gets hit
                        audio.fireballHit.play();
                        gsap.to(healthBar, {
                            width: recipient.health + "%"
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
                            width: recipient.health + "%"
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
                            width: recipient.health + "%"
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