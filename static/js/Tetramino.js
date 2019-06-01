class Tetramino {
    constructor(num) {
        this.blocksPosition = [];
        this.blockNum = num;
        this.blockRotation = 0;
        this.x = 3
        this.y = 0
        this.localLock = 500
        this.totalLock = 2000
        this.touching = false
        switch (this.blockNum) {
            case 0:

                this.blocksPosition = [
                    [1, 1, 1, 1],
                    [0, 0, 0, 0]
                ];
                break;

            case 1:
                this.blocksPosition = [
                    [0, 1, 0, 0],
                    [1, 1, 1, 0]

                ];
                break;
            case 2:
                this.blocksPosition = [
                    [0, 0, 1, 0],
                    [1, 1, 1, 0]

                ];
                break;
            case 3:
                this.blocksPosition = [
                    [1, 0, 0, 0],
                    [1, 1, 1, 0]

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
        for (let i = 0; i < this.blocksPosition.length; i++) {
            for (let j = 0; j < this.blocksPosition[i].length; j++) {
                const element = this.blocksPosition[i][j];
                //console.log(element)
                if (element != 0) {
                    if (window.board[this.y + i][this.x + j] != -1) {
                        collision = true
                    }
                }
            }
        }
        if (collision) {
            callback(false)
            //console.log(false)
        } else {
            callback(true)
            //console.log(true)
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
        //console.log(linesTab)
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
                if (this.y + this.calculateBorderBottom() >= 20) {
                    return false
                } else {
                    return true

                }

        }


    }

    tetraminoRotationCollision(dir) {
        let translationArray
        let blockRotation
        switch (dir) {
            case "left":
                if (this.blockNum == 0) {
                    translationArray = [
                        [[0, 0], [0, 1], [0, 2], [-1, 0], [2, 0], [-1, 2], [2, -1]],
                        [[0, 0], [0, 1], [0, 2], [2, 0], [-1, 0], [2, 1], [-1, -2]],
                        [[0, 0], [0, 1], [0, 2], [1, 0], [-2, 0], [1, -2], [-2, 1]],
                        [[0, 0], [0, 1], [0, 2], [-2, 0], [1, 0], [-2, -1], [1, 2]]
                    ]
                } else {
                    translationArray = [
                        [[0, 0], [0, 1], [1, 0], [1, 1], [0, -2], [1, -2]], //0>>3
                        [[0, 0], [0, 1], [1, 0], [1, -1], [0, 2], [1, 2]], //1>>0
                        [[0, 0], [0, 1], [-1, 0], [-1, 1], [0, -2], [-1, -2]], //2>>1
                        [[0, 0], [0, 1], [-1, 0], [-1, -1], [0, 2], [-1, 2]]//3>>2
                    ]
                }
                blockRotation = this.blockRotation
                if (this.blockNum == 7) {
                    this.blockRotation = 0
                } else {

                    this.blockRotation--
                    if (this.blockRotation == -1) {
                        this.blockRotation = 3
                    }

                }
                break
            case "right":
                if (this.blockNum == 0) {
                    translationArray = [
                        [[0, 0], [0, 1], [0, 2], [-2, 0], [1, 0], [-2, -1], [1, 2]],
                        [[0, 0], [0, 1], [0, 2], [-1, 0], [2, 0], [-1, 2], [2, -1]],
                        [[0, 0], [0, 1], [0, 2], [2, 0], [-1, 0], [2, 1], [-1, -2]],
                        [[0, 0], [0, 1], [0, 2], [1, 0], [-2, 0], [1, -2], [-2, 1]]
                    ]
                } else {
                    translationArray = [
                        [[0, 0], [0, 1], [-1, 0], [-1, 1], [0, -2], [-1, -2]], //0>>1
                        [[0, 0], [0, 1], [1, 0], [1, -1], [0, 2], [1, 2]], //1>>2
                        [[0, 0], [0, 1], [1, 0], [1, 1], [0, -2], [1, -2]], //2>>3
                        [[0, 0], [0, 1], [-1, 0], [-1, -1], [0, 2], [-1, 2]], //3>>0
                    ]
                }

                blockRotation = this.blockRotation
                if (this.blockNum == 7) {
                    this.blockRotation = 0
                } else {
                    this.blockRotation++
                    if (this.blockRotation == 4) {
                        this.blockRotation = 0
                    }

                }
                break
        }


        let collision = false
        let offsetX
        let offsetY

        
        if (this.blockNum == 0 && this.blocksPosition.length == 2){
            this.y -= 1
            
        }

        this.updateArray()

        for (let translation = 0; translation < 5; translation++) {
            collision = false
            offsetX = translationArray[blockRotation][translation][0]
            offsetY = translationArray[blockRotation][translation][1]

            //console.log('offsety: ' + offsetX + " " + offsetY)



            for (let i = 0; i < this.blocksPosition.length; i++) {
                for (let j = 0; j < this.blocksPosition[i].length; j++) {
                    const element = this.blocksPosition[i][j];
                    if (element != 0) {

                        if (this.y + i - offsetY < window.board.length) {
                            if(this.y + i - offsetY<0)offsetY--
                            if(this.y + i - offsetY<0)offsetY--
                            //console.log('sprawdzam dla x:' + (this.x + j + offsetX) + " y: " + (this.y + i - offsetY))
                            if (this.x + j + offsetX >= 0 && this.x + j + offsetX <= 10) {
                                //console.log(this.y + i - offsetY);
                                
                                if (window.board[this.y + i - offsetY][this.x + j + offsetX] != -1) {
                                    collision = true
                                    //console.log('kolizja w x:' + (this.x + j + offsetX) + " y: " + (this.y - i - offsetY))
                                }
                            } else {
                                collision = true
                            }
                        } else {
                            collision = true
                        }
                    }
                }

            }
            if (!collision) {
                this.x += offsetX
                this.y -= offsetY
                break
            }

        }
        
        this.blockRotation = blockRotation
        return !collision

    }

    rotateRight() {
        // console.log(this.blockRotation);

        if (this.tetraminoRotationCollision('right')) {
            if (this.blockNum == 7) {
                this.blockRotation = 0
            } else {
                this.blockRotation++
                if (this.blockRotation == 4) {
                    this.blockRotation = 0
                }

            }
        } else {
            //console.log('collision');

        }

        this.updateArray()
        //     if (this.blockNum == 7) {
        //         this.blockRotation = 0
        //     } else {

        //         this.blockRotation--
        //         if (this.blockRotation == -1) {
        //             this.blockRotation = 3
        //         }

        //     }

        //     this.updateArray()
        // }

        //console.log(this.blockRotation);
        game.clearLiveBoard()
        this.addTetramino()
        new Render(false)
    }

    rotateLeft() {
        if (this.tetraminoRotationCollision('left')) {
            if (this.blockNum == 7) {
                this.blockRotation = 0
            } else {

                this.blockRotation--
                if (this.blockRotation == -1) {
                    this.blockRotation = 3
                }

            }
        } else {
            //console.log('collision');

        }
        this.updateArray()
        // 
        //     if (this.blockNum == 7) {
        //         this.blockRotation = 0
        //     } else {
        //         this.blockRotation++
        //         if (this.blockRotation == 4) {
        //             this.blockRotation = 0
        //         }

        //     }

        //     this.updateArray()
        // }
        game.clearLiveBoard()
        this.addTetramino()
        new Render(false)
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
                        _this.y++
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
    checkTouch() {
        this.touching = false
        for (let i = 0; i < this.blocksPosition.length; i++) {
            for (let j = 0; j < this.blocksPosition[i].length; j++) {
                const element = this.blocksPosition[i][j];
                //console.log(element)
                if (element != 0) {
                    if (this.y + i + 1 < window.board.length) {
                        // console.log(this.y + i + 1);

                        if (window.board[this.y + i + 1][this.x + j] != -1) {
                            this.touching = true
                        }
                    } else {
                        this.touching = true
                    }
                }
            }
        }
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
        this.checkTouch()
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

        game.newTetramino()
        new Render(false)
        new Render(true)

    }


    hardDrop() {
        //  console.log(window.ghost.hardDrop)

        this.y = window.ghost.hardDrop
        game.clearLiveBoard()
        this.addTetramino()
        this.place()




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
                            [0, 1, 0],
                            [1, 1, 1],
                            [0, 0, 0]
                        ];
                        break;
                    case 1:
                        this.blocksPosition = [
                            [0, 1, 0],
                            [0, 1, 1],
                            [0, 1, 0]
                        ];
                        break;
                    case 2:
                        this.blocksPosition = [
                            [0, 0, 0],
                            [1, 1, 1],
                            [0, 1, 0]
                        ];
                        break;
                    case 3:
                        this.blocksPosition = [
                            [0, 1, 0],
                            [1, 1, 0],
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
    }
}