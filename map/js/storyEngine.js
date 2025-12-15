import { storyData } from "./storyData.js";

export function getStoryLines(level, score) {
  if (!storyData[level]) return [];

  if (score < 40) return storyData[level].low || [];
  if (score < 80) return storyData[level].mid || [];
  return storyData[level].high || [];
}
