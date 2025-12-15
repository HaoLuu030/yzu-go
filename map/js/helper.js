function setLevelButton(levelNumber) {
    const data = JSON.parse(localStorage.getItem(`level_${levelNumber}`));
    const button = document.getElementById(`level${levelNumber}`);

    if (!button) return;

    // Level 1 is unlocked by progress rules
    if (levelNumber === 1 || (data && data.unlocked === true)) {
        button.classList.remove("button-locked");
        button.classList.add("button-unlocked");
    } else {
        button.classList.remove("button-unlocked");
        button.classList.add("button-locked");
    }
}

function lockAllLevels() {
    for (let i = 1; i <= 8; i++) {
        const btn = document.getElementById(`level${i}`);
        if (!btn) continue;

        btn.classList.add("button-locked");
        btn.classList.add("story-locked");

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