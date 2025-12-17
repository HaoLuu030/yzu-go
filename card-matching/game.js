import { triggerPostLevelStory } from "../../js/utils/progress.js";
import { saveScore } from "../../js/data/scoreRepository.js";
import { startLoader } from "../shared/loader/index.js";


startLoader({
    text: "Searching for the flags...",
    assets: [
        "../image/UI/background_card-matching.png",
        "./img/background.png"
    ]
})

/* ============================================================
   1. CONSTANTS & GLOBAL GAME STATE
============================================================ */

const ROW = 8 + 2;
const COL = 8 + 2;

const board = [];

const icons = [
    "https://flagcdn.com/w80/tw.png",
    "https://flagcdn.com/w80/jp.png",
    "https://flagcdn.com/w80/us.png",
    "https://flagcdn.com/w80/ca.png",
    "https://flagcdn.com/w80/kr.png",
    "https://flagcdn.com/w80/vn.png",
    "https://flagcdn.com/w80/fj.png",
    "https://flagcdn.com/w80/gb.png",
    "https://flagcdn.com/w80/it.png",
    "https://flagcdn.com/w80/sa.png",
    "https://flagcdn.com/w80/cz.png",
    "https://flagcdn.com/w80/np.png",
    "https://flagcdn.com/w80/ps.png",
    "https://flagcdn.com/w80/gm.png",
    "https://flagcdn.com/w80/vc.png",
    "https://flagcdn.com/w80/nl.png",
    "https://flagcdn.com/w80/mm.png",
    "https://flagcdn.com/w80/kg.png",
    "https://flagcdn.com/w80/sv.png",
    "https://flagcdn.com/w80/sk.png",
    "https://flagcdn.com/w80/fr.png",
    "https://flagcdn.com/w80/za.png",
    "https://flagcdn.com/w80/bd.png",
    "https://flagcdn.com/w80/es.png",
    "https://flagcdn.com/w80/ca.png",
    "https://flagcdn.com/w80/hn.png",
    "https://flagcdn.com/w80/tr.png",
    "https://flagcdn.com/w80/at.png",
    "https://flagcdn.com/w80/bz.png",
    "https://flagcdn.com/w80/my.png",
    "https://flagcdn.com/w80/id.png",
];

/* ============================================================
   DOM REFERENCES (FIXED NAMES)
============================================================ */

const gameBoard = document.getElementById("game-board");
const boardWrapper = document.getElementById("game-board-container");

const canvas = document.getElementById("fx-canvas");
const ctx = canvas.getContext("2d");

const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("timer");

const startOverlay = document.getElementById("start-overlay");
const endOverlay = document.getElementById("end-overlay");


const shuffleBtn = document.getElementById("shuffle-btn");
const musicBtn = document.getElementById("music-btn");
const musicIcon = document.getElementById("music-icon");
const mapBtn = document.getElementById("map-btn");

const winMessage = document.getElementById("winMessage");

/* AUDIO */
const bgm = document.getElementById("bgm");
const clickSound = document.getElementById("clickSound");
const matchSound = document.getElementById("matchSound");
const shuffleSound = document.getElementById("shuffleSound");

clickSound.volume = 0.35;
matchSound.volume = 0.45;

/* STATE */
let gameStarted = false;
let isMusicOn = false;
let bgmStarted = false;

let first = null;
let baseScore = 10;
let score = 0;
let time = 0;
let timerInterval = null;

/* ============================================================
   2. RANDOMIZATION
============================================================ */

function getRandomIconSet(count) {
    return [...icons].sort(() => Math.random() - 0.5).slice(0, count);
}

/* ============================================================
   3. GAME INITIALIZATION
============================================================ */

function init() {
    const items = [];
    const gameIcons = getRandomIconSet(12);
    const PAIRS = ((ROW - 2) * (COL - 2)) / 2;

    for (let i = 0; i < PAIRS; i++) {
        items.push(
            gameIcons[i % gameIcons.length],
            gameIcons[i % gameIcons.length]
        );
    }

    items.sort(() => Math.random() - 0.5);

    for (let r = 0; r < ROW; r++) {
        board[r] = [];
        for (let c = 0; c < COL; c++) {
            board[r][c] =
                (r === 0 || r === ROW - 1 || c === 0 || c === COL - 1)
                    ? ""
                    : items.pop();
        }
    }

    render();
    resizeCanvas();
}

