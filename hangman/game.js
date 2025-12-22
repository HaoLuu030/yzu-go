import { restoreIfGameCompleted, triggerPostLevelStory } from "../js/utils/progress.js";
import { saveGame } from "../js/data/scoreRepository.js";
import { startLoader } from "../shared/loader/assetLoader/index.js";
import { startSaveLoader } from "../shared/loader/saveLoader/index.js";
import { HANGMAN_GAMEKEY } from "../js/data/gamekeys.js";
import { showOverlay } from "../js/utils/gameOverlay.js";


startLoader({
    text: "Receiving answer sheets...",
    assets: [
        "../image/UI/background_card-matching.png",
        "../image/UI/building_5.png",
        "sfx/background-music.mp3",
        "sfx/correct.mp3",
        "sfx/gong.mp3",
        "sfx/incorrect.mp3"
    ]
})
/* ============================================================
   1. DATA
============================================================ */

// Multi-word phrases supported
const words = [
    { word: "BUILDING 5", hint: "The place we now stand." },
    { word: "LIBRARY", hint: "A home full of books but no authors inside." },
    { word: "LOUISA", hint: "A place that smells awake." },
    { word: "MY WARMTH DAY", hint: "A place that serves the sun on a plate." },
    { word: "FAMILY MART", hint: "The green-and-white stop for everyday needs." },
    { word: "CABIN LOG", hint: "A cabin in name, a food stop in purpose." },
    { word: "HUMANITIES", hint: "Which college calls this building home?" }
];



const phraseWinMessages = [
    "Warm-up round over. Now let's see if your brain’s awake!",
    "Ah yes… flashbacks to that final exam panic, right?",
    "Win this and we’re treating ourselves to overpriced coffee.",
    "Hotter than a toaster—nicely done!",
    "If you can survive the 12pm FamilyMart queue, you can survive anything…",
    "I heard the spot is very chill.",
    "Nice! Even I thought that one was a scam answer."
];

const phraseFailMessages = [
    "(Building 5) – Did you have a concussion?",
    "(Library) – How did you even graduate?",
    "(Louisa) – Fair enough, their coffee costs more than your GPA.",
    "(My Warmth Day) – Guess the only warm thing here is your confusion.",
    "(Family Mart) – The green-white sign was screaming.",
    "(Cabin Log) – Honestly, neither do most people.",
    "(Humanities) – Even Google sighed at this one."
];

/* ============================================================
   2. STATE
============================================================ */

let phraseIndex = 0;
let chosen = "";
let correctLetters = [];
let wrong = 0;
const maxWrong = 6;
let quizScore = 0;
let quizStarted = false;
let inputLocked = false;
let number = 0;

// ==== SCORE CONFIG ====
const SCORE = {
    CORRECT_LETTER: 10,   // correct guess
    WRONG_LETTER: -10,    // wrong guess (clamped at 0)
    PHRASE_COMPLETE: 30, // finishing a phrase
};



/* ============================================================
   3. DOM REFERENCES (MATCH GAME FORMAT)
============================================================ */

const startOverlay = document.getElementById("start-overlay");

const scoreEl = document.getElementById("score");
const hintEl = document.getElementById("quiz-hint");
const wordEl = document.getElementById("quiz-word");
const alphabetEl = document.getElementById("quiz-alphabet");
const statusEl = document.getElementById("quiz-status");
const questions = document.getElementById("question");

/* AUDIO (shared system) */
const bgm = document.getElementById("bgm");
const musicBtn = document.getElementById("music-btn");
const musicIcon = document.getElementById("music-icon");


// NEW
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const revealSound = document.getElementById("revealSound");


let isMusicOn = false;
// progression hook
const levelKey = "level5";

/* ============================================================
   4. AUDIO HELPERS (SAME AS GAME)
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




function updateMusicIcon() {
    musicIcon.src = isMusicOn
        ? "../image/UI/volume_on.png"
        : "../image/UI/volume_off.png";

}

musicBtn.onclick = () => {
    isMusicOn = !isMusicOn;

    if (isMusicOn) fadeInMusic();
    else fadeOutMusic();

    updateMusicIcon();
};


startOverlay.onclick = () => {
    startOverlay.style.display = "none";
    quizStarted = true;
    loadPhrase();


    if (!isMusicOn) {
        isMusicOn = true;
        updateMusicIcon();

        fadeInMusic();
    }
};



/* ============================================================
   5. GAME LOGIC
============================================================ */

