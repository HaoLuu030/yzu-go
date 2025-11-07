export const gameState = {
    frameCount: 0,
    speedScale: 1,
    speedIncrease: 0.001,
    spawnRateScale: 1,
    spawnRateIncrease: 0.001,
    animationId: null,
    isRunning: true,
    testing: false,
    gameOver: false,
    increase() {
        if (this.frameCount % 300 == 0) {
            this.speedScale = Math.min(this.speedScale + this.speedIncrease, 4);
            this.spawnRateScale = Math.min(this.spawnRateScale + this.spawnRateIncrease, 2)
        }
    },
    reset() {
        this.frameCount = 0;
        this.speedScale = 1;
        this.spawnRateScale = 1;
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