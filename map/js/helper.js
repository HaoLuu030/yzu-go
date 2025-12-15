function setLevelButton(levelNumber) {
  const data = JSON.parse(localStorage.getItem(`level_${levelNumber}`));
  const button = document.getElementById(`level${levelNumber}`);

  if (!button) return;

  if (levelNumber === 1 || (data && data.unlocked === true)) {
    button.classList.add("button-unlocked");
  } else {
    button.classList.add("button-locked");
  }
}


export {setLevelButton}