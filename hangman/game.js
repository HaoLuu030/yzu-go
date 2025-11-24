// Multi-word phrases supported
const words = [
    { word: "BUILDING 5", hint: "The place we now stand." },
    { word: "LIBRARY", hint: "A home full of books but no authors inside." },
    { word: "LOUISA", hint: "A place that smells awake." },
    { word: "MY WARMTH DAY", hint: "A place that serves the sun on a plate." },
    { word: "FAMILY MART", hint: "The green-and-white stop for everyday needs." },
    { word: "CABIN LOG", hint: "A cabin in name, a food stop in purpose.”]" },
    { word: "HUMANITIES", hint: "Which college calls this building home?" },
];

const phraseWinMessages = [
    "Warm-up round over. Now let's see if your brain’s awake!",
    "Ah yes… flashbacks to that final exam panic, right?",
    "Win this and we’re treating ourselves to overpriced coffee.",
    "Hotter than a toaster—nicely done!",
    "If you can survive the 12pm FamilyMart queue, you can survive anything… including this.",
    "I heard the spot is very chill.",
    "Nice! Even I thought that one was a scam answer."
];

const phraseFailMessages = [
    "(Building 5) - Did you have a concussion?",
    "(Libary) - How did you even graduate?",
    "(Louisa) - Fair enough, their coffee costs more than your GPA.",
    "(My Warmth Day) - Guess the only warm thing here is your confusion.",
    "(Family Mart) - How did you miss this? The green-white sign is screaming.",
    "(Cabin Log) - GYou didn’t get it? Honestly, neither do most people.",
    "(Humanities) - Don’t stress, even Google sighed at this one."
];





let phraseIndex = 0;
let chosen = "";

let correctLetters = [];
let wrong = 0;
const maxWrong = 6;
let score = 0;

// DOM elements
const scoreEl = document.getElementById("score");
const hintEl = document.getElementById("hint");
const wordEl = document.getElementById("word");
const alphabetEl = document.getElementById("alphabet");
const statusEl = document.getElementById("status");

function loadPhrase() {
    const selected = words[phraseIndex];
    chosen = selected.word;
    hintEl.textContent = "Hint: " + selected.hint;
    correctLetters = [];
    wrong = 0;
    statusEl.textContent = "";
    updateAlphabetButtons();
    updateWord();
}

function updateAlphabetButtons() {
    document.querySelectorAll("#alphabet button").forEach(btn => {
        btn.disabled = false;
    });
}

function updateScoreDisplay() {
    scoreEl.textContent = "Score: " + score;
}

function updateWord() {
    let display = chosen
        .split("")
        .map(char => {
            if (char === " ") return " ";
            return correctLetters.includes(char) ? char : "_";
        })
        .join(" ");

    wordEl.textContent = display;

    // WIN CONDITION (phrase completed)
    if (!display.includes("_")) {
        score += 50;
        updateScoreDisplay();

        // show message for the *current* phrase
        statusEl.textContent = phraseWinMessages[phraseIndex];

        phraseIndex++;

        if (phraseIndex >= words.length) {
            // Do NOT change the status message — leave the final custom message
            disableAll();
            logScore(score);
        } else {
            setTimeout(() => {
                loadPhrase();
            }, 2000);
        }

    }
}

function disableAll() {
    document.querySelectorAll("#alphabet button")
        .forEach(btn => btn.disabled = true);
}

function guess(letter, btn) {
    btn.disabled = true;

    if (chosen.includes(letter)) {
        correctLetters.push(letter);
        score += 10;
        updateScoreDisplay();
        updateWord();
    } else {
        wrong++;
        score -= 10;
        if (score < 0) score = 0;
        updateScoreDisplay();

        statusEl.textContent = `Wrong: ${wrong} / ${maxWrong}`;

        // LOSE CONDITION (out of attempts)
        if (wrong >= maxWrong) {

            // SHOW CUSTOM WRONG MESSAGE FOR THIS PHRASE
            statusEl.textContent = phraseFailMessages[phraseIndex];

            phraseIndex++;

            if (phraseIndex >= words.length) {
                // End the game silently after final phrase
                disableAll();
                logScore(score);
            } else {
                setTimeout(() => {
                    loadPhrase();
                }, 2000);
            }
        }

    }
}

function createAlphabet() {
    // A–Z
    for (let i = 65; i <= 90; i++) {
        let letter = String.fromCharCode(i);
        let btn = document.createElement("button");
        btn.textContent = letter;
        btn.onclick = () => guess(letter, btn);
        alphabetEl.appendChild(btn);
    }

    // Numbers 1–9
    for (let n = 1; n <= 9; n++) {
        let num = n.toString();
        let btn = document.createElement("button");
        btn.textContent = num;
        btn.onclick = () => guess(num, btn);
        alphabetEl.appendChild(btn);
    }
}

// Keyboard input support
document.addEventListener("keydown", (event) => {
    let key = event.key.toUpperCase();

    if (key >= "A" && key <= "Z") {
        pressVirtualKey(key);
    }

    if (key >= "1" && key <= "9") {
        pressVirtualKey(key);
    }
});

function pressVirtualKey(key) {
    const allButtons = document.querySelectorAll("#alphabet button");

    for (let btn of allButtons) {
        if (btn.textContent === key && !btn.disabled) {
            btn.click();
        }
    }
}

// Save score as: {"level_6": score, "unlocked": true}
function logScore(score) {
    const data = {
        level_6: score,
        unlocked: true
    };
    localStorage.setItem("level_6", JSON.stringify(data));
}

// INITIALIZE GAME
createAlphabet();
loadPhrase();
updateScoreDisplay();
