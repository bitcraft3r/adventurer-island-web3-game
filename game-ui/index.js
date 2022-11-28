const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d"); // canvas context

canvas.width = 1024;
canvas.height = 576;

// create 2D array of collisions
const collisionsMap = [];
for (let i=0; i<collisions.length; i+=70){
    collisionsMap.push(collisions.slice(i, 70 + i));
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

c.fillStyle = "grey";
c.fillRect(0, 0, 1024, 576);

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
    frames: {max:4},
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

const movables = [background, ...boundaries, foreground]; // spread operator to take all items within the array, so there's no 2D arrays

function rectangularCollision({rectangle1, rectangle2}){
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && // if right side of player > left side of box == colliding (on left side of box)
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width && // check left side of player vs right side of box
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height && // check top of player and bottom of box
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y // check bottom of player and top of box
    )
}

function animate() {
    window.requestAnimationFrame(animate);
    background.draw();
    // draw boundaries before player so player moves above boundaries
    boundaries.forEach(boundary => {
        boundary.draw();
    })
    player.draw();
    foreground.draw();
    
    let moving = true;
    
    player.moving = false;

    if (keys.w.pressed && lastKey === 'w'){
        player.moving = true;
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
                console.log(`colliding`);
                moving = false;
                break;
            };
        }
        if (moving) movables.forEach(movable => movable.position.y += 5);
    } else if (keys.a.pressed && lastKey === 'a'){
        player.moving = true;
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
                console.log(`colliding`);
                moving = false;
                break;
            };
        }
        if (moving) movables.forEach(movable => movable.position.x += 5);
    } else if (keys.s.pressed && lastKey === 's'){
        player.moving = true;
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
                console.log(`colliding`);
                moving = false;
                break;
            };
        }
        if (moving) movables.forEach(movable => movable.position.y -= 5)
    } else if (keys.d.pressed && lastKey === 'd'){
        player.moving = true;
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
                console.log(`colliding`);
                moving = false;
                break;
            };
        }
        if (moving) movables.forEach(movable => movable.position.x -= 5)
    } 
}
animate();

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