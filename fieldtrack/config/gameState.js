export const gameState = {
    waitingToStart: true,
    frameCount: 0,
    speedScale: 1,
    speedIncrease: 0.001,
    spawnRateScale: 1,
    spawnRateIncrease: 0.001,
    animationId: null,
    isRunning: false,
    testing: false,
    gameOver: false,
    score: 0,
    highScore: 0,
    timeElapsed: 0,
    // track milestone
    _lastMileStone: 0,
    increase() {
        if (this.frameCount % 300 == 0) {
            this.speedScale = Math.min(this.speedScale + this.speedIncrease, 5);
            this.spawnRateScale = Math.min(this.spawnRateScale + this.spawnRateIncrease, 2)
        }
    },
    reset() {
        this.frameCount = 0;
        this.speedScale = 1;
        this.spawnRateScale = 1;
        this.score = 0;
        this._lastMileStone = 0;
    },
    toggleTesting() {
        this.testing = !this.testing;
        if (this.testing) {
            this.spawnRateIncrease = 0;
            this.speedIncrease = 0;
            // this.gameOver = true;
        } else {
            this.spawnRateIncrease = 0.001;
            this.speedIncrease = 0.001;
            // this.gameOver = false;
        }
    }
}