export function triggerPostLevelStory(level, score) {
  localStorage.setItem("storyState", JSON.stringify({
    phase: "postLevel",
    level,
    score,
    lineIndex: 0,
    completed: false
  }));
}

const PROGRESS_KEY = "playerProgress";

export function setPlayerProgress(level) {
  localStorage.setItem(PROGRESS_KEY, level);
}
