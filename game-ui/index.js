const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d"); // canvas context

canvas.width = 1024;
canvas.height = 576;

console.log(c);

c.fillStyle = "grey";
c.fillRect(0, 0, 1024, 576);