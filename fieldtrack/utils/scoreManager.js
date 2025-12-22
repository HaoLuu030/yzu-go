import { gameState } from "../config/gameState.js";

export default class ScoreManager {
    constructor(font = "100px monospace", color = "#333", x = 5, y = 40) {
        this.font = font;
        this.color = color;
        this.x = x;
        this.y = y;

        this.basePtPersecond = 0.15;
        this.milestoneStep = 100;

        // remove all high-score loading (no more localStorage read)
        gameState.score = 0;

        this.milestoneSound = new Audio("./assets/sfx/mile-stone-sound.mp3");
    }

    reset() {
        gameState.score = 0;
        gameState._lastMileStone = 0;
    }

    update() {
        if (!gameState.isRunning || gameState.gameOver) return;

        // score increases over time
        gameState.score += this.basePtPersecond;

        const currentMilestone = Math.floor(gameState.score / this.milestoneStep);
        if (currentMilestone > gameState._lastMileStone) {
            gameState._lastMileStone = currentMilestone;
            if (this.milestoneSound) this.milestoneSound.play();
            this._flashUntil = performance.now() + 1000;
        }

        // update external HTML score
        this._updateHtmlScore();
    }

    draw(context) {
        // optional: you removed drawing text, so this is empty and fine
        context.save();
        context.font = this.font;
        context.textBaseline = "top";
        context.textAlign = "left";
        context.fillStyle = this._shouldFlash() ? "#22aa22" : this.color;
        context.restore();
    }

    _shouldFlash() {
        return this._flashUntil && performance.now() < this._flashUntil;
    }

    _updateHtmlScore() {
        const scoreEl = document.getElementById("score");
        if (!scoreEl) return;

        scoreEl.textContent = `${Math.floor(gameState.score)}`;
    }
}
