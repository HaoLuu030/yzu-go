const pegs = document.querySelectorAll('.peg');


const moveCountSpan = document.getElementById('moveCount');
const scoreSpan = document.getElementById('score');
const startOverlay = document.getElementById("overlay");
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
        disk.style.height = "5vh";
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
    const disk = e.target;
    const peg = disk.parentElement;

    if (peg.lastElementChild !== disk) {
        e.preventDefault();
        draggedDisk = null;
        return;
    }


    draggedDisk = disk;

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
        document.getElementById("gameover-overlay").style.display="flex";
    }
}

function checkWin() {
    const lastPeg = pegs[2];
    if (lastPeg.childElementCount === numberOfDisks) {
        document.getElementById("gameover-overlay").style.display="flex";
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

window.onload = function () {

    // ==== DOM ELEMENTS ====
    const bgm = document.getElementById("bgm");
    const musicBtn = document.getElementById("music-btn");
    const startOverlay = document.getElementById("overlay");
    const gameOverOverlay = document.getElementById("gameover-overlay");

    // ==== STATE ====
    let musicOn = false;

    // ===== MUSIC TOGGLE BUTTON =====
    musicBtn.onclick = function () {
        if (musicOn) {
            fadeOutMusic(bgm);
            document.getElementById("music-icon").src = "../image/UI/volume_off.png";
            musicOn = false;
        } else {
            fadeInMusic(bgm);
            document.getElementById("music-icon").src = "../image/UI/volume_on.png";
            musicOn = true;
        }
    };


    // ===== START OVERLAY CLICK =====
    startOverlay.onclick = function () {

        // hide start overlay
        startOverlay.style.display = "none";

        // auto play music on start
        if (!musicOn) {
            fadeInMusic(bgm);
            document.getElementById("music-icon").src = "../image/UI/volume_on.png";
            musicOn = true;
        }

    };


    // ===== BACK TO MAP =====
    document.getElementById("back-to-map").onclick = function () {
        console.log("going back to map");
        window.location.href = "../map/map.html";
    };
};

function fadeInMusic(bgm, targetVolume = 0.6) {
    bgm.volume = 0;
    bgm.play();

    let v = 0;
    const fade = setInterval(() => {
        v += 0.02;
        if (v >= targetVolume) {
            v = targetVolume;
            clearInterval(fade);
        }
        bgm.volume = v;
    }, 50);
}

function fadeOutMusic(bgm) {
    let v = bgm.volume;
    const fade = setInterval(() => {
        v -= 0.02;
        if (v <= 0) {
            v = 0;
            bgm.pause();
            clearInterval(fade);
        }
        bgm.volume = v;
    }, 50);
}