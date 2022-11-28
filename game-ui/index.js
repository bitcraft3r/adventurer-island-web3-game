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
        c.drawImage(this.image, -735, -600);
    }
}

const background = new Sprite({ 
    position: {x:-735, y:-600},
    image: bgImage,
});

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
    console.log(`animate`);
}
animate();

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case 'w':
            console.log('pressed w');
            break;
        case 'a':
            console.log('pressed a');
            break;
        case 's':
            console.log('pressed s');
            break;
        case 'd':
            console.log('pressed d');
            break;
    }
});