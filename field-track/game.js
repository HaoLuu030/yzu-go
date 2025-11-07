import { boardHeight, boardWidth, groundY } from "./entities/physics.js";
import { SCALE } from "./config/scale.js";
import Player from "./entities/player.js";
import EntityManager from "./entities/entityManager.js";
import SpawnerManager from "./utils/spawnerManager.js";
import { obstacleAssets, midgroundAssets } from "./config/assets.js";
import createHitBox from "./utils/hitBox.js";
import { pause, resume, gameOver, setupResetButtonEvents } from "./utils/gameFunction.js";
import { gameState } from "./config/gameState.js";


// setup
const entityManager = new EntityManager();
let context;
const spawnerManager = new SpawnerManager(entityManager, obstacleAssets, midgroundAssets);

// load frames
let playerFrames = [];

// load student image
for (let i = 0; i < 8; i++) {
    let image = new Image();
    image.src = `./img/student-${i + 1}.png`;
    playerFrames.push(image);
}
let playerJumpImg = new Image();
playerJumpImg.src = './img/student-jump.png';
// initalize a student
let playerWidth = boardWidth * SCALE.STUDENT_WIDTH_RATIO;
let playerHeight = playerWidth * SCALE.STUDENT_ASPECT_RATIO;
let playerX = boardWidth * 0.1;
let playerY = groundY - playerHeight;
let playerHitBox = createHitBox("player", playerWidth, playerHeight);
let player = new Player(playerX, playerY, playerWidth, playerHeight, 0, playerFrames, playerJumpImg, playerHitBox);

// register student
entityManager.add(player, "player")

window.onload = function () {
    let board = document.getElementById('board');
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    gameState.animationId = this.requestAnimationFrame(gameLoop);

    setupResetButtonEvents(board, context);
    // handle button clicks
    document.addEventListener('keydown', (e) => {

        switch (e.code) {
            case 'Space':
                player.jump();
                break;
            case 'KeyP':
                if (gameState.isRunning) {
                    pause();
                } else {
                    resume();
                }
                break;
            case 'KeyT':
                gameState.toggleTesting();

            default:
                break;
        }
    });

}

export function gameLoop() {
    if (gameState.gameOver){
        gameOver(context, document.getElementById("board"));
        return;
    }
    if (!gameState.isRunning) return;
    // update all entities based on real time
    spawnerManager.update();
    entityManager.updateAll();
    // clear and redraw the entire scene
    context.clearRect(0, 0, boardWidth, boardHeight);
    entityManager.drawAll(context);
    // request the next frame
    gameState.animationId =requestAnimationFrame(gameLoop);
}

export { spawnerManager, entityManager, player };