/* ============================================================
   4. RENDERING
============================================================ */

function render() {
    gameBoard.innerHTML = "";
    gameBoard.style.gridTemplateColumns = `repeat(${COL - 2}, 60px)`;

    for (let r = 1; r < ROW - 1; r++) {
        for (let c = 1; c < COL - 1; c++) {
            const div = document.createElement("div");
            div.className = board[r][c] ? "cell" : "cell empty";

            if (board[r][c]) {
                div.innerHTML = `<img src="${board[r][c]}">`;
                div.addEventListener("click", () => select(r, c));
            }
            gameBoard.appendChild(div);
        }
    }
}

function resizeCanvas() {
    const rect = boardWrapper.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
}

window.addEventListener("resize", resizeCanvas);

function cellCenter(r, c) {
    const cells = document.getElementsByClassName("cell");
    const index = (r - 1) * (COL - 2) + (c - 1);
    const rect = cells[index].getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();

    return {
        x: rect.left - canvasRect.left + rect.width / 2,
        y: rect.top - canvasRect.top + rect.height / 2
    };
}


function drawPath(points) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#00e5ff";
    ctx.shadowColor = "#00bcd4";
    ctx.shadowBlur = 10;

    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
    ctx.stroke();

    setTimeout(() => ctx.clearRect(0, 0, canvas.width, canvas.height), 300);
}

/* ============================================================
   5. INPUT
============================================================ */

function select(r, c) {
    if (!gameStarted) return;

    playClickSound();

    if (!bgmStarted && isMusicOn) {
        bgm.play();
        bgmStarted = true;
    }

    const val = board[r][c];

    if (!first) {
        first = { r, c, val };
        highlight(r, c, true);
        return;
    }

    if ((first.r !== r || first.c !== c) && first.val === val) {
        const path = getPath(first, { r, c });
        if (path) {
            board[first.r][first.c] = "";
            board[r][c] = "";

            playMatchSound();
            drawPath(path.map(p => cellCenter(p.r, p.c)));
            addScore(baseScore);

            setTimeout(() => {
                render();
                if (!checkGameEnd() && !hasAnyMovesLeft()) {
                    alert("⚠️ No moves left! Shuffling board.");
                    shuffleBoard();
                    render();
                }
            }, 300);
        }
    }

    highlight(first.r, first.c, false);
    first = null;
}

function highlight(r, c, on) {
    const idx = (r - 1) * (COL - 2) + (c - 1);
    document.getElementsByClassName("cell")[idx]
        .classList.toggle("active", on);
}

/* ============================================================
   6. PATHFINDING
============================================================ */

function inBounds(p) {
    return p.r > 0 && p.r < ROW - 1 && p.c > 0 && p.c < COL - 1;
}

function getPath(a, b) {
    if (clearLine(a, b)) return [a, b];

    const p = oneTurnPoint(a, b);
    if (p) return [a, p, b];

    const pts = twoTurnPoints(a, b);
    if (pts) return [a, pts[0], pts[1], b];

    return null;
}

function clearLine(a, b) {
    if (!inBounds(a) || !inBounds(b)) return false;

    if (a.r === b.r) {
        for (let c = Math.min(a.c, b.c) + 1; c < Math.max(a.c, b.c); c++)
            if (board[a.r][c]) return false;
        return true;
    }

    if (a.c === b.c) {
        for (let r = Math.min(a.r, b.r) + 1; r < Math.max(a.r, b.r); r++)
            if (board[r][a.c]) return false;
        return true;
    }
    return false;
}

function oneTurnPoint(a, b) {
    const points = [
        { r: a.r, c: b.c },
        { r: b.r, c: a.c }
    ];

    for (const p of points) {
        if (!inBounds(p)) continue;
        if (board[p.r][p.c]) continue;
        if (clearLine(a, p) && clearLine(p, b)) return p;
    }
    return null;
}

function twoTurnPoints(a, b) {
    for (let r = 1; r < ROW - 1; r++) {
        for (let c = 1; c < COL - 1; c++) {
            if (board[r][c]) continue;
            const p = { r, c };
            if (!clearLine(a, p)) continue;
            const corner = oneTurnPoint(p, b);
            if (corner) return [p, corner];
        }
    }
    return null;
}

/* ============================================================
   7. SCORE & TIMER
============================================================ */

