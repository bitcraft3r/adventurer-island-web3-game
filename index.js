const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d"); // canvas context

canvas.width = 1024;
canvas.height = 576;

// create 2D array of collisions
const collisionsMap = [];
for (let i=0; i<collisions.length; i+=70){
    collisionsMap.push(collisions.slice(i, 70 + i));
}

// create 2D array of battleZones
const battleZonesMap = [];
for (let i=0; i<battleZonesData.length; i+=70){
    battleZonesMap.push(battleZonesData.slice(i, 70 + i));
}

const boundaries = [];
const offset = {
    x: -735,
    y: -650,
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) boundaries.push(new Boundary({position: {x:j*Boundary.width+offset.x, y:i*Boundary.height+offset.y}}))
    })
})

const battleZones = [];
battleZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) battleZones.push(new Boundary({position: {x:j*Boundary.width+offset.x, y:i*Boundary.height+offset.y}}))
    })
})

const bgImage = new Image();
bgImage.src = "./img/pelletTown.png";

const foregroundImage = new Image();
foregroundImage.src = "./img/foregroundObjects.png";

const playerUpImage = new Image();
playerUpImage.src = "./img/playerUp.png";
const playerLeftImage = new Image();
playerLeftImage.src = "./img/playerLeft.png";
const playerDownImage = new Image();
playerDownImage.src = "./img/playerDown.png";
const playerRightImage = new Image();
playerRightImage.src = "./img/playerRight.png";

const player = new Sprite({
    position: {
        x: canvas.width/2 - 192/4/2, 
        y: canvas.height/2 - 68/2,
    },
    image: playerDownImage,
    frames: {max:4, hold:10},
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        down: playerDownImage,
        right: playerRightImage
    }
})

const background = new Sprite({ 
    position: {x:offset.x, y:offset.y},
    image: bgImage,
});

const foreground = new Sprite({ 
    position: {x:offset.x, y:offset.y},
    image: foregroundImage,
});

const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false },
}

const movables = [background, ...boundaries, foreground, ...battleZones]; // spread operator to take all items within the array, so there's no 2D arrays

function rectangularCollision({rectangle1, rectangle2}){
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && // if right side of player > left side of box == colliding (on left side of box)
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width && // check left side of player vs right side of box
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height && // check top of player and bottom of box
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y // check bottom of player and top of box
    )
}

const battle = {
    initiated: false
}

