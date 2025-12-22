import { storyData } from "./storyData.js";

export function getStoryLines({ phase, level, score }) {
  console.log(phase, level, score);
  if (phase === "welcome") {
    return storyData.welcome ?? [];
  }

  if (phase === "postLevel") {
    const levelData = storyData.postLevel?.[level];
    if (!levelData) return [];
    const { thresholds, lines } = levelData;

    let selectedKey = null;

    for (const t of thresholds) {
      if (score >= t.min) {
        selectedKey = t.key;
      }
    }

    return lines[selectedKey] ?? [];
  }

  return [];
}
