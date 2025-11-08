import { gameState } from "../config/gameState.js";
export class Entity {
    constructor (x, y, width, height, speed = 0, img) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.delete = false;
        this.img = img;
    }
    update(){
        this.x -= this.speed * gameState.speedScale;
        if (this.x + this.width < 0) {
            this.delete = true;
        }
    }
    draw(context) {
        // console.log("Drawing image");
        // console.log(this.img);
        context.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}

export default Entity;