class Sprite {
    constructor({ position, image, frames = {max:1} }){
        this.position = position;
        this.image = image;
        this.frames = frames;

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
            console.log(this.width);
            console.log(this.height);

        }
    }
    draw(){
        c.drawImage(
            this.image, 
            0, // x coordinate to being cropping from
            0, // y coordinate to begin cropping from
            this.image.width/this.frames.max, // crop width
            this.image.height, // crop height
            this.position.x,
            this.position.y,
            this.image.width/this.frames.max, // size of output width
            this.image.height, // size of output height
        );
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