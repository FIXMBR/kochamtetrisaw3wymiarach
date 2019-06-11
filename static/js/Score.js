class Score {
    constructor() {
        this.score = 0;
        this.level = 1;
        this.softDrop = 0;
    }
    changeLevel(level) {
        this.level = level;
    }
    
    singleAdd() {
        this.score = this.score + (100 * game.level)
    }

    doubleAdd() {
        this.score = this.score + (300 * game.level)
    }

    tripleAdd() {
        this.score = this.score + (500 * game.level)
    }

    tetrisAdd() {
        this.score = this.score + (800 * game.level)
    }
    newSoftDrop() {
        this.softDrop = 0;
    }
    addSoftDrop() {
        if (this.softDrop < 20) {
            this.softDrop ++
        } 
    }
    getScore() {
        return this.score
    }
} 