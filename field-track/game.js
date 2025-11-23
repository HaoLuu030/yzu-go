import { boardHeight, boardWidth, groundY } from "./entities/physics.js";
import { SCALE } from "./config/scale.js";
import Player from "./entities/player.js";
import EntityManager from "./entities/entityManager.js";
import SpawnerManager from "./utils/spawnerManager.js";
import { obstacleAssets, midgroundAssets, backgroundAssets } from "./config/assets.js";
import createHitBox from "./utils/hitBox.js";
import { pause, resume, gameOver, setupResetButtonEvents } from "./utils/gameFunction.js";
import { gameState } from "./config/gameState.js";
import ScoreManager from "./utils/scoreManager.js";
import { startGame } from "./utils/gameFunction.js";


// setup
const entityManager = new EntityManager();
let context;
const spawnerManager = new SpawnerManager(entityManager, obstacleAssets, midgroundAssets, backgroundAssets);
const scoreManager = new ScoreManager("9px 'Press Start 2P', monospace", "#333", 5, 20);


// load frames
let playerFrames = [];

// load student image
for (let i = 0; i < 8; i++) {
    let image = new Image();
    image.src = `./assets/img/student-${i + 1}.png`;
    playerFrames.push(image);
}
// initalize a student
let playerWidth = boardWidth * SCALE.STUDENT_WIDTH_RATIO;
let playerHeight = playerWidth * SCALE.STUDENT_ASPECT_RATIO;
let playerX = boardWidth * 0.1;
let playerY = groundY - playerHeight;
let playerHitBox = createHitBox("player", playerWidth, playerHeight);
let player = new Player(playerX, playerY, playerWidth, playerHeight, 0, playerFrames, playerHitBox);

// register student
entityManager.add(player, "player")

window.onload = function () {
    let board = document.getElementById('board');
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    // Draw "Press Enter to Start" first frame
    // Draw "Press Space to Start" centered
    context.fillStyle = "#333";
    context.font = "18px 'Press Start 2P'";
    context.textAlign = "center";      // horizontal center
    context.textBaseline = "middle";   // vertical center
    context.fillText("PRESS SPACE TO START", boardWidth / 2, boardHeight / 2);

    setupResetButtonEvents(board, context);

    document.addEventListener('keydown', (e) => {
        if (gameState.waitingToStart && e.code === "Space") {
            startGame();
            return;
        }

        switch (e.code) {
            case 'Space':
                if (gameState.isRunning) player.jump();
                break;
            case 'KeyP':
                if (!gameState.waitingToStart) {
                    gameState.isRunning ? pause() : resume();
                }
                break;
        }
    });
};


export function gameLoop() {

    if (gameState.waitingToStart) return;

    if (gameState.gameOver) {
        gameOver(context, document.getElementById("board"));
        return;
    }

    if (!gameState.isRunning) return;

    spawnerManager.update();
    scoreManager.update();
    entityManager.updateAll();

    context.clearRect(0, 0, boardWidth, boardHeight);
    entityManager.drawAll(context);
    scoreManager.draw(context);

    gameState.animationId = requestAnimationFrame(gameLoop);
}


export { scoreManager, spawnerManager, entityManager, player };