import { boardHeight, boardWidth, groundY } from "./entities/physics.js";
import { SCALE } from "./config/scale.js";
import Player from "./entities/player.js";
import EntityManager from "./entities/entityManager.js";
import SpawnerManager from "./utils/spawnerManager.js";
import { obstacleAssets, backgroundAssets } from "./config/assets.js";
import createHitBox from "./utils/hitBox.js";
import { pause, resume, gameOver, startGame } from "./utils/gameFunction.js";
import { gameState } from "./config/gameState.js";
import ScoreManager from "./utils/scoreManager.js";
import { startLoader } from "../shared/loader/assetLoader/index.js";
import { FIELD_TRACK_GAMEKEY } from "../js/data/gamekeys.js";
import { saveGame } from "../js/data/scoreRepository.js";
import { triggerPostLevelStory } from "../js/utils/progress.js";
import { startSaveLoader } from "../shared/loader/saveLoader/index.js";




const loaderPromise = startLoader({
    text: "Getting into position",
    assets: [
        "./assets/img/backdrop.png",
        "./assets/img/background.png",
        "./assets/img/basket-ball.png",
        "./assets/img/cloud-1.png",
        "./assets/img/cloud-2.png",
        "./assets/img/cloud-3.png",
        "./assets/img/cloud-4.png",
        "./assets/img/cloud-5.png",
        "./assets/img/cloud-6.png",
        "./assets/img/cloud-8.png",
        "./assets/img/cone.png",
        "./assets/img/corgi-1.png",
        "./assets/img/corgi-2.png",
        "./assets/img/corgi-3.png",
        "./assets/img/corgi-4.png",
        "./assets/img/corgi-5.png",
        "./assets/img/corgi-6.png",
        "./assets/img/cycling-man-1.png",
        "./assets/img/cycling-man-2.png",
        "./assets/img/cycling-man-3.png",
        "./assets/img/cycling-man-4.png",
        "./assets/img/cycling-man-5.png",
        "./assets/img/cycling-man-6.png",
        "./assets/img/dave-1.png",
        "./assets/img/dave-2.png",
        "./assets/img/dave-3.png",
        "./assets/img/dave-4.png",
        "./assets/img/dave-5.png",
        "./assets/img/dave-6.png",
        "./assets/img/game-over.png",
        "./assets/img/hurdle.png",
        "./assets/img/john-1.png",
        "./assets/img/john-2.png",
        "./assets/img/john-3.png",
        "./assets/img/john-4.png",
        "./assets/img/john-5.png",
        "./assets/img/john-6.png",
        "./assets/img/reset.png",
        "./assets/img/shiba-1.png",
        "./assets/img/shiba-2.png",
        "./assets/img/shiba-3.png",
        "./assets/img/shiba-4.png",
        "./assets/img/shiba-5.png",
        "./assets/img/shiba-6.png",
        "./assets/img/student-1.png",
        "./assets/img/student-2.png",
        "./assets/img/student-3.png",
        "./assets/img/student-4.png",
        "./assets/img/student-5.png",
        "./assets/img/student-6.png",
        "./assets/img/student-7.png",
        "./assets/img/student-8.png",
        "./assets/img/student-cry.png",
        "./assets/img/student-jump.png",
        "./assets/img/volley-ball.png",
        "../image/UI/sunFish.gif",
        "./assets/sfx/background-music.mp3",
        "./assets/sfx/collide.mp3",
        "./assets/sfx/jump.mp3",
        "./assets/sfx/mile-stone-sound.mp3",
        "../image/UI/background_fieldTrack.png"
    ]
})


// setup
const entityManager = new EntityManager();
let context;
const spawnerManager = new SpawnerManager(entityManager, obstacleAssets, backgroundAssets);
const scoreManager = new ScoreManager("9px 'Press Start 2P', monospace", "#333", 5, 20);

const bgm = new Audio("./assets/sfx/background-music.mp3");
bgm.loop = true;
bgm.playbackRate = 1.0;

let stopwatchInterval = null;
let lastTickTime = null;

let bgmStarted = false;
let isMuted = false;

const levelKey = "level2";
const nextLevel = "level3";
let finalScore = 0;


// load frames
let playerFrames = [];
for (let i = 0; i < 8; i++) {
    let image = new Image();
    image.src = `./assets/img/student-${i + 1}.png`;
    playerFrames.push(image);
}