function animate() {
    const animationId = window.requestAnimationFrame(animate);
    background.draw();
    // draw boundaries before player so player moves above boundaries
    boundaries.forEach(boundary => {
        boundary.draw();
    })
    battleZones.forEach(battleZone => {
        battleZone.draw();
    })
    player.draw();
    foreground.draw();

    let moving = true;
    player.animate = false;

    // console.log(animationId)
    if (battle.initiated) return;
    // activate a battle
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed){
        for (let i=0; i<battleZones.length; i++){
            const battleZone = battleZones[i];
            const overlappingArea = (Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width) - Math.max(player.position.x, battleZone.position.x)) * (Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height) - Math.max(player.position.y, battleZone.position.y));
            if ( 
                rectangularCollision({
                    rectangle1: player, 
                    rectangle2: battleZone 
                }) &&
                overlappingArea > (player.width * player.height)/3 // require player to be at least 33% on the battleZone area
                && Math.random() < 0.01 // 1% chance to activate battle
            ){ 
                // console.log(`activate battle`)
                // deactivate current animation loop
                window.cancelAnimationFrame(animationId);
                audio.Map.stop();
                audio.initBattle.play();
                audio.battle.play();
                battle.initiated = true;
                // https://greensock.com/docs/
                gsap.to("#overlappingDiv", {
                    opacity: 1,
                    repeat: 3,
                    yoyo: true,
                    duration: 0.4,
                    onComplete(){
                        gsap.to("#overlappingDiv", {
                            opacity: 1,
                            duration: 0.4,
                            onComplete(){
                                // activate a new animation loop
                                initBattle()
                                animateBattle()
                                gsap.to("#overlappingDiv", {
                                    opacity: 0,
                                    duration: 0.4
                                })
                            }
                        })
                    }
                })
                break;
            };
        }
    }

    if (keys.w.pressed && lastKey === 'w'){
        player.animate = true;
        player.image = player.sprites.up;
        for (let i=0; i<boundaries.length; i++){
            const boundary = boundaries[i];
            if ( 
                rectangularCollision({
                    rectangle1: player, 
                    rectangle2: {...boundary, position: { // `...` to create clone of boundary obj w/o rewriting original obj
                        x: boundary.position.x,
                        y: boundary.position.y + 5
                    }} 
                }) 
            ){ 
                moving = false;
                break;
            };
        }
        if (moving) movables.forEach(movable => movable.position.y += 5);
    } else if (keys.a.pressed && lastKey === 'a'){
        player.animate = true;
        player.image = player.sprites.left;
        for (let i=0; i<boundaries.length; i++){
            const boundary = boundaries[i];
            if ( 
                rectangularCollision({
                    rectangle1: player, 
                    rectangle2: {...boundary, position: { // `...` to create clone of boundary obj w/o rewriting original obj
                        x: boundary.position.x + 5,
                        y: boundary.position.y
                    }} 
                }) 
            ){ 
                moving = false;
                break;
            };
        }
        if (moving) movables.forEach(movable => movable.position.x += 5);
    } else if (keys.s.pressed && lastKey === 's'){
        player.animate = true;
        player.image = player.sprites.down;
        for (let i=0; i<boundaries.length; i++){
            const boundary = boundaries[i];
            if ( 
                rectangularCollision({
                    rectangle1: player, 
                    rectangle2: {...boundary, position: { // `...` to create clone of boundary obj w/o rewriting original obj
                        x: boundary.position.x,
                        y: boundary.position.y - 5
                    }} 
                }) 
            ){ 
                moving = false;
                break;
            };
        }
        if (moving) movables.forEach(movable => movable.position.y -= 5)
    } else if (keys.d.pressed && lastKey === 'd'){
        player.animate = true;
        player.image = player.sprites.right;
        for (let i=0; i<boundaries.length; i++){
            const boundary = boundaries[i];
            if ( 
                rectangularCollision({
                    rectangle1: player, 
                    rectangle2: {...boundary, position: { // `...` to create clone of boundary obj w/o rewriting original obj
                        x: boundary.position.x - 5,
                        y: boundary.position.y
                    }} 
                }) 
            ){ 
                moving = false;
                break;
            };
        }
        if (moving) movables.forEach(movable => movable.position.x -= 5)
    } 
}
// animate();

let lastKey = '';
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true;
            lastKey = 'w';
            break;
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a';
            break;
        case 's':
            keys.s.pressed = true;
            lastKey = 's';
            break;
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd';
            break;
    }
});

window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }
});

let clicked = false;
addEventListener("click", ()=>{
    if (!clicked) {
        audio.Map.play();
        clicked = true;
    }
})

// Start screen click to continue
document.querySelector("#startButton").addEventListener("click", ()=>{
    document.querySelector("#startScreen").style.display = 'none';
} )

let adv;

// Character screen click to continue
document.querySelector("#heroButton").addEventListener("click", ()=>{
    document.querySelector("#startScreen2").style.display = 'none';

    let advName = document.getElementById("chooseName").value;
    document.querySelector("#nameOverlay").innerHTML = `${advName}`;
    
    // get NFT data // also add default values(random) if no nft selected
    let advStr = 6;
    let advAgi = 5;
    let advWis = 5;
    
    // create new Adventurer player
    adv = new Adventurer(advName, advStr, advAgi, advWis);
    
    console.log(adv);

// set player attacks damage
attacks.Brawl.damage = adv.attr.damage;
    
} )

// (load and) show NFTs
document.querySelector("#viewNft").addEventListener("click", ()=>{
    document.querySelector("#nftScreen").style.display = "flex";
    document.querySelector("#showNfts").replaceChildren(); // TODO: how to prevent Loading NFTs more than once?
    main();
})

// close NFT gallery
document.querySelector("#nftScreenButton").addEventListener("click", ()=>{
    document.querySelector("#nftScreen").style.display = "none";
})

// User SELECT nft, to be used to create character
/** TODO: FIX - CAN'T ATTACH EVENTLISTENER ON THE NEWLY LOADED NFTS */
// https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Synchronous_and_Asynchronous_Requests

