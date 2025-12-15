import { lockAllLevels, unlockLevelsByProgress } from "./js/helper.js";
import { startGuide } from "./js/guideCharacter.js";

/* =========================
   STORY SELECTION (ONE ONLY)
========================= */

let storyStarted = false;

// 1️⃣ Highest priority: pending story from game
const pendingStory = JSON.parse(localStorage.getItem("pendingStory"));

if (pendingStory) {
    lockAllLevels();

    startGuide({
        phase: pendingStory.phase,
        level: pendingStory.level,
        score: pendingStory.score
    });

    localStorage.removeItem("pendingStory");
    storyStarted = true;
}

// 2️⃣ Fallback: legacy post-level score (optional)
if (!storyStarted) {
    const lastLevel = "level1";
    const lastScore = JSON.parse(localStorage.getItem(`${lastLevel}_score`));

    if (lastScore !== null) {
        lockAllLevels();

        startGuide({
            phase: "postLevel",
            level: lastLevel,
            score: lastScore
        });

        localStorage.removeItem(`${lastLevel}_score`);
        storyStarted = true;
    }
}

// 3️⃣ Default: welcome story
if (!storyStarted) {
  const welcomeSeen = localStorage.getItem("welcomeSeen") === "true";

  if (!welcomeSeen) {
    lockAllLevels();
    startGuide({ phase: "welcome" });
    localStorage.setItem("welcomeSeen", "true");
  } else {
    // no welcome → just unlock normally
    unlockLevelsByProgress();
  }
}


/* =========================
   UNLOCK AFTER STORY
========================= */

document.addEventListener("guide:finished", () => {
    unlockLevelsByProgress();
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
