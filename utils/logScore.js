<<<<<<< HEAD:logScore.js
// Universal save function for all levels
function saveLevelProgress(levelName, score) {
    const data = {
        score: score,
        unlocked: true
    };

    localStorage.setItem(levelName, JSON.stringify(data));
=======
// Universal save function for all levels
export function saveLevelProgress(levelName, score) {
    const data = {
        score: score,
        unlocked: true
    };

    localStorage.setItem(levelName, JSON.stringify(data));
>>>>>>> card-matching:utils/logScore.js
}