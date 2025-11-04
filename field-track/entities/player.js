import Entity from './entity.js'
import { groundY, gravity, jumpForce } from './physics.js';
import { gameState } from '../config/gameState.js';
import drawHitBox from '../utils/drawHitBox.js';

export default class Player extends Entity {
    constructor(x, y, width, height, speed, frames, jumpImg, hitbox = null) {
        super(x, y, width, height, speed);
        this.frames = frames;
        this.jumpImg = jumpImg;
        this.frameDelay = 0;
        this.frameInterval = 4;
        this.currentFrame = 0;
        this.velocityY = 0;
        this.jumping = false;
        // if hitbox config is passed, use it - else use full box
        if (hitbox) {
            this.hitbox = {
                offsetX: hitbox.offsetX ?? 0,
                offsetY: hitbox.offsetY ?? 0,
                width: hitbox.width ?? width,
                height: hitbox.height ?? height,
            }
        } else {
            this.hitbox = {
                offsetX: 0,
                offsetY: 0,
                width: width,
                height: height,
            };
        }
    }
    update() {
        this.frameDelay += gameState.speedScale;
        // show frames
        if (!this.jumping && this.frameDelay >= this.frameInterval) {
            this.frameDelay = 0;
            this.currentFrame = (this.currentFrame + 1) % this.frames.length;
        }
        // set y position
        // Note: at the start of each redraw, gravity is added to velocityY making
        // the player falls down (is it is jumping)
        this.velocityY += gravity;
        this.y += this.velocityY;
        if (this.y >= groundY - this.height) {
            // player falls under the ground
            this.velocityY = 0;
            this.y = groundY - this.height;
            this.jumping = false;
        }
    }
    jump() {
        if (!this.jumping) {
            this.velocityY = -jumpForce;
            this.jumping = true;
        }
    }
    draw(context) {
        const img = this.jumping ? this.jumpImg : this.frames[this.currentFrame];
        context.drawImage(img, this.x, this.y, this.width, this.height);
        if (this.hitbox && gameState.testing) { drawHitBox(this.x, this.y, this.hitbox, 'white', context); }
    }

    reset() {
        // restore default state
        this.x = this.initialX ?? this.x; // optional if you want fixed start position
        this.y = groundY - this.height;
        this.velocityY = 0;
        this.jumping = false;
        this.currentFrame = 0;
        this.frameDelay = 0;
    }
}