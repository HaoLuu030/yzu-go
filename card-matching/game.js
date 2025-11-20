/* ============================================================
   1. CONSTANTS & GLOBAL GAME STATE
============================================================ */

const ROW = 8 + 2;
const COL = 15 + 2;

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

const gameBoard = document.getElementById("board");
const canvas = document.getElementById("lineCanvas");
const ctx = canvas.getContext("2d");

const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");

// ⭐ ADDED FOR BGM
const bgm = document.getElementById("bgm");
const musicToggle = document.getElementById("musicToggle");
let isMusicOn = false;
let bgmStarted = false;

// click sound
const clickSound = document.getElementById("clickSound");
clickSound.volume = 0.35;   // adjust volume here

// match sound
const matchSound = document.getElementById("matchSound");
matchSound.volume = 0.45; // adjust volume to taste

let first = null;

let baseScore = 10;
let score = 0;
let time = 0;
let timerInterval = null;


/* ============================================================
   2. RANDOMIZATION HELPERS
============================================================ */

function getRandomIconSet(count) {
    const shuffled = [...icons].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}


/* ============================================================
   3. GAME INITIALIZATION
============================================================ */

function init() {
    let items = [];

    const gameIcons = getRandomIconSet(12);
    const PAIR_COUNT = ((ROW - 2) * (COL - 2)) / 2;

    for (let i = 0; i < PAIR_COUNT; i++) {
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
    startTimer();
}


/* ============================================================
   4. RENDERING SYSTEM
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
    const rect = gameBoard.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    canvas.style.top = `${rect.top}px`;
    canvas.style.left = `${rect.left}px`;
}

window.addEventListener("resize", resizeCanvas);


function cellCenter(r, c) {
    const cells = document.getElementsByClassName("cell");
    const index = (r - 1) * (COL - 2) + (c - 1);
    const rect = cells[index].getBoundingClientRect();

    return {
        x: rect.left - canvas.getBoundingClientRect().left + rect.width / 2,
        y: rect.top - canvas.getBoundingClientRect().top + rect.height / 2
    };
}

function drawPath(points) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }

    ctx.stroke();

    setTimeout(() => ctx.clearRect(0, 0, canvas.width, canvas.height), 300);
}


/* ============================================================
   5. INPUT HANDLING (CLICK LOGIC)
============================================================ */

function select(r, c) {

     playClickSound();

    // ⭐ ADDED FOR BGM — play music on first interaction
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

    if (first.r !== r || first.c !== c) {

        if (first.val === val) {
            const path = getPath(first, { r, c });

            if (path) {
                board[first.r][first.c] = "";
                board[r][c] = "";

                playMatchSound();

                drawPath(path.map(p => cellCenter(p.r, p.c)));
                addScore(baseScore);

                setTimeout(() => {
                    render();

                    if (checkGameEnd()) return;

                    if (!hasAnyMovesLeft()) {
                        alert("⚠️ No moves left! The board will shuffle.");
                        shuffleBoard();
                        render();
                    }

                }, 300);
            }
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
   6. PATHFINDING (CLEARLINE, L-TURN, Z-TURN)
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
            if (board[a.r][c] !== "") return false;
        return true;
    }

    if (a.c === b.c) {
        for (let r = Math.min(a.r, b.r) + 1; r < Math.max(a.r, b.r); r++)
            if (board[r][a.c] !== "") return false;
        return true;
    }

    return false;
}

function oneTurnPoint(a, b) {
    const candidates = [
        { r: a.r, c: b.c },
        { r: b.r, c: a.c }
    ];

    for (const p of candidates) {
        if (!inBounds(p)) continue;
        if (board[p.r][p.c] !== "") continue;
        if (clearLine(a, p) && clearLine(p, b)) return p;
    }

    return null;
}

function twoTurnPoints(a, b) {
    for (let r = 1; r < ROW - 1; r++) {
        for (let c = 1; c < COL - 1; c++) {

            if (board[r][c] !== "") continue;

            const p = { r, c };

            if (!clearLine(a, p)) continue;

            const corner = oneTurnPoint(p, b);
            if (corner) return [p, corner];
        }
    }
    return null;
}


/* ============================================================
   7. SCORE & TIMER SYSTEM
============================================================ */

function startTimer() {
    timerInterval = setInterval(() => {
        time++;
        timeDisplay.textContent = `Time: ${time}s`;

        if (time % 30 === 0 && baseScore > 2) {
            baseScore -= 2;
        }

    }, 1000);
}

function addScore(points) {
    score += points;
    scoreDisplay.textContent = `Score: ${score}`;
}


/* ============================================================
   8. BOARD UTILITIES (RESET, SHUFFLE)
============================================================ */

function shuffleBoard() {
    let tiles = [];

    for (let r = 1; r < ROW - 1; r++)
        for (let c = 1; c < COL - 1; c++)
            if (board[r][c] !== "") tiles.push(board[r][c]);

    tiles.sort(() => Math.random() - 0.5);

    let i = 0;
    for (let r = 1; r < ROW - 1; r++)
        for (let c = 1; c < COL - 1; c++)
            if (board[r][c] !== "") board[r][c] = tiles[i++];
}


function resetGame() {
    localStorage.setItem("flagMatching_score", score);
    localStorage.setItem("flagMatching_time", time);

    clearInterval(timerInterval);

    score = 0;
    time = 0;
    baseScore = 10;
    scoreDisplay.textContent = "Score: 0";
    timeDisplay.textContent = "Time: 0s";

    init();
}


/* ============================================================
   9. MOVE DETECTION (DEAD BOARD / GAME END)
============================================================ */

function canConnect(a, b) {
    return getPath(a, b) !== null;
}

function hasAnyMovesLeft() {
    for (let r1 = 1; r1 < ROW - 1; r1++) {
        for (let c1 = 1; c1 < COL - 1; c1++) {

            if (!board[r1][c1]) continue;

            for (let r2 = 1; r2 < ROW - 1; r2++) {
                for (let c2 = 1; c2 < COL - 1; c2++) {

                    if (!board[r2][c2]) continue;
                    if (r1 === r2 && c1 === c2) continue;
                    if (board[r1][c1] !== board[r2][c2]) continue;

                    if (canConnect({ r: r1, c: c1 }, { r: r2, c: c2 }))
                        return true;
                }
            }
        }
    }
    return false;
}


function checkGameEnd() {
    for (let r = 1; r < ROW - 1; r++)
        for (let c = 1; c < COL - 1; c++)
            if (board[r][c] !== "") return false;

    clearInterval(timerInterval);
    setTimeout(() => {
        alert(`🎉 You win!\nScore: ${score}\nTime: ${time}s`);
    }, 200);

    return true;
}


/* ============================================================
   10. EVENT LISTENERS & GAME START
============================================================ */

/* ============================================================
   MUSIC SYSTEM — Smooth Fade In / Fade Out
============================================================ */

musicToggle.addEventListener("click", () => {
    if (!isMusicOn) {
        isMusicOn = true;
        musicToggle.textContent = "🔈 Music Off";
        fadeInMusic();
    } else {
        isMusicOn = false;
        musicToggle.textContent = "🔊 Music On";
        fadeOutMusic();
    }
});

function fadeInMusic() {
    bgm.volume = 0;
    bgm.play();

    let target = 0.4;         // final volume
    let duration = 1500;      // 1.5 seconds
    let step = target / (duration / 50);

    let fade = setInterval(() => {
        if (!isMusicOn) { 
            clearInterval(fade);
            return;
        }

        bgm.volume = Math.min(target, bgm.volume + step);

        if (bgm.volume >= target) {
            clearInterval(fade);
        }
    }, 50);
}

function fadeOutMusic() {
    let duration = 1000;      // 1 second
    let step = bgm.volume / (duration / 50);

    let fade = setInterval(() => {
        bgm.volume = Math.max(0, bgm.volume - step);

        if (bgm.volume <= 0) {
            clearInterval(fade);
            bgm.pause();
        }
    }, 50);
}

function playClickSound() {
    clickSound.currentTime = 0; // rewind to avoid stacking
    clickSound.play();
}

function playMatchSound() {
    matchSound.currentTime = 0;
    matchSound.play();
}




document.getElementById("resetBtn").addEventListener("click", resetGame);

init();
