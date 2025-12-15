import { lockAllLevels, setLevelButton, unlockLevelsByProgress } from "./js/helper.js";
import { startGuide } from "./js/guideCharacter.js";


lockAllLevels();
startGuide("level1", 0);

document.addEventListener("guide:finished", () => {
  unlockLevelsByProgress();   // 🔓 now apply real unlock rules
});

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
