import { storyData } from "./storyData.js";

export function getStoryLines({ phase, level, score }) {
  console.log(phase);
  console.log(level);
  if (phase === "welcome") {
    return storyData.welcome ?? [];
  }

  if (phase === "postLevel") {
    const levelData = storyData.postLevel?.[level];
    if (!levelData) return [];
    const { thresholds, lines } = levelData;

    let selectedKey = null;

    for (const t of thresholds) {
      console.log(t);
      if (score >= t.min) {
        selectedKey = t.key;
      }
    }

    console.log(lines[selectedKey]);
    return lines[selectedKey] ?? [];
  }

  return [];
}
