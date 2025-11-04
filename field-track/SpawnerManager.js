import { AnimatedObstacle, StaticObstacle } from "./entities/obstacle.js";
import { boardWidth, groundY } from "./entities/physics.js";
import { gameState } from "./config/gameState.js";
import createHitBox from "./utils/hitBox.js";

export default class SpawnerManager {
    constructor(entityManager, obstacleAssets) {
        this.entityManager = entityManager;
        this.obstacleAssets = obstacleAssets;
        this.frameCount = 0;
        this.spawnInterval = 180; // 180
        this.lastSpawnedType = null;
    }

    update() {
        this.frameCount++;
        const currentInterval = this.spawnInterval / gameState.spawnRateScale;
        if (this.frameCount >= currentInterval) {
            this.frameCount = 0;
            this.spawnObstacle();
        }
    }

    spawnObstacle() {
        // take the type of the obstacle
        // make sure the adjacent obstacles are not the same
        let chosenType;
        do {
            chosenType = this.chooseObstacleType();
        } while (chosenType == this.lastSpawnedType);
        this.lastSpawnedType = chosenType;
        // chosenType = this.chooseObstacleType();
        const config = this.obstacleAssets[chosenType];

        // set width, height, and position for the obstacles
        const { width, height, speed } = config;
        const x = boardWidth + 50;
        const y = groundY - height;

        // console.log(`type: ${chosenType}`);

        // create hit box
        const hitbox = createHitBox(chosenType, width, height);

        let obstacle;
        if (config.isAnimated) {
            // console.log(`passing hitbox for a static obstacle`);
            // console.log(hitbox);
            obstacle = new AnimatedObstacle(x, y, width, height, speed, config.frames, hitbox);
        } else {
            obstacle = new StaticObstacle(x, y, width, height, speed, config.img, hitbox);
            // console.log(`passing hitbox for a dynamic obstacle`);
            // console.log(hitbox);
        }

        this.entityManager.add(obstacle, "obstacle");
    }

    chooseObstacleType() {
        const rand = Math.random();

        // choose the obstacle randomly
        // sweep through all the obstacles in the obstacle asset file
        for (const [key, value] of Object.entries(this.obstacleAssets)) {
            if (rand < value.probability) return key;
        }
        // fall back
        return Object.keys(this.obstacleAssets)[0];
    }

    reset() {
        this.frameCount = 0;          // start counting from zero again
        this.lastSpawnedType = null;  // allow any obstacle to spawn first
        this.spawnInterval = 180;     // reset to your default interval
    }

}