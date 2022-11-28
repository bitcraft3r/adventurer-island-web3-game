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
    c.drawImage(image, -735, -600);
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
}