const pegs = document.querySelectorAll('.peg');
const resetBtn = document.getElementById('resetBtn');

const moveCountSpan = document.getElementById('moveCount');
const scoreSpan = document.getElementById('score');
const message = document.getElementById('message');

const colors = ["#ff7675", "#74b9ff", "#55efc4"];
let numberOfDisks = 3;

// Optimal moves = 2^n − 1
const optimalMoves = Math.pow(2, numberOfDisks) - 1;

let moveCount = 0;
let score = 500;

// Initialize game
function createGame() {
    pegs.forEach(peg => peg.innerHTML = "");

    moveCount = 0;
    score = 500;

    moveCountSpan.textContent = "0";
    scoreSpan.textContent = "500";
    message.textContent = "";

    for (let i = numberOfDisks; i >= 1; i--) {
        const disk = document.createElement("div");
        disk.classList.add("disk");
        disk.style.width = `${40 + i * 30}px`;
        disk.style.background = colors[i - 1];
        disk.dataset.size = i;
        disk.draggable = true;
        addDragEvents(disk);
        pegs[0].appendChild(disk);
    }
}

function addDragEvents(disk) {
    disk.addEventListener("dragstart", dragStart);
}

let draggedDisk = null;

function dragStart(e) {
    draggedDisk = e.target;
}

function updateMoves() {
    moveCount++;
    moveCountSpan.textContent = moveCount;

    // Scoring rule:
    // After the 8th move (for 3-disk puzzle), subtract 20 per move
    if (moveCount > optimalMoves) {
        score -= 20;
        if (score < 0) score = 0;
        scoreSpan.textContent = score;
    }
}

function checkWin() {
    const lastPeg = pegs[2];
    if (lastPeg.childElementCount === numberOfDisks) {
        message.textContent = `You solved it! Final score: ${score}`;
    }
}

pegs.forEach(peg => {
    peg.addEventListener("dragover", e => e.preventDefault());

    peg.addEventListener("drop", function () {
        if (!draggedDisk) return;

        const topDisk = this.lastElementChild;

        if (!topDisk || Number(draggedDisk.dataset.size) < Number(topDisk.dataset.size)) {
            this.appendChild(draggedDisk);
            updateMoves();
            checkWin();
        }

        draggedDisk = null;
    });
});

resetBtn.onclick = createGame;

createGame();
