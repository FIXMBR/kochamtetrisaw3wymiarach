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
        //console.log(this.blocksPosition);
        //console.log(this.x);
        let done = false
        let border = 0
        for (let i = 0; i < this.blocksPosition[0].length; i++) {
            for (let j = 0; j < this.blocksPosition.length; j++) {
                const element = this.blocksPosition[j][i];
                if (!done) {
                    if (element == 1) {
                        border = i
                        //console.log(border)
                        done = true
                    }
                }
            }

        }

        return border
    }
    calculateBorderBottom() {
        let done = false
        let border = 0
        for (let i = this.blocksPosition.length - 1; i >= 0; i--) {
            for (let j = 0; j < this.blocksPosition[i].length; j++) {
                const element = this.blocksPosition[i][j]
                if (!done) {
                    if (element == 1) {
                        border = i - 1
                        //console.log(border)
                        done = true
                    }
                }
            }

        }
        return border
    }
    tetraminoCollision(callback) {
        let collision = false
        for (let i = window.liveBoard.length - 1; i > 0; i--) {
            for (let j = 0; j < window.liveBoard[i].length; j++) {
                const element = window.liveBoard[i][j];
                //console.log(element)
                if (element != -1) {
                    if (window.board[i][j] != -1) {
                        collision = true
                    }
                }
            }

        }
        if (collision) {
            callback(false)
            console.log(false)
        } else {
            callback(true)
            console.log(true)
        }
    }

    hekForLines() {
        let linesTab = []
        for (let i = 0; i < window.board.length; i++) {
            let lineFull = true;
            for (let j = 0; j < window.board[i].length; j++) {
                if (window.board[i][j] == -1) {
                    lineFull = false;
                    //console.log(i,j)
                }
                //const element = window.board[i][j];
                //console.log(window.board[i][j])
            }
            if (lineFull) linesTab.push(i)
        }
        console.log(linesTab)
        linesTab.forEach(line => {
            window.board.splice(line, 1)
            let nl = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
            window.board.unshift(nl)
        });
    }

    boxCollisions(direction) {
        switch (direction) {
            case "left":
                if (this.x + this.calculateBorderLeft() <= 0) {
                    return false
                } else {
                    return true
                }

            case "right":
                if (this.x + this.calculateBorderRight() >= 9) {
                    return false

                } else {
                    return true
                }

            case "bottom":
                if (this.y + this.calculateBorderBottom() >= 19) {
                    return false
                } else {
                    return true

                }

        }


    }

    tetraminoRotationCollision(dir){
        switch (dir) {
            case "left":
                if (this.x + this.calculateBorderLeft() <= 0) {
                    return false
                } else {
                    return true
                }

            case "right":
                if (this.x + this.calculateBorderRight() >= 9) {
                    return false

                } else {
                    return true
                }

        }
    }


    rotateLeft() {
        if (this.blockNum == 7) {
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
        let didAction
        switch (dir) {
            case (0):
                if (this.boxCollisions("bottom")) {
                    this.y++
                    didAction = 0
                }
                break;
            case (1):
                this.y--
                break;
            case (2):
                if (this.boxCollisions("right")) {
                    this.x++
                    didAction = 2
                }
                break;
            case (3):
                if (this.boxCollisions("left")) {
                    this.x--
                    didAction = 3
                }
                break;
        }
        game.clearLiveBoard()
        this.addTetramino()
        let _this = this
        this.tetraminoCollision(function (result) {
            if (result) {
                new Render(false)
            } else {
                switch (didAction) {
                    case (0):
                        _this.y--
                        break;
                    case (1):
                        _this1.y++
                        break;
                    case (2):
                        _this.x--
                        break;
                    case (3):
                        _this.x++
                        break;
                }
                game.clearLiveBoard()
                _this.addTetramino()
                new Render(false)
            }
        })
    }
    rotateRight() {

        if (this.blockNum == 7) {
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
        //window.liveBoard
        //this.hekForLines()
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
        game.clearStaticBoard3D()
        this.hekForLines()
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
                    case 2:
                        this.blocksPosition = [
                            [0, 0, 0, 0],
                            [0, 0, 0, 0],
                            [1, 1, 1, 1],
                            [0, 0, 0, 0]
                        ];
                        break;
                    case 3:
                        this.blocksPosition = [
                            [0, 1, 0, 0],
                            [0, 1, 0, 0],
                            [0, 1, 0, 0],
                            [0, 1, 0, 0],
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
                            [0, 1, 0],
                            [1, 1, 1],
                            [0, 0, 0]
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
                            [0, 0, 1],
                            [1, 1, 1],
                            [0, 0, 0]
                        ];
                        break;
                    case 1:
                        this.blocksPosition = [
                            [0, 1, 0],
                            [0, 1, 0],
                            [0, 1, 1]
                        ];
                        break;
                    case 2:
                        this.blocksPosition = [
                            [0, 0, 0],
                            [1, 1, 1],
                            [1, 0, 0]
                        ];
                        break;
                    case 3:
                        this.blocksPosition = [
                            [1, 1, 0],
                            [0, 1, 0],
                            [0, 1, 0]
                        ];
                        break;


                }
                break;
            case 3:
                switch (this.blockRotation) {
                    case 0:
                        this.blocksPosition = [
                            [1, 0, 0],
                            [1, 1, 1],
                            [0, 0, 0]
                        ];
                        break;
                    case 1:
                        this.blocksPosition = [
                            [0, 1, 1],
                            [0, 1, 0],
                            [0, 1, 0]
                        ];
                        break;
                    case 2:
                        this.blocksPosition = [
                            [0, 0, 0],
                            [1, 1, 1],
                            [0, 0, 1]
                        ];
                        break;
                    case 3:
                        this.blocksPosition = [
                            [0, 1, 0],
                            [0, 1, 0],
                            [1, 1, 0]
                        ];
                        break;

                }
                break;
            case 4:
                switch (this.blockRotation) {
                    case 0:
                        this.blocksPosition = [
                            [0, 1, 1],
                            [1, 1, 0],
                            [0, 0, 0]
                        ];
                        break;
                    case 1:
                        this.blocksPosition = [
                            [0, 1, 0],
                            [0, 1, 1],
                            [0, 0, 1]
                        ];
                        break;
                    case 2:
                        this.blocksPosition = [
                            [0, 0, 0],
                            [0, 1, 1],
                            [1, 1, 0]
                        ];
                        break;
                    case 3:
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
                            [1, 1, 0],
                            [0, 1, 1],
                            [0, 0, 0]
                        ];
                        break;
                    case 1:
                        this.blocksPosition = [
                            [0, 0, 1],
                            [0, 1, 1],
                            [0, 1, 0]
                        ];
                        break;
                    case 2:
                        this.blocksPosition = [
                            [0, 0, 0],
                            [1, 1, 0],
                            [0, 1, 1]
                        ];
                        break;
                    case 3:
                        this.blocksPosition = [
                            [0, 1, 0],
                            [1, 1, 0],
                            [1, 0, 0]
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