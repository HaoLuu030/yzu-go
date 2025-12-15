const dialogLines = [
  "Where am I...?",
  "It looks like the old forest near YZU campus...",
  "I should find a way back before it gets dark."
];

let lineIndex = 0;
let charIndex = 0;
const textEl = document.getElementById('dialogText');
const nextEl = document.getElementById('nextIndicator');
let typing = true;
let currentLine = "";

function typeLine() {
  typing = true;
  currentLine = dialogLines[lineIndex];

  if (charIndex < currentLine.length) {
    textEl.textContent += currentLine.charAt(charIndex);
    charIndex++;
    setTimeout(typeLine, 40); // typing speed
  } else {
    typing = false;
    nextEl.style.visibility = 'visible';
  }
}


function nextLine() {
  if (typing) return;
  nextEl.style.visibility = 'hidden';
  lineIndex++;
  if (lineIndex < dialogLines.length) {
    textEl.textContent = '';
    charIndex = 0;
    typeLine();
  } else {
    textEl.textContent = "End of dialog.";
  }
}
function finishLineImmediately() {
    textEl.textContent = currentLine;
    charIndex = currentLine.length;
    typing = false;
    nextEl.style.visibility = 'visible';
}

document.querySelector('.dialog-box').addEventListener('click', () => {
  if (typing) {
    finishLineImmediately();
    return;
  }

  nextEl.style.visibility = 'hidden';
  lineIndex++;
  charIndex = 0;

  if (lineIndex < dialogLines.length) {
    textEl.textContent = '';
    typeLine();
  } else {
    textEl.textContent = "End of dialog.";
  }
});
typeLine();