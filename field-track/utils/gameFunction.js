import { gameState } from "../config/gameState.js";
import { gameLoop } from "../game.js";
import { SCALE } from "../config/scale.js";
import { boardHeight, boardWidth } from "../entities/physics.js";
import { scoreManager, entityManager, spawnerManager, player } from "../game.js";


// store reset button state for handling clicking and hovering
const resetButton = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    isHovered: false,
    visible: false,
    image: new Image()
};



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
    // stop the game loop
    cancelAnimationFrame(gameState.animationId);

    // player cry
    player.isDead = true;
    // clear the board
    context.clearRect(0, 0, boardWidth, boardHeight);
    entityManager.drawAll(context);
    scoreManager.draw(context);


    // game over image
    const gameOverImg = new Image();
    gameOverImg.src = '../assets/img/game-over.png';


    gameOverImg.onload = () => {
        const gameOverImgWidth = boardWidth * SCALE.GAME_OVER_WIDTH_RATIO;
        const gameOverImgHeight = gameOverImgWidth * SCALE.GAME_OVER_ASPECT_RATIO;
        const gameOverImgX = (boardWidth - gameOverImgWidth) / 2;
        const gameOverImgY = (boardHeight - gameOverImgHeight) / 2;

        context.drawImage(gameOverImg, gameOverImgX, gameOverImgY, gameOverImgWidth, gameOverImgHeight);


        // draw reset button after game over image has loadedt
        drawResetButton(context, gameOverImgHeight + gameOverImgY + boardHeight * 0.05);
    }
}

function restartGame() {
    gameState.gameOver = false;
    gameState.isRunning = true;
    entityManager.clear(); // clear all obstacles
    spawnerManager.reset(); // reset spawn timers
    player.reset();
    gameState.reset();
    gameState.animationId = requestAnimationFrame(gameLoop);
}



function drawResetButton(context, resetY) {
    const resetImg = resetButton.image;
    resetImg.src = "../assets/img/reset.png";

    resetImg.onload = () => {
        resetButton.width = boardWidth * SCALE.RESET_BUTTON_WIDTH_RATIO;
        resetButton.height = resetButton.width * SCALE.RESET_BUTTON_ASPECT_RATIO;
        resetButton.x = (boardWidth - resetButton.width) / 2;
        resetButton.y = resetY;
        resetButton.visible = true;

        context.drawImage(resetImg, resetButton.x, resetButton.y, resetButton.width, resetButton.height);
    }
}

// attach hover + click listeners once

export function setupResetButtonEvents(board, context) {
    board.addEventListener("mousemove", (e) => {
        if (!resetButton.visible) return;

        // get the coordinate of the mouse on the board
        const rect = board.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const hovered = mouseX >= resetButton.x &&
            mouseX <= resetButton.x + resetButton.width &&
            mouseY <= resetButton.y + resetButton.height &&
            mouseY >= resetButton.y;
    });


    // listen for clicking on the board
    board.addEventListener("click", (e) => {
        if (!resetButton.visible) return;

        const rect = board.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const inSideReset = mouseX >= resetButton.x &&
            mouseX <= resetButton.x + resetButton.width &&
            mouseY <= resetButton.y + resetButton.height &&
            mouseY >= resetButton.y;

        if (inSideReset) {
            resetButton.visible = false;
            restartGame();
        }
    });
}