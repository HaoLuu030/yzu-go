const pegs = document.querySelectorAll('.peg');


const moveCountSpan = document.getElementById('moveCount');
const scoreSpan = document.getElementById('score');
const message = document.getElementById('message');


const placeSound = new Audio("./assets/sfx/place.mp3");

const colors = ["#8B5A2B", "#A97458", "#C19A6B", "#D2B48C"];

let numberOfDisks = 4;

// Optimal moves = 2^n − 1
const optimalMoves = Math.pow(2, numberOfDisks) - 1;

let moveCount = 0;
let score = 1000;

// Initialize game
function createGame() {
    pegs.forEach(peg => peg.innerHTML = "");

    moveCount = 0;
    score = 1000;

    moveCountSpan.textContent = "0";
    scoreSpan.textContent = "1000";
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

    if (moveCount > optimalMoves) {
        score -= 20;
        if (score < 0) score = 0;
    }

    scoreSpan.textContent = score;

    // End game when score hits 0
    if (score === 0) {
        endGame();
    }
}

function checkWin() {
    const lastPeg = pegs[2];
    if (lastPeg.childElementCount === numberOfDisks) {
        message.textContent = `You solved it! Final score: ${score}`;
    }
}

function endGame() {
    message.textContent = "Game Over — No score left!";

    // Disable dragging for all disks
    document.querySelectorAll(".disk").forEach(d => d.draggable = false);

    // Save to localStorage
    const saveData = {
        score: score,
        unlocked: true
    };
    localStorage.setItem("level_8", JSON.stringify(saveData));
}


pegs.forEach(peg => {
    peg.addEventListener("dragover", e => e.preventDefault());

    peg.addEventListener("drop", function () {
        if (!draggedDisk) return;

        const topDisk = this.lastElementChild;

        if (!topDisk || Number(draggedDisk.dataset.size) < Number(topDisk.dataset.size)) {
            this.appendChild(draggedDisk);

            // Play sound effect when disk is placed
            placeSound.currentTime = 0;
            placeSound.play();

            updateMoves();
            checkWin();
        }


        draggedDisk = null;
    });
});


createGame();
