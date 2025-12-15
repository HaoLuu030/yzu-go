import { getStoryLines } from "./storyEngine.js";

let dialogLines = [];
let lineIndex = 0;
let charIndex = 0;
let typing = false;
let currentLine = "";

const textEl = document.getElementById("dialogText");
const nextEl = document.getElementById("nextIndicator");

export function startGuide(levelKey, score) {
    dialogLines = getStoryLines(levelKey, score);
    lineIndex = 0;
    charIndex = 0;
    typing = false;

    textEl.textContent = "";
    nextEl.style.visibility = "hidden";

    if (dialogLines.length > 0) {
        typeLine();
    }
}

function typeLine() {
    typing = true;
    currentLine = dialogLines[lineIndex];

    if (charIndex < currentLine.length) {
        textEl.textContent += currentLine.charAt(charIndex++);
        setTimeout(typeLine, 40);
    } else {
        typing = false;
        nextEl.style.visibility = "visible";
    }
}

function finishLineImmediately() {
    textEl.textContent = currentLine;
    charIndex = currentLine.length;
    typing = false;
    nextEl.style.visibility = "visible";
}

document.querySelector(".dialog-box").addEventListener("click", () => {
    if (typing) {
        finishLineImmediately();
        return;
    }

    nextEl.style.visibility = "hidden";
    lineIndex++;
    charIndex = 0;

    if (lineIndex < dialogLines.length) {
        textEl.textContent = "";
        typeLine();
    } else {
        // Keep last line visible
        typing = false;
        nextEl.style.visibility = "hidden";
        document.dispatchEvent(new CustomEvent("guide:finished"));
    }
});