// I WANT TO:
// attach eventListener on the newly loaded "#userNft", not it's parent #showNfts
// so that I can find data in the children:
// a) userNftName
// b) userNftAttr - str, agi, wis

document.querySelector("#showNfts").addEventListener("click", (e)=>{
// unable select ("#userNft"), because this does not exist on page load.
    // console.log(e.currentTarget); // currentTarget == showNfts
    console.log(e.target); // target == the element that's clicked

    // ** i want to make it so currentTarget gets me #userNft

    document.querySelector("#selectedNft").innerHTML = `
    <h4>Selected Adventurer:</h4>
    <div>
        <p>ID: Adventurer #???</p>
        <p>STR: <span id="selectStr">${1}</span></p>
        <p>AGI: <span id="selectAgi">${1}</span></p>
        <p>WIS: <span id="selectWis">${1}</span></p>
    </div>
    `;
})


// CLICK TO CONFIRM on LEVELUP SCREEN
document.querySelector("#levelUpButton").addEventListener("click", ()=>{
    // close levelUpOverlay
    document.querySelector("#levelUpOverlay").style.display = 'none';

    // update stats

    // e.g. for level 2: select class
    if (adv.attr.level === 2){
        let inputClass = document.getElementById("chooseClass").value;
        adv.class = inputClass;
        document.querySelector("#nameOverlay").innerHTML = `${adv.name} (${inputClass})`;
        // set adventurer attr.damage
        if (adv.class === "Warrior"){
            adv.attr.strength += 1;
            adv.attr.damage += adv.attr.strength/2;
        } 
        else if (adv.class === "Archer"){
            adv.attr.agility += 1;
            adv.attr.damage += adv.attr.agility/2;
        } 
        else if (adv.class === "Wizard"){
            adv.attr.wisdom += 1;
            adv.attr.damage += adv.attr.wisdom/2;
        } 

        console.log(`Selected Class: ${adv.class}. Added +1 to class' primary STAT`);
        console.log(`new attributes are ${adv.attr.strength}, ${adv.attr.agility}, ${adv.attr.wisdom}`);
        console.log(`Added priSTAT/2 damage; new damage is ${adv.attr.damage}`);
    }
    
    // for level 3++: add stats
    if (adv.attr.level >= 4){

        let strToAdd = Number(document.querySelector("#addStr").value);
        let agiToAdd = Number(document.querySelector("#addAgi").value);
        let wisToAdd = Number(document.querySelector("#addWis").value);
        console.log(strToAdd, agiToAdd, wisToAdd);

        if (strToAdd+agiToAdd+wisToAdd === 3) {
            // increase adventurer attributes
            adv.attr.strength += strToAdd;
            adv.attr.agility += agiToAdd;
            adv.attr.wisdom += wisToAdd;
            // increase adv damage
            if (adv.class === "Warrior"){
                adv.attr.damage += strToAdd/2;
            } 
            else if (adv.class === "Archer"){
                adv.attr.damage += agiToAdd/2;
            } 
            else if (adv.class === "Wizard"){
                adv.attr.damage += wisToAdd/2;
            } 
            
            console.log(`ADDED ${strToAdd}STR, ${agiToAdd}AGI, ${wisToAdd}WIS`);
            console.log(`new attributes are ${adv.attr.strength}, ${adv.attr.agility}, ${adv.attr.wisdom}`);
            console.log(`Added priSTAT/2 damage; new damage is ${adv.attr.damage}`);
        } else {
            document.querySelector("#levelUpOverlay").style.display = 'block';
            alert(`STR + AGI + WIS must be EQUAL TO 3`)
        } 


    }

    if (adv.attr.level === 5){
        let inputWeapon = document.getElementById("equipWeapon").value;
        if (inputWeapon !== `none`){            

            // check if object is empty
            // https://bobbyhadz.com/blog/javascript-check-if-object-is-empty
            const obj = adv.gear;
            if (Object.keys(obj).length === 0) {

                adv.gear[`${inputWeapon}`] = 1; // add weapon to gear
                adv.bag[`${inputWeapon}`] -= 1; // deduct 1 from bag
                console.log(`attached gear ${adv.gear}`)
                adv.attr.damage += 3;
                console.log(`increase dmg by 3, total dmg now ${adv.attr.damage}`)

            }   
        }


    }

    // other leveling logic @ battleScene initBattle()

})