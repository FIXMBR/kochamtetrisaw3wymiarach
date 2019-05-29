class Tetramino {
    constructor(num) {
        this.blocksPosition = [];
        this.blockNum = num;
        this.blockRotation = 0;
        this.x = 3
        this.y = 0
        switch (this.blockNum) {
            case 0:

                this.blocksPosition = [
                    [1, 1, 1, 1],
                    [0, 0, 0, 0]
                ];
                break;

            case 1:
                this.blocksPosition = [
                    [1, 1, 1, 0],
                    [0, 1, 0, 0]

                ];
                break;
            case 2:
                this.blocksPosition = [
                    [1, 1, 1, 0],
                    [1, 0, 0, 0]

                ];
                break;
            case 3:
                this.blocksPosition = [
                    [1, 1, 1, 0],
                    [0, 0, 1, 0]

                ];
                break;
            case 4:
                this.blocksPosition = [
                    [0, 1, 1, 0],
                    [1, 1, 0, 0]

                ];
                break;
            case 5:
                this.blocksPosition = [
                    [1, 1, 0, 0],
                    [0, 1, 1, 0]

                ];
                break;
            case 6:
                this.blocksPosition = [
                    [0, 1, 1, 0],
                    [0, 1, 1, 0]

                ]
                break;
        }

    }

    calculateBorderRight() {
        let border = 0
        for (let i = 0; i < this.blocksPosition.length; i++) {
            let lineBorder = 0
            for (let j = 0; j < this.blocksPosition[i].length; j++) {
                const element = this.blocksPosition[i][j];
                if (element == 1) {
                    lineBorder = j
                }
            }
            if (border < lineBorder) border = lineBorder
        }
        return border
    }

    calculateBorderLeft() {
        console.log(this.blocksPosition);
        console.log(this.x);
        let done = false
        let border = 0
        for (let i = 0; i < this.blocksPosition[0].length; i++) {
            for (let j = 0; j < this.blocksPosition.length; j++) {
                const element = this.blocksPosition[j][i];
                if (!done) {
                    if (element == 1) {
                        border = i
                        console.log(border)
                        done = true
                    }
                }
            }

        }

        return border
    }

    boxCollisions(left) {
        if (left) {
            if (this.x + this.calculateBorderLeft()  <= 0) {
                return false
            } else {
                return true
            }
        } else {
            if (this.x + this.calculateBorderRight() >= 9) {
                return false
            } else {
                return true
            }
        }
    }

    rotateLeft() {
        if (this.blockNum == 0 || this.blockNum == 4 || this.blockNum == 5) {
            if (this.blockRotation == 1) {
                this.blockRotation = 0
            } else {
                this.blockRotation = 1
            }
        } else if (this.blockNum == 7) {
            this.blockRotation = 0
        } else {

            this.blockRotation--
            if (this.blockRotation == -1) {
                this.blockRotation = 3
            }

        }

        this.updateArray()
    }
    move(dir) {
        switch (dir) {
            case (0):
                this.y++
                break;
            case (1):
                this.y--
                break;
            case (2):
                if (this.boxCollisions(false)) this.x++
                break;
            case (3):
                if (this.boxCollisions(true)) this.x--
                break;
        }
        game.clearLiveBoard()
        this.addTetramino()
        new Render(false)
    }
    rotateRight() {
        if (this.blockNum == 0 || this.blockNum == 5 || this.blockNum == 4) {
            if (this.blockRotation == 1) {
                this.blockRotation = 0
            } else {
                this.blockRotation = 1
            }
        } else if (this.blockNum == 7) {
            this.blockRotation = 0
        } else {
            this.blockRotation++
            if (this.blockRotation == 4) {
                this.blockRotation = 0
            }

        }
        this.updateArray()
    }

    addTetramino() {
        for (let i = 0; i < this.blocksPosition.length; i++) {
            for (let j = 0; j < this.blocksPosition[i].length; j++) {
                const element = this.blocksPosition[i][j];
                if (element != 0) {
                    window.liveBoard[this.y + i][this.x + j] = this.blockNum
                }
            }

        }
        window.liveBoard
    }

    place() {
        for (let i = 0; i < window.liveBoard.length; i++) {
            for (let j = 0; j < window.liveBoard[i].length; j++) {
                if (window.liveBoard[i][j] != -1) {
                    window.board[i][j] = this.blockNum
                }

            }
        }
        game.clearLiveBoard()
        new Render(false)
        new Render(true)
        game.newTetramino()
    }

    updateArray() {
        switch (this.blockNum) {
            case 0:
                switch (this.blockRotation) {
                    case 0:
                        this.blocksPosition = [
                            [0, 0, 0, 0],
                            [1, 1, 1, 1],
                            [0, 0, 0, 0],
                            [0, 0, 0, 0]
                        ];
                        break;
                    case 1:
                        this.blocksPosition = [
                            [0, 0, 1, 0],
                            [0, 0, 1, 0],
                            [0, 0, 1, 0],
                            [0, 0, 1, 0],
                        ];
                        break;
                }
                break;

            case 1:
                switch (this.blockRotation) {
                    case 0:
                        this.blocksPosition = [
                            [0, 0, 0],
                            [1, 1, 1],
                            [0, 1, 0]
                        ];
                        break;
                    case 1:
                        this.blocksPosition = [
                            [0, 1, 0],
                            [1, 1, 0],
                            [0, 1, 0]
                        ];
                        break;
                    case 2:
                        this.blocksPosition = [
                            [0, 0, 0],
                            [0, 1, 0],
                            [1, 1, 1]
                        ];
                        break;
                    case 3:
                        this.blocksPosition = [
                            [0, 1, 0],
                            [0, 1, 1],
                            [0, 1, 0]
                        ];
                        break;
                }
                break;
            case 2:
                switch (this.blockRotation) {
                    case 0:
                        this.blocksPosition = [
                            [0, 0, 0],
                            [1, 1, 1],
                            [1, 0, 0]
                        ];
                        break;
                    case 1:
                        this.blocksPosition = [
                            [1, 1, 0],
                            [0, 1, 0],
                            [0, 1, 0]
                        ];
                        break;
                    case 2:
                        this.blocksPosition = [
                            [0, 0, 0],
                            [0, 0, 1],
                            [1, 1, 1]
                        ];
                        break;
                    case 3:
                        this.blocksPosition = [
                            [0, 1, 0],
                            [0, 1, 0],
                            [0, 1, 1]
                        ];
                        break;
                }
                break;
            case 3:
                switch (this.blockRotation) {
                    case 0:
                        this.blocksPosition = [
                            [0, 0, 0],
                            [1, 1, 1],
                            [0, 0, 1]
                        ];
                        break;
                    case 1:
                        this.blocksPosition = [
                            [0, 1, 0],
                            [0, 1, 0],
                            [1, 1, 0]
                        ];
                        break;
                    case 2:
                        this.blocksPosition = [
                            [0, 0, 0],
                            [1, 0, 0],
                            [1, 1, 1]
                        ];
                        break;
                    case 3:
                        this.blocksPosition = [
                            [0, 1, 1],
                            [0, 1, 0],
                            [0, 1, 0]
                        ];
                        break;
                }
                break;
            case 4:
                switch (this.blockRotation) {
                    case 0:
                        this.blocksPosition = [
                            [0, 0, 0],
                            [0, 1, 1],
                            [1, 1, 0]
                        ];
                        break;
                    case 1:
                        this.blocksPosition = [
                            [1, 0, 0],
                            [1, 1, 0],
                            [0, 1, 0]
                        ];
                        break;
                }
                break;
            case 5:
                switch (this.blockRotation) {
                    case 0:
                        this.blocksPosition = [
                            [0, 0, 0],
                            [1, 1, 0],
                            [0, 1, 1]
                        ];
                        break;
                    case 1:
                        this.blocksPosition = [
                            [0, 0, 1],
                            [0, 1, 1],
                            [0, 1, 0]
                        ];
                        break;
                }
                break;
            case 6:
                this.blocksPosition = [
                    [0, 1, 1, 0],
                    [0, 1, 1, 0]
                ];
                break;
        }
        //console.log(this.blockRotation)
        game.clearLiveBoard()
        this.addTetramino()
        new Render(false)
    }
}