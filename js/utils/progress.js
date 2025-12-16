export function triggerPostLevelStory(level, score) {
  localStorage.setItem("storyState", JSON.stringify({
    phase: "postLevel",
    level,
    score,
    lineIndex: 0,
    completed: false
  }));
}
