import { setLevelButton } from "./js/helper.js";

const frames = [
  "image/waterfall/1.png",
  "image/waterfall/2.png",
  "image/waterfall/3.png",
  "image/waterfall/4.png",
  "image/waterfall/5.png",
  "image/waterfall/6.png",
  "image/waterfall/7.png",
  "image/waterfall/8.png",
  "image/waterfall/9.png",
  "image/waterfall/10.png",
  "image/waterfall/11.png"

];

let current = 0;
const img = document.getElementById("waterfall");

// changing the image after 100ms ( = 1s changing 10 images)
setInterval(() => {
  current = (current + 1) % frames.length;
  img.src = frames[current];
}, 100);


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

function typeLine() {
  typing = true;
  const line = dialogLines[lineIndex];
  if (charIndex < line.length) {
    textEl.textContent += line.charAt(charIndex);
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

document.body.addEventListener('click', nextLine);
typeLine();



window.onload = function () {

  for (let i = 1; i <= 8; i++) {
    setLevelButton(i)
  }
  
};