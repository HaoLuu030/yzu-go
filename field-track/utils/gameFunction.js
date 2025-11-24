import { gameState } from "../config/gameState.js";
import { gameLoop } from "../game.js";
import { SCALE } from "../config/scale.js";
import { boardHeight, boardWidth } from "../entities/physics.js";
import { scoreManager, entityManager, spawnerManager, player } from "../game.js";

export function pause() {
    gameState.isRunning = false;
    cancelAnimationFrame(gameState.animationId);
}

export function resume() {
    if (!gameState.isRunning) {
        gameState.isRunning = true;
        gameState.animationId = requestAnimationFrame(gameLoop);
    }
}

export function gameOver(context, board) {
    cancelAnimationFrame(gameState.animationId);

    // show dead player
    player.isDead = true;

    // clear and draw static frame
    context.clearRect(0, 0, boardWidth, boardHeight);
    entityManager.drawAll(context);
    scoreManager.draw(context);

    // draw game over image
    const gameOverImg = new Image();
    gameOverImg.src = '../assets/img/game-over.png';

    gameOverImg.onload = () => {
        const gameOverImgWidth = boardWidth * SCALE.GAME_OVER_WIDTH_RATIO;
        const gameOverImgHeight = gameOverImgWidth * SCALE.GAME_OVER_ASPECT_RATIO;
        const gameOverImgX = (boardWidth - gameOverImgWidth) / 2;
        const gameOverImgY = (boardHeight - gameOverImgHeight) / 2;

        context.drawImage(
            gameOverImg,
            gameOverImgX,
            gameOverImgY,
            gameOverImgWidth,
            gameOverImgHeight
        );
    };
}

export function startGame() {
    gameState.waitingToStart = false;
    gameState.isRunning = true;
    gameState.animationId = requestAnimationFrame(gameLoop);
}
