import { loadPlayerState } from "../js/state/playerState.js";


let scoreOverlayVisible = false;


function formatGameName(gameId) {
  const MAP = {
    packup: "Pack-Up",
    fieldtrack: "Field Track",
    cardmatching: "Card Matching",
    pacman: "Pac-Man",
    hangman: "Hangman",
    towerofhanoi: "Tower of Hanoi"
  };

  return MAP[gameId] ?? gameId;
}


function buildScoreRowsFromProgress() {
  const state = loadPlayerState();
  if (!state || !state.levels) return [];

  return Object.values(state.levels).map(level => ({
    gameId: level.gameId,
    name: formatGameName(level.gameId),
    score: level.score,
    completed: level.completed
  }));
}

function updateScoreTitle() {
  const state = loadPlayerState();
  const titleEl = document.getElementById("score-title");
  console.log(titleEl);
  if (!titleEl) return;

  const name = state?.profile?.name;
  console.log(name);

  titleEl.textContent = name
    ? `${name}'s Progress`
    : "Progress";
}



function renderScoreRows() {
  const rows = buildScoreRowsFromProgress();
  const tbody = document.getElementById("score-log-body");
  if (!tbody) return;

  tbody.innerHTML = "";

  rows.forEach(row => {
    const tr = document.createElement("tr");
    tr.className = row.completed ? "completed" : "pending";

    tr.innerHTML = `
      <td>${row.name}</td>
      <td>${row.score ?? "-"}</td>
      <td class="status">${row.completed ? "✓" : "—"}</td>
    `;

    tbody.appendChild(tr);
  });
}

export function toggleScoreOverlay() {
  if (scoreOverlayVisible) {
    hideScoreOverlay();
  } else {
    showScoreOverlay();
  }
}



function showScoreOverlay() {
  const overlay = document.getElementById("score-log-overlay");
  if (!overlay) return;

  updateScoreTitle();
  renderScoreRows();        // always refresh before showing
  overlay.style.display = "flex";
  scoreOverlayVisible = true;
}

function hideScoreOverlay() {
  const overlay = document.getElementById("score-log-overlay");
  if (!overlay) return;

  overlay.style.display = "none";
  scoreOverlayVisible = false;
}


document.getElementById("score-log-overlay")
  ?.addEventListener("click", e => {
    if (e.target.id === "score-log-overlay") {
      hideScoreOverlay();
    }
  });


document.querySelector(".score-close-btn")
  ?.addEventListener("click", hideScoreOverlay);

