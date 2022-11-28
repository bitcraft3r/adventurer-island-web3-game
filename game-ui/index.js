const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d"); // canvas context

canvas.width = 1024;
canvas.height = 576;

c.fillStyle = "grey";
c.fillRect(0, 0, 1024, 576);

const image = new Image(); // Canvas api does not allow us to place image url directly within the image constructor, hence require next line
image.src = "./img/pelletTown.png";

image.onload = () => { // wait for background to load
    c.drawImage(image, -725, -550);
}