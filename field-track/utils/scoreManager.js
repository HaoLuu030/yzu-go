import { gameState } from "../config/gameState.js";

export default class ScoreManager {
    constructor(font="16px monospace", color ="#333", x = 5, y = 40) {
        this.font = font;
        this.color = color;
        this.x = x;
        this.y = y;


        // scoring pace
        this.basePtPersecond = 0.1;
        this.milestoneStep = 100;

        // high score
        const saved = Number(localStorage.getItem("dino_high_score") || 0);

        if (!Number.isNaN(saved)) gameState.higScore = saved;

        // sound effect
        this.milestoneSound = new Audio("../assets/sfx/mile-stone-sound.mp3");
    }

    reset() {
        gameState.score = 0;
        gameState._lastMileStone = 0;
    }

    update() {
        if(!gameState.isRunning || gameState.gameOver) return;

        const gain = this.basePtPersecond;
        gameState.score += gain;

        const currentMilestone = Math.floor(gameState.score / this.milestoneStep);
        if (currentMilestone > gameState._lastMileStone) {
            gameState._lastMileStone = currentMilestone;
            if(this.milestoneSound) this.milestoneSound.play();

            this._flashUntil = performance.now() + 1000;
        }

        if(gameState.score > gameState.highScore) {
            gameState.highScore = Math.floor(gameState.score);
            localStorage.setItem("dino_high_score", String(gameState.highScore));
        }
    }

    draw(context) {
        context.save();
        context.font = this.font;
        context.textBaseline = "top";
        context.fillStyle = this._shouldFlash() ? "#22aa22" : this.color;

        const scoreStr = this._pad(Math.floor(gameState.score), 5);
        const hiStr = this._pad(Math.floor(gameState.highScore), 5);


        const text = `HI ${hiStr}  ${scoreStr}`;
        context.fillText(text, this.x, this.y);
        context.restore();
    }

    _pad(n, width) {
        const s = String(n);
        return s.length >= width ? s : "0".repeat(width - s.length) + s;
    }

    _shouldFlash() {
        return this._flashUntil && performance.now() < this._flashUntil;
    }
}