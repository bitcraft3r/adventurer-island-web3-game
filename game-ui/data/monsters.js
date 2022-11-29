const monsters = {
    Fighter: {
        position: {x:260, y:280}, 
        image: {src: "./img/playerBattle.png"}, 
        frames: {max:4, hold:20}, 
        animate: true, 
        name:"Fighter",
        attacks: [attacks.Tackle, attacks.Fireball]
    },
    Emby: {
        position: {x:800, y:100}, 
        image: {src: "./img/embySprite.png"}, 
        frames: {max:4, hold:20}, 
        animate: true, 
        isEnemy: true, 
        name:"Emby",
        attacks: [attacks.Tackle, attacks.Fireball],
        xp: 25,
        drops: [{ ash: 1 }],
        rareDrops: [{ sword: 1 }],
        gold: 20,
    },
    Draggle: {
        position: {x:800, y:100}, 
        image: {src: "./img/draggleSprite.png"}, 
        frames: {max:4, hold:20}, 
        animate: true, 
        isEnemy: true, 
        name:"Draggle",
        attacks: [attacks.Tackle, attacks.Dive],
        xp: 15,
        drops: [{ leather: 1 }],
        rareDrops: [{ wand: 1 }],
        gold: 15,
    }
}