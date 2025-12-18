function setLevelButton(levelNumber) {
  const data = JSON.parse(localStorage.getItem(`level${levelNumber}`));
  const button = document.getElementById(`level${levelNumber}`);

  if (!button) return;

  // If story is locking the map, do nothing
  if (button.classList.contains("story-locked")) {
    button.classList.add("button-locked");
    button.style.pointerEvents = "none";
    return;
  }

  // reset state
  button.classList.remove(
    "button-unlocked",
    "button-locked",
    "button-completed"
  );
  button.style.pointerEvents = "";

  // 1️⃣ Completed → locked permanently
  if (data?.completed) {
    button.classList.add("button-completed");
    button.style.pointerEvents = "none";
    return;
  }

  // 2️⃣ Unlocked → playable
  if (levelNumber === 1 || data?.unlocked) {
    button.classList.add("button-unlocked");
    return;
  }

  // 3️⃣ Locked
  button.classList.add("button-locked");
  button.style.pointerEvents = "none";
}



function lockAllLevels() {
  for (let i = 1; i <= 8; i++) {
    const btn = document.getElementById(`level${i}`);
    if (!btn) continue;

    btn.classList.remove(
      "button-unlocked",
      "button-completed"
    );

    btn.classList.add("button-locked", "story-locked");
    btn.style.pointerEvents = "none";

  }
}

function unlockLevelsByProgress() {
  for (let i = 1; i <= 8; i++) {
    const btn = document.getElementById(`level${i}`);
    if (!btn) continue;
    btn.classList.remove("story-locked");
    setLevelButton(i);
  }
}



const levelPositions = [
  { id: 1, top: "13%", left: "63%" },
  { id: 2, top: "10%", left: "54%" },
  { id: 3, top: "21%", left: "46%" },
  { id: 4, top: "11%", left: "39%" },
  { id: 5, top: "12%", left: "32%" },
  { id: 6, top: "13%", left: "26%" },
  { id: 7, top: "20%", left: "29%" },
  { id: 8, top: "18%", left: "22%" }
];

function saveMovementState(from, to, duration) {
  localStorage.setItem("dolphinMove", JSON.stringify({
    from,
    to,
    startTime: Date.now(),
    duration
  }));
}
function moveDolphinToLevel(level, duration = 2000) {
  const dolphin = document.getElementById("dolphin-cute");
  const to = levelPositions.find(p => p.id === level);
  if (!dolphin || !to) return;

  const from = {
    left: getComputedStyle(dolphin).marginLeft,
    top: getComputedStyle(dolphin).marginTop
  };

  saveMovementState(from, to, duration);

  dolphin.style.transition = `margin-left ${duration}ms linear, margin-top ${duration}ms linear`;

  requestAnimationFrame(() => {
    dolphin.style.marginLeft = to.left;
    dolphin.style.marginTop = `calc(${to.top} - 5%)`;
  });
}





function getLatestLevelFromStorage() {
  const level = Number(localStorage.getItem("progress"));
  return Number.isFinite(level) ? level : 1;
}



export { setLevelButton, lockAllLevels, unlockLevelsByProgress, getLatestLevelFromStorage, moveDolphinToLevel }