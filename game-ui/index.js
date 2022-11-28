const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d"); // canvas context

canvas.width = 1024;
canvas.height = 576;

c.fillStyle = "grey";
c.fillRect(0, 0, 1024, 576);

const bgImage = new Image();
bgImage.src = "./img/pelletTown.png";

const playerImage = new Image();
playerImage.src = "./img/playerDown.png";

class Sprite {
    constructor({ position, image }){
        this.position = position;
        this.image = image;
    }
    draw(){
        c.drawImage(this.image, this.position.x, this.position.y);
    }
}

const background = new Sprite({ 
    position: {x:-735, y:-600},
    image: bgImage,
});

const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false },
}

function animate() {
    window.requestAnimationFrame(animate);
    background.draw();
    c.drawImage(
        playerImage, 
        0, // x coordinate to being cropping from
        0, // y coordinate to begin cropping from
        playerImage.width/4, // crop width
        playerImage.height, // crop height
        canvas.width/2 - playerImage.width/4/2, 
        canvas.height/2 - playerImage.height/2,
        playerImage.width/4, // size of output width
        playerImage.height, // size of output height
    );

    if (keys.w.pressed && lastKey === 'w') background.position.y += 5;
    else if (keys.a.pressed && lastKey === 'a') background.position.x += 5;
    else if (keys.s.pressed && lastKey === 's') background.position.y -= 5;
    else if (keys.d.pressed && lastKey === 'd') background.position.x -= 5;
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