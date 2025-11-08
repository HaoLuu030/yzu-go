import Entity from "../entities/entity.js";
import { AnimatedObstacle, StaticObstacle } from "../entities/obstacle.js";
import { boardWidth, groundY, groundY1 } from "../entities/physics.js";
import { gameState } from "../config/gameState.js";
import createHitBox from "./hitBox.js";

export default class SpawnerManager {
    constructor(entityManager, obstacleAssets, midgroundAssets) {
        this.entityManager = entityManager;
        this.obstacleAssets = obstacleAssets;
        this.midgroundAssets = midgroundAssets;
        // spawn period for obstacle
        this.obstacleframeCount = 0;
        this.obstaclespawnInterval = 180; // 180
        // spawn period for midground interval
        this.midgroundFrameCount = 0;
        this.midgroundSpawnInterval = 500;
        this.lastObstacle = null;
        this.lastMidGround = null;
    }

    update() {
        this.obstacleframeCount++;
        this.midgroundFrameCount++;
        const objectInterval = this.obstaclespawnInterval / gameState.spawnRateScale;
        const midgroundInterval = this.midgroundSpawnInterval / gameState.spawnRateScale;
        if (this.obstacleframeCount >= objectInterval) {
            this.obstacleframeCount = 0;
            this.spawnObstacle();
        }

        if (this.midgroundFrameCount >= midgroundInterval) {
            this.midgroundFrameCount = 0;
            this.spawnMidgroundObject();
        }
    }

    spawnObstacle() {
        // take the type of the obstacle
        // make sure the adjacent obstacles are not the same
        let chosenType;
        do {
            chosenType = this.chooseType('obstacle');
        } while (chosenType == this.lastObstacle);
        this.lastObstacle = chosenType;
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

    spawnMidgroundObject() {
        let type;
        do {
            type = this.chooseType('midground');
        } while (type == this.lastMidGround);
        this.lastMidGround = type;
        // console.log(type);
        const config = this.midgroundAssets[type];
        const {width, height, speed, img} = config;
        const x = boardWidth + 100;
        const y = groundY1 - height;
        let object;
        object = new Entity(x, y, width, height, speed, img);
        this.entityManager.add(object, "midground");

    }


    chooseType(entity) {
        const rand = Math.random();
        let assets;
        // choose the obstacle randomly
        switch (entity) {
            case "midground":
                assets = this.midgroundAssets;
                break;
            case "obstacle":
                assets = this.obstacleAssets;
                break;
        }
        // sweep through all the obstacles in the obstacle asset file
        for (const [key, value] of Object.entries(assets)) {
            if (rand < value.probability) return key;
        }
        // fall back
        // return Object.keys(this.assets)[0];
    }

    reset() {
        this.frameCount = 0;          // start counting from zero again
        this.lastSpawnedType = null;  // allow any obstacle to spawn first
        this.spawnInterval = 180;     // reset to your default interval
    }

}