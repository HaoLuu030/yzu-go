import { gameState } from "../config/gameState.js";
import { detectCollision } from "../utils/detectCollision.js";

let hitSfx = new Audio("./assets/sfx/collide.mp3");

export default class EntityManager {
    constructor() {
        this.entities = {
            player: null,
            obstacles: [],
            midgrounds: [],
            backgrounds: []
        };
    }
    add(entity, type = "obstacle") {
        switch (type) {
            case "player":
                this.entities.player = entity;
                break;
            case "background":
                this.entities.backgrounds.push(entity);
                break;
            case "midground":
                this.entities.backgrounds.push(entity);
                break;
            case "obstacle":
                this.entities.obstacles.push(entity);
                break;
            default:
                console.warn(`Unknown entity type: ${type}`);
                break;
        }
    }
    updateAll(context) {
        // update entities
        if (this.entities.player) this.entities.player.update();
        this.entities.obstacles.forEach(entity => entity.update());
        this.entities.backgrounds.forEach(entity => entity.update());
        // detect collision
        if (this.entities.player) {
            for (const obstacle of this.entities.obstacles) {
                if (detectCollision(this.entities.player, obstacle)) {
                    hitSfx.currentTime = 0;
                    hitSfx.play();
                    gameState.gameOver = true;
                }
            }
        }
        // delete the obstacles that go off the screen
        this.entities.obstacles = this.entities.obstacles.filter(entity => !(entity.delete));
        // gradually increase the game speed
        gameState.increase();
    }

    drawAll(context) {
        this.entities.backgrounds.forEach(e => e.draw(context));
        this.entities.obstacles.forEach(e => e.draw(context));
        if (this.entities.player) this.entities.player.draw(context);
    }

    clear() {
        this.entities.obstacles = [];
        this.entities.backgrounds = [];
    }
}
