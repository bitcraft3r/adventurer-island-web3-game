const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d"); // canvas context

canvas.width = 1024;
canvas.height = 576;

c.fillStyle = "grey";
c.fillRect(0, 0, 1024, 576);

const image = new Image();
image.src = "./img/pelletTown.png";

const playerImage = new Image();
playerImage.src = "./img/playerDown.png";

image.onload = () => { 
    c.drawImage(image, -738, -600);
    c.drawImage(
        playerImage, 
        canvas.width/2 - playerImage.width/2, 
        canvas.height/2 - playerImage.height/2
    ); // player sprite is smaller file than bg; can expect bg to load first
}