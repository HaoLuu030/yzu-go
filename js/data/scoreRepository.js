const USE_DB = false; // ← flip this later

export async function saveScore({ level, score, time }) {
  if (USE_DB) {
    // future database version
    await fetch("/api/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ level, score, time })
    });
  } else {
    // localStorage fallback
    localStorage.setItem(
      `score_${level}`,
      JSON.stringify({ score, time, date: Date.now() })
    );
  }
}

export async function getScore(level) {
  if (USE_DB) {
    const res = await fetch(`/api/score?level=${level}`);
    return await res.json();
  } else {
    return JSON.parse(localStorage.getItem(`score_${level}`));
  }
}

export async function clearScore(level) {
  if (USE_DB) {
    await fetch(`/api/score?level=${level}`, { method: "DELETE" });
  } else {
    localStorage.removeItem(`score_${level}`);
  }
}