function startTimer() {
    timerInterval = setInterval(() => {
        time++;
        timeDisplay.textContent = time;
        if (time % 30 === 0 && baseScore > 2) baseScore -= 2;
    }, 1000);
}

function addScore(points) {
    score += points;
    scoreDisplay.textContent = score;
}

/* ============================================================
   8. BOARD UTILITIES
============================================================ */

function shuffleBoard() {
    const tiles = [];
    for (let r = 1; r < ROW - 1; r++)
        for (let c = 1; c < COL - 1; c++)
            if (board[r][c]) tiles.push(board[r][c]);

    tiles.sort(() => Math.random() - 0.5);

    let i = 0;
    for (let r = 1; r < ROW - 1; r++)
        for (let c = 1; c < COL - 1; c++)
            if (board[r][c]) board[r][c] = tiles[i++];
}


/* ============================================================
   9. GAME END
============================================================ */

function hasAnyMovesLeft() {
    for (let r1 = 1; r1 < ROW - 1; r1++)
        for (let c1 = 1; c1 < COL - 1; c1++)
            for (let r2 = 1; r2 < ROW - 1; r2++)
                for (let c2 = 1; c2 < COL - 1; c2++)
                    if (
                        board[r1][c1] &&
                        board[r1][c1] === board[r2][c2] &&
                        !(r1 === r2 && c1 === c2) &&
                        getPath({ r: r1, c: c1 }, { r: r2, c: c2 })
                    ) return true;
    return false;
}

async function checkGameEnd() {
    const gameOverOverlay = document.getElementById("gameover-overlay");
    for (let r = 1; r < ROW - 1; r++)
        for (let c = 1; c < COL - 1; c++)
            if (board[r][c]) return false;

     console.log("saving score");

    // =========================
    // 1️. SAVE SCORE (unchanged)
    // =========================
    const levelKey = "level3";
    await saveScore({ level: levelKey, score });

    // =========================
    // 2️. SAVE LEVEL PROGRESS
    // =========================
    localStorage.setItem(levelKey, JSON.stringify({
        unlocked: true,
        completed: true
    }));

    const nextLevel = "level4";
    localStorage.setItem(nextLevel, JSON.stringify({ unlocked: true }));

    // =========================
    // 3️. TRIGGER STORY (NEW)
    // =========================
    triggerPostLevelStory(levelKey, score);
    

    clearInterval(timerInterval);
    gameOverOverlay.style.display = "flex";

    return true;

}

/* ============================================================
   10. EVENTS
============================================================ */

function updateMusicIcon() {
    musicIcon.src = isMusicOn
        ? "../image/UI/volume_on.png"
        : "../image/UI/volume_off.png";
    console.log(isMusicOn);
}

musicBtn.onclick = () => {
    isMusicOn = !isMusicOn;

    if (isMusicOn) fadeInMusic();
    else fadeOutMusic();

    updateMusicIcon();
};


startOverlay.onclick = () => {
    startOverlay.style.display = "none";

    if (!gameStarted) {
        gameStarted = true;
        startTimer();
    }

    if (!isMusicOn) {
        isMusicOn = true;
        updateMusicIcon();
        fadeInMusic();
    }
};



shuffleBtn.onclick = () => {
    if (score >= 20) {
        shuffleBoard();
        render();
        playShuffleSound();
        score -= 20;
        scoreDisplay.textContent = score;
    }

};

mapBtn.onclick = () => window.location.href = "../map/index.html";

/* ============================================================
   AUDIO HELPERS
============================================================ */


function fadeInMusic() {
    bgm.volume = 0;
    bgm.play();
    const fade = setInterval(() => {
        bgm.volume += 0.02;
        if (bgm.volume >= 0.4) clearInterval(fade);
    }, 50);
}

function fadeOutMusic() {
    const fade = setInterval(() => {
        bgm.volume -= 0.02;
        if (bgm.volume <= 0) {
            bgm.pause();
            clearInterval(fade);
        }
    }, 50);
}

function playClickSound() { clickSound.currentTime = 0; clickSound.play(); }
function playMatchSound() { matchSound.currentTime = 0; matchSound.play(); }
function playShuffleSound() { shuffleSound.currentTime = 0; shuffleSound.play(); }

/* ============================================================
   BOOT
============================================================ */

init();


// ===== BACK TO MAP =====
document.getElementById("back-to-map").onclick = function () {
    window.location.href = "../map/index.html";
};