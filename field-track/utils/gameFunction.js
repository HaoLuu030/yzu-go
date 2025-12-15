import { gameState } from "../config/gameState.js";
import { gameLoop } from "../game.js";
import { SCALE } from "../config/scale.js";
import { boardHeight, boardWidth } from "../entities/physics.js";
import { scoreManager, entityManager, player } from "../game.js";
import { startStopwatch } from "../game.js";

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

export function gameOver(context) {
    cancelAnimationFrame(gameState.animationId);

    // show dead player
    player.isDead = true;

    // draw final frame
    context.clearRect(0, 0, boardWidth, boardHeight);
    entityManager.drawAll(context);
    scoreManager.draw(context);

    // progression hook
    const levelKey = "level2";
    const finalScore = gameState.score;

    // mark level complete
    localStorage.setItem(levelKey, JSON.stringify({
        unlocked: true,
        completed: true
    }))

    // unlock next level

    localStorage.setItem("level3", JSON.stringify({
        unlocked: true
    }))

    // queue post-level story

    localStorage.setItem("pendingStory", JSON.stringify({
        phase: "postLevel",
        level: levelKey,
        score: finalScore
    }));

    // draw game over image
    const gameOverImg = new Image();
    gameOverImg.src = './assets/img/game-over.png';

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
    gameState.timeElapsed = 0;
    startStopwatch();
    gameState.waitingToStart = false;
    gameState.isRunning = true;
    gameState.animationId = requestAnimationFrame(gameLoop);

    document.getElementById("gameover-overlay").style.display = "none";
}
