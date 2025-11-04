import Entity from "./entity.js";
import { gameState } from "../config/gameState.js";
import drawHitBox from "../utils/drawHitBox.js";

export default class Obstacle extends Entity {
    constructor(x, y, width, height, speed, img, hitbox = null) {
        super(x, y, width, height, speed);
        this.img = img;

        // if hitbox config is passed, use it - else use full box
        if (hitbox) {
            this.hitbox = {
                offsetX: hitbox.offsetX ?? 0,
                offsetY: hitbox.offsetY ?? 0,
                width: hitbox.width ?? this.width,
                height: hitbox.height ?? this.height,
            }
        } else {
            this.hitbox = {
                offsetX: 0,
                offsetY: 0,
                width: this.width,
                height: this.height
            }
        }

        // console.log(`hit box created in object: `);
        // console.log(this.hitbox);

    }
    update() {
        super.update();
        // this.markedForDeletion = false;
    }
    draw(context) {
        // draw image
        context.drawImage(this.img, this.x, this.y, this.width, this.height);
        // console.log(this);
        // draw hit box
        if (this.hitbox && gameState.testing) {drawHitBox(this.x, this.y, this.hitbox, "white", context);}
    }
}
// static obstacles
export class StaticObstacle extends Obstacle {
    constructor(x, y, width, height, speed, img, hitbox = null) {
        super(x, y, width, height, speed, img, hitbox);
        // console.log(`creating a static obstacle with hitbox: `);
        // console.log(hitbox);
    }
}
// animated obstacle
export class AnimatedObstacle extends Obstacle {
    constructor(x, y, width, height, speed, frames, hitbox = null) {
        super(x, y, width, height, speed, frames[0], hitbox);
        this.frames = frames;
        this.frameDelay = 0;
        this.frameInverval = 5;
        this.currentFrame = 0;
        // console.log(`creating a dynamic obstacle with hitbox: `);
        // console.log(hitbox);
    }
    update() {
        // move left
        super.update();
        // animation
        this.frameDelay += gameState.speedScale;
        if (this.frameDelay >= this.frameInverval) {
            this.frameDelay = 0;
            this.currentFrame = (this.currentFrame + 1) % this.frames.length;
        }
    }
    draw(context) {
        // draw image
        context.drawImage(this.frames[this.currentFrame], this.x, this.y, this.width, this.height);
        // draw hit box
        if (this.hitbox && gameState.testing) {drawHitBox(this.x, this.y, this.hitbox, 'white', context);}
    }
}