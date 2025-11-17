const ROW = 6 + 2; // board plus outer border
const COL = 8 + 2;

const board = [];

// Option B — real flag images (copy-pasteable URLs)
const icons = [
    "https://flagcdn.com/w80/tw.png",
    "https://flagcdn.com/w80/jp.png",
    "https://flagcdn.com/w80/us.png",
    "https://flagcdn.com/w80/ca.png",
    "https://flagcdn.com/w80/kr.png",
    "https://flagcdn.com/w80/vn.png",
    "https://flagcdn.com/w80/fr.png",
    "https://flagcdn.com/w80/gb.png"
];

const gameBoard = document.getElementById("board");

// Canvas for connecting line
const canvas = document.getElementById("lineCanvas");
const ctx = canvas.getContext("2d");

// NEW: Score + Timer display
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");

let first = null;

// NEW: score + timer variables
let score = 0;
let time = 0;
let timerInterval = null;

/* -------------------------
   Initialize the board
------------------------- */
function init() {
    let items = [];

    // make pairs
    for (let i = 0; i < (ROW - 2) * (COL - 2) / 2; i++) {
        items.push(icons[i % icons.length], icons[i % icons.length]);
    }

    // shuffle
    items.sort(() => Math.random() - 0.5);

    // fill board
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

    startTimer();   // NEW
}

/* -------------------------
   Timer start (NEW)
------------------------- */
function startTimer() {
    timerInterval = setInterval(() => {
        time++;
        timeDisplay.textContent = `Time: ${time}s`;
    }, 1000);
}

/* -------------------------
   Add score (NEW)
------------------------- */
function addScore(points) {
    score += points;
    scoreDisplay.textContent = `Score: ${score}`;
}

/* -------------------------
   Resize canvas
------------------------- */
function resizeCanvas() {
    const rect = gameBoard.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    canvas.style.top = rect.top + "px";
    canvas.style.left = rect.left + "px";
}

window.addEventListener("resize", resizeCanvas);

/* -------------------------
   Render the board
------------------------- */
function render() {
    gameBoard.innerHTML = "";
    gameBoard.style.gridTemplateColumns = `repeat(${COL - 2}, 60px)`;

    for (let r = 1; r < ROW - 1; r++) {
        for (let c = 1; c < COL - 1; c++) {
            const div = document.createElement("div");
            div.className = board[r][c] ? "cell" : "cell empty";
            div.dataset.r = r;
            div.dataset.c = c;

            if (board[r][c]) {
                div.innerHTML = `<img src="${board[r][c]}">`;
                div.addEventListener("click", () => select(r, c));
            }

            gameBoard.appendChild(div);
        }
    }
}

/* -------------------------
   Convert cell to canvas center
------------------------- */
function cellCenter(r, c) {
    const cells = document.getElementsByClassName("cell");
    const index = (r - 1) * (COL - 2) + (c - 1);
    const rect = cells[index].getBoundingClientRect();

    return {
        x: rect.left - canvas.getBoundingClientRect().left + rect.width / 2,
        y: rect.top - canvas.getBoundingClientRect().top + rect.height / 2
    };
}

/* -------------------------
   Draw connecting path
------------------------- */
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

/* -------------------------
   Handle tile selection
------------------------- */
function select(r, c) {
    const val = board[r][c];

    if (!first) {
        first = { r, c, val };
        highlight(r, c, true);
    } else {
        if (first.r !== r || first.c !== c) {
            if (first.val === val) {

                // find path
                const path = getPath(first, { r, c });
                if (path) {
                    board[first.r][first.c] = "";
                    board[r][c] = "";

                    const points = path.map(p => cellCenter(p.r, p.c));
                    drawPath(points);

                    // NEW: add score
                    addScore(10);

                    // delay rendering to allow animation
                    setTimeout(() => {
                        render();
                        checkGameEnd();   // NEW
                    }, 300);
                }
            }
        }
        highlight(first.r, first.c, false);
        first = null;
    }
}

/* -------------------------
   Highlight selected tile
------------------------- */
function highlight(r, c, on) {
    const idx = (r - 1) * (COL - 2) + (c - 1);
    document.getElementsByClassName("cell")[idx].classList.toggle("active", on);
}

/* -------------------------
   Check if game ended (NEW)
------------------------- */
function checkGameEnd() {
    for (let r = 1; r < ROW - 1; r++) {
        for (let c = 1; c < COL - 1; c++) {
            if (board[r][c] !== "") return;
        }
    }

    clearInterval(timerInterval);

    setTimeout(() => {
        alert(`🎉 You win!\nScore: ${score}\nTime: ${time}s`);
    }, 200);
}

/* -------------------------
   Path-finding logic
------------------------- */

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
        for (let c = Math.min(a.c, b.c) + 1; c < Math.max(a.c, b.c); c++) {
            if (board[a.r][c] !== "") return false;
        }
        return true;
    }

    if (a.c === b.c) {
        for (let r = Math.min(a.r, b.r) + 1; r < Math.max(a.r, b.r); r++) {
            if (board[r][a.c] !== "") return false;
        }
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

        if (clearLine(a, p) && clearLine(p, b)) {
            return p;
        }
    }
    return null;
}

function twoTurnPoints(a, b) {
    // search interior only (ignore border)
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

init();
