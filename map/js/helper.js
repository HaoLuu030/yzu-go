function updateButtonState(levelNumber) {
    const progress = JSON.parse(localStorage.getItem("progress")) || { levels: {} };
    const levelKey = `level${levelNumber}`;
    const data = progress.levels[levelKey];

    const button = document.getElementById(levelKey);
    if (!button) return;

    // Story lock still has highest priority
    if (button.classList.contains("story-locked")) {
        button.classList.add("button-locked");
        button.style.pointerEvents = "none";
        return;
    }

    // Reset visual state
    button.classList.remove(
        "button-unlocked",
        "button-locked",
        "button-completed"
    );
    button.style.pointerEvents = "";

    // 1. Completed → permanently locked
    if (data?.completed) {
        button.classList.add("button-completed");
        button.style.pointerEvents = "none";
        return;
    }

    // 2. Unlocked → playable
    if (levelNumber === 1 || data?.unlocked) {
        button.classList.add("button-unlocked");
        return;
    }

    // 3. Locked
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
        updateButtonState(i);
    }
}


export { updateButtonState, lockAllLevels, unlockLevelsByProgress }