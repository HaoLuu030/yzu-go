import { serverTimestamp } from
  "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

export function buildGameSave({ score, completed, extra = {} }) {
  if (typeof score !== "number" || Number.isNaN(score)) {
    throw new Error("Invalid score");
  }

  if (typeof completed !== "boolean") {
    throw new Error("completed must be boolean");
  }

  return {
    score,
    completed,
    finishedAt: serverTimestamp(),
    ...extra
  };
}