// initialize player
let playerWidth = boardWidth * SCALE.STUDENT_WIDTH_RATIO;
let playerHeight = playerWidth * SCALE.STUDENT_ASPECT_RATIO;
let playerX = boardWidth * 0.1;
let playerY = groundY - playerHeight;
let playerHitBox = createHitBox("player", playerWidth, playerHeight);

let player = new Player(playerX, playerY, playerWidth, playerHeight, 0, playerFrames, playerHitBox);
entityManager.add(player, "player");

document.addEventListener("DOMContentLoaded", async () => {

    await loaderPromise;

    let board = document.getElementById('board');
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    context.fillStyle = "#333";
    await document.fonts.load("18px 'Press Start 2P'");
    context.font = "18px 'Press Start 2P'";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("PRESS SPACE TO START", boardWidth / 2, boardHeight / 2);


    // --------------------------------------------
    // FIXED MUSIC BUTTON
    // --------------------------------------------
    const musicBtn = document.getElementById("music-btn");
    const musicIcon = document.getElementById("music-icon");

    // prevent spacebar activating the button
    musicBtn.addEventListener("keydown", (e) => {
        if (e.code === "Space") e.preventDefault();
    });

    musicBtn.addEventListener("click", () => {

        // ❌ if game hasn't started → do nothing
        if (gameState.waitingToStart) return;

        // Start music only one time
        if (!bgmStarted) {
            bgm.play();
            bgmStarted = true;
        }

        // Toggle mute
        isMuted = !isMuted;
        bgm.muted = isMuted;

        // Update icon
        musicIcon.src = isMuted
            ? "images/UI/volume_off.png"
            : "images/UI/volume_on.png";
    });


    // --------------------------------------------
    // KEYBOARD CONTROLS
    // --------------------------------------------
    document.addEventListener('keydown', (e) => {

        // First SPACE to start game
        if (gameState.waitingToStart && e.code === "Space") {

            // Start background music only once
            if (!bgmStarted) {
                bgm.play();
                bgmStarted = true;
            }

            // Keep muted state
            bgm.muted = isMuted;

            // update icon
            musicIcon.src = isMuted
                ? "images/UI/volume_off.png"
                : "images/UI/volume_on.png";

            startGame();
            return;
        }

        // normal gameplay keys
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
});



// --------------------------------------------
// GAME LOOP
// --------------------------------------------
export async function gameLoop() {

    if (gameState.waitingToStart) return;

    // game over
    if (gameState.gameOver) {
        clearInterval(stopwatchInterval);
        gameOver(context, document.getElementById("board"));
        finalScore = Math.floor(gameState.score);
        // save score

        await startSaveLoader(
            async () => {
                await saveGame({
                    gameKey: FIELD_TRACK_GAMEKEY,
                    levelId: levelKey,
                    score: finalScore,
                    completed: true
                }); // your async function
            },
            { text: "Getting up from the fall..." }
        );


        const overlay = document.getElementById("gameover-overlay");
        if (overlay) overlay.style.display = 'flex';

        return;
    }

    if (!gameState.isRunning) return;

    spawnerManager.update();
    scoreManager.update();
    entityManager.updateAll();

    // dynamic music speed
    const minRate = 1.0;
    const maxRate = 2.0;
    bgm.playbackRate = Math.min(
        maxRate,
        minRate + (gameState.speedScale - 1) * 0.1
    );

    context.clearRect(0, 0, boardWidth, boardHeight);
    entityManager.drawAll(context);
    scoreManager.draw(context);

    gameState.animationId = requestAnimationFrame(gameLoop);
}



// --------------------------------------------
// STOPWATCH
// --------------------------------------------
export function startStopwatch() {
    const timerEl = document.getElementById("timer");
    if (!timerEl) return;

    clearInterval(stopwatchInterval);
    gameState.timeElapsed = 0;
    timerEl.textContent = "0";

    lastTickTime = performance.now();

    stopwatchInterval = setInterval(() => {
        const now = performance.now();

        if (now - lastTickTime >= 1000) {
            gameState.timeElapsed++;
            timerEl.textContent = gameState.timeElapsed;
            lastTickTime = now;
        }
    }, 50);
}

// ===== BACK TO MAP =====
document.getElementById("back-to-map").onclick = function () {
    finalScore = Math.floor(gameState.score);
    // queue post-level story
    triggerPostLevelStory(levelKey, score);
    window.location.href = "../map/index.html";
};


export { scoreManager, spawnerManager, entityManager, player };
