import { storyData } from "./storyData.js";

export function getStoryLines({ phase, level, score, transition }) {
  if (phase === "welcome") {
    return storyData.welcome ?? [];
  }

  if (phase === "postLevel") {
    const levelStory = storyData.postLevel[level];
    if (!levelStory) return [];

    if (score < 40) return levelStory.low ?? [];
    if (score < 80) return levelStory.mid ?? [];
    return levelStory.high ?? [];
  }

  if (phase === "betweenLevels") {
    return storyData.betweenLevels[transition] ?? [];
  }

  return [];
}
