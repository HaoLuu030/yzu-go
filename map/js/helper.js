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


export { setLevelButton, lockAllLevels, unlockLevelsByProgress }