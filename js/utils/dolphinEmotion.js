import { storyData } from "../../map/js/storyData.js";
// dolphinEmotion.js

const performanceSoundMap = {
  low: "result_low.mp3",
  mid: "result_mid.mp3",
  high: "result_high.mp3"
};

const defaultOverlayTextMap = {
  low: "Really?!?",
  mid: "Meh...",
  high: "Hoohrayy!!"
};

export function getPerformanceSound(level, score) {
  const key = getThresholdKey(level, score);
  return performanceSoundMap[key];
}

export function getOverlayText(level, score, customText) {
  // Explicit text always wins
  if (customText) return customText;

  const key = getThresholdKey(level, score);
  return defaultOverlayTextMap[key] || "Level Finished!";
}

export function getThresholdKey(level, score) {
  const levelData = storyData.postLevel?.[level];
  if (!levelData) return "low";

  return levelData.thresholds
    .slice()
    .sort((a, b) => b.min - a.min)
    .find(t => score >= t.min)
    ?.key || "low";
}


const performanceImageMap = {
  low: "result_low.png",
  mid: "result_mid.png",
  high: "result_high.png"
};

export function getPerformanceImage(level, score) {
  const key = getThresholdKey(level, score);
  return performanceImageMap[key];
}