function loadPhrase() {
    const selected = words[phraseIndex];
    chosen = selected.word;
    hintEl.textContent = "Hint: " + selected.hint;
    ++number;
    questions.textContent = `${number} / ${words.length}`;
    correctLetters = [];
    wrong = 0;
    statusEl.textContent = "";
    updateAlphabetButtons();
    updateWord();
}

function updateAlphabetButtons() {
    document.querySelectorAll("#quiz-alphabet button")
        .forEach(btn => btn.disabled = false);
}

function updateScoreDisplay() {
    scoreEl.textContent = quizScore;
}

function updateWord() {
    const display = chosen
        .split("")
        .map(ch => ch === " " ? " " : (correctLetters.includes(ch) ? ch : "_"))
        .join(" ");

    wordEl.textContent = display;

    // WIN
    if (!display.includes("_")) {
        lockInput();
        quizScore += SCORE.PHRASE_COMPLETE;
        updateScoreDisplay();
        playSound(revealSound);
        statusEl.textContent = phraseWinMessages[phraseIndex];
        phraseIndex++;

        if (phraseIndex >= words.length) {
            setTimeout(endGame, 2000);
        } else {
            setTimeout(() => {
                unlockInput();
                loadPhrase();
            }, 2000);
        }
    }
}

function guess(letter, btn) {
    if (!quizStarted || inputLocked) return;
    btn.disabled = true;

    if (chosen.includes(letter)) {
        correctLetters.push(letter);
        quizScore += SCORE.CORRECT_LETTER;
        updateScoreDisplay();

        playSound(correctSound); // ✅ RIGHT SOUND
        updateWord();
    } else {
        wrong++;
        quizScore = Math.max(0, quizScore + SCORE.WRONG_LETTER);
        updateScoreDisplay();

        playSound(wrongSound); // ❌ WRONG SOUND

        statusEl.textContent = `Wrong: ${wrong} / ${maxWrong}`;

        if (wrong >= maxWrong) {
            lockInput();
            playSound(revealSound);
            statusEl.textContent = phraseFailMessages[phraseIndex];
            phraseIndex++;

            if (phraseIndex >= words.length) {
                setTimeout(endGame, 2000);
            } else {
                setTimeout(() => {
                    unlockInput();
                    loadPhrase();
                }, 2000);
            }
        }
    }
}

function lockInput() {
    inputLocked = true;
    disableAll();
}

function unlockInput() {
    inputLocked = false;
    updateAlphabetButtons();
}



async function endGame() {
    disableAll();
    await startSaveLoader(
        async () => {
            await saveGame({
                gameKey: HANGMAN_GAMEKEY,
                levelId: levelKey,
                score: quizScore,
                completed: true
            });
        },
        { text: "Handing in answer sheet..." }
    );
    bgm.pause();
    showOverlay({ level: levelKey, score: quizScore });

    // ===== BACK TO MAP =====
    document.getElementById("back-to-map").onclick = function () {
        // trigger story
        triggerPostLevelStory(levelKey, quizScore);
        window.location.href = "../map/index.html";
    };
}

function disableAll() {
    document.querySelectorAll("#quiz-alphabet button")
        .forEach(btn => btn.disabled = true);
}

/* ============================================================
   6. ALPHABET CREATION
============================================================ */

function createAlphabet() {
    alphabetEl.innerHTML = "";

    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const btn = document.createElement("button");
        btn.textContent = letter;
        btn.onclick = () => guess(letter, btn);
        alphabetEl.appendChild(btn);
    }

    for (let n = 1; n <= 9; n++) {
        const btn = document.createElement("button");
        btn.textContent = n;
        btn.onclick = () => guess(n.toString(), btn);
        alphabetEl.appendChild(btn);
    }
}

/* ============================================================
   7. INPUT (KEYBOARD)
============================================================ */

document.addEventListener("keydown", e => {
    const key = e.key.toUpperCase();
    document.querySelectorAll("#quiz-alphabet button")
        .forEach(btn => {
            if (btn.textContent === key && !btn.disabled) btn.click();
        });
});



/* ============================================================
   9. sound
============================================================ */
function playSound(sound) {
    if (!isMusicOn) return;
    sound.currentTime = 0;
    sound.play();
}


/* ============================================================
   10. BOOT
============================================================ */

const restored = restoreIfGameCompleted(levelKey);

if (restored) {
    // ===== BACK TO MAP =====
    document.getElementById("back-to-map").onclick = function () {
        window.location.href = "../map/index.html";
    };
    // Restore-only UI
    createAlphabet();
    updateScoreDisplay();
    disableAll();
} else {
    // Normal game boot
    createAlphabet();
    updateScoreDisplay();
}

