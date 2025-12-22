import { getStoryLines } from "./storyEngine.js";
import { loadPlayerState } from "../../js/state/playerState.js";

let dialogLines = [];
let lineIndex = 0;
let charIndex = 0;
let typing = false;
let currentLine = "";

let phase = null;
let level = null;
let score = null;
let storyActive = false;


// audio
const typingSound = new Audio("./sfx/typing.mp3");
const clickSound = new Audio("./sfx/clicking.ogg");

// tuning
typingSound.volume = 0.3;
clickSound.volume = 0.6;

// prevent overlap stacking
typingSound.loop = true;

const bgm = document.getElementById("bgm");
let bgmStarted = false;



const textEl = document.getElementById("dialogText");
const nextEl = document.getElementById("nextIndicator");

/* =========================
   SAVE / LOAD
========================= */


/* =========================
   CORE CONTROLS
========================= */

function advanceDialog() {
    if (!storyActive) return;

    // unlock & start music on FIRST interaction only
    if (!bgmStarted) {
        bgm.play().catch(() => { });
        bgmStarted = true;
    }

    if (typing) {
        finishLineImmediately();
        return;
    }

    lineIndex++;
    document.dispatchEvent(new CustomEvent("guide:progress", {
        detail: {
            lineIndex,
            text: dialogLines[lineIndex - 1] ?? ""
        }
    }));;

    nextEl.style.visibility = "hidden";

    if (lineIndex < dialogLines.length) {
        charIndex = 0;
        textEl.textContent = "";
        typeLine();
    } else {
        finishStory();
    }
}




export function startGuide({
    phase: p,
    level: l,
    score: s,
    lineIndex: resumeIndex = 0
}) {
    phase = p;
    level = l;
    score = s;
    storyActive = true;

    dialogLines = getStoryLines({ phase, level, score });

    lineIndex = resumeIndex;
    charIndex = 0;
    typing = false;

    textEl.textContent = "";
    nextEl.style.visibility = "hidden";
    typeLine();
}

export function showLastStoryLineIfAny() {
  const state = loadPlayerState();
  if (!state.story.lastLine) return;

  textEl.textContent = state.story.lastLine;
  nextEl.style.visibility = "hidden";
}


/* =========================
   TYPING EFFECT
========================= */

function typeLine() {
    if (!typing) {
        typing = true;
        typingSound.currentTime = 0;
        typingSound.play().catch(() => { }); // browser-safe
    }

    currentLine = dialogLines[lineIndex];

    if (charIndex < currentLine.length) {
        textEl.textContent += currentLine.charAt(charIndex++);
        setTimeout(typeLine, 40);
    } else {
        typing = false;
        typingSound.pause();
        nextEl.style.visibility = "visible";
    }
}

function finishLineImmediately() {
    typingSound.pause();
    textEl.textContent = currentLine;
    charIndex = currentLine.length;
    typing = false;
    nextEl.style.visibility = "visible";
}

/* =========================
   FINISH STORY
========================= */

function finishStory() {
  storyActive = false;

  const lastLine = dialogLines[dialogLines.length - 1];

  document.dispatchEvent(new CustomEvent("guide:finished", {
    detail: {
      lastLine,
      phase
    }
  }));

  typingSound.pause();
}



/* =========================
   INPUT
========================= */

document.querySelector(".dialog-box").addEventListener("click", advanceDialog);

document.addEventListener("keydown", (e) => {
    if (!["Space", "Enter", "ArrowRight"].includes(e.code)) return;
    e.preventDefault();
    advanceDialog();
});
