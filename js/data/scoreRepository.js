const USE_DB = false;


export async function saveScore({ level, score }) {
    if (USE_DB) {
        const res = await fetch(`/api/score?level=${level}`);
        return await res.json();
    } else {
        return JSON.parse(localStorage.getItem(`score_${level}`));
    }
}


export async function clearScore(level) {
    if (USE_DB) {
        await fetch(`/api/score?level=${levell}`, {method: "DELETE"});
    } else {
        localStorage.removeItem(`score_${level}`);
    }
}