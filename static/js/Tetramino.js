class Tetramino {
    constructor(num) {
        this.blocksPosition = [];
        this.blockNum = num;
        this.blockRotation = 0;
        this.x = 3
        this.y = 0
        this.localLock = 500
        this.totalLock = 4000
        this.touching = false
        this.adding = true;
        window.score = new Score()
        switch (this.blockNum) {
            case 0:

                this.blocksPosition = [
                    [0, 0, 0, 0],
                    [1, 1, 1, 1]
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
                    if (game.board[this.y + i][this.x + j] != -1) {
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
        for (let i = 0; i < game.board.length; i++) {
            let lineFull = true;
            for (let j = 0; j < game.board[i].length; j++) {
                if (game.board[i][j] == -1) {
                    lineFull = false;
                    //console.log(i,j)
                }
                //const element = game.board[i][j];
                //console.log(game.board[i][j])
            }
            if (lineFull) linesTab.push(i)
        }
        //console.log(linesTab)

        //console.log(linesTab)

        game.lines = [...linesTab]
        //console.log(game.lines.length)
        switch (game.lines.length) {
            case 1:
                window.score.singleAdd()
                break;
            case 2:
                window.score.doubleAdd()
                break;
            case 3:
                window.score.tripleAdd()
                break;
            case 4:
                window.score.tetrisAdd()
                break
        }
        // console.log(window.score.getScore())
    }

    clearLines(callback) {

        if (game.lines.length > 0)
            window.attacks.attack(game.lines)

        game.lines.forEach(line => {
            window.client.emit("animation", {
                line: line,
                animation: "clear"
            })
            window.client.emit("playerMovement", {
                blockNum: this.blockNum,
                blocksPosition: [],
                x: this.x,
                y: this.y
            })

            game.board.splice(line, 1)
            let nl = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
            game.board.unshift(nl)

            for (let i = 0; i < game.board3d[line].length; i++) {

                window.scene.remove(game.board3d[line][i])
                //console.log(piece)
                game.board3d[line][i] = new THREE.Mesh(settings.pieceGeometry, settings.clearMaterial)
                //piece.material = settings.clearMaterial

                game.board3d[line][i].name = "staticBoy"
                game.board3d[line][i].position.y = 210 - 10 * line
                game.board3d[line][i].position.x = 10 * i + window.offsetAmount * window.xOffset
                const piece = game.board3d[line][i];
                window.scene.add(game.board3d[line][i])

                let sprite = settings.clearSprite.clone()
                sprite.scale.set(50, 50, 1.0);
                piece.add(sprite); // this centers the glow at the mesh

                let animation = {
                    data: {
                        sprite: sprite,
                        piece: piece,
                        id: i,
                        time: 0
                    },
                    animate: function (data, dt) {

                        // if (data.frames < 8) {
                        //     data.sprite.opacity += 0.1
                        // } else {
                        //     data.sprite.opacity += 0.05
                        // }

                        piece.translateX((4.5 - data.id) * dt / 20)

                        if (data.time > 200) {
                            for (let j = 0; j < game.animations.length; j++) {
                                const element = game.animations[j];
                                if (element.data.piece == data.piece) {
                                    game.animations.splice(j, 1)
                                    window.client.emit("boardUpdate", {
                                        board: game.board,
                                    })
                                    break;

                                }
                            }

                        }
                        data.time += dt
                    }
                }
                game.animations.push(animation)

                // piece.add(sprite); // this centers the glow at the mesh
                game.oldBoard[line][i] = 8
                // window.client.emit("boardUpdate", {
                //     board:game.board,
                // })
            }
        });
        if (game.lines.length != 0) {
            game.lock = true
            window.ghost.newGhost()
            setTimeout(function () {

                callback()
            }, 200)
        } else {
            callback()
        }
        game.lines = []
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
                        [
                            [0, 0],
                            [0, 1],
                            [0, 2],
                            [-1, 0],
                            [2, 0],
                            [-1, 2],
                            [2, -1]
                        ],
                        [
                            [0, 0],
                            [0, 1],
                            [0, 2],
                            [2, 0],
                            [-1, 0],
                            [2, 1],
                            [-1, -2]
                        ],
                        [
                            [0, 0],
                            [0, 1],
                            [0, 2],
                            [1, 0],
                            [-2, 0],
                            [1, -2],
                            [-2, 1]
                        ],
                        [
                            [0, 0],
                            [0, 1],
                            [0, 2],
                            [-2, 0],
                            [1, 0],
                            [-2, -1],
                            [1, 2]
                        ]
                    ]
                } else {
                    translationArray = [
                        [
                            [0, 0],
                            [0, 1],
                            [1, 0],
                            [1, 1],
                            [0, -2],
                            [1, -2]
                        ], //0>>3
                        [
                            [0, 0],
                            [0, 1],
                            [1, 0],
                            [1, -1],
                            [0, 2],
                            [1, 2]
                        ], //1>>0
                        [
                            [0, 0],
                            [0, 1],
                            [-1, 0],
                            [-1, 1],
                            [0, -2],
                            [-1, -2]
                        ], //2>>1
                        [
                            [0, 0],
                            [0, 1],
                            [-1, 0],
                            [-1, -1],
                            [0, 2],
                            [-1, 2]
                        ] //3>>2
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
                        [
                            [0, 0],
                            [0, 1],
                            [0, 2],
                            [-2, 0],
                            [1, 0],
                            [-2, -1],
                            [1, 2]
                        ],
                        [
                            [0, 0],
                            [0, 1],
                            [0, 2],
                            [-1, 0],
                            [2, 0],
                            [-1, 2],
                            [2, -1]
                        ],
                        [
                            [0, 0],
                            [0, 1],
                            [0, 2],
                            [2, 0],
                            [-1, 0],
                            [2, 1],
                            [-1, -2]
                        ],
                        [
                            [0, 0],
                            [0, 1],
                            [0, 2],
                            [1, 0],
                            [-2, 0],
                            [1, -2],
                            [-2, 1]
                        ]
                    ]
                } else {
                    translationArray = [
                        [
                            [0, 0],
                            [0, 1],
                            [-1, 0],
                            [-1, 1],
                            [0, -2],
                            [-1, -2]
                        ], //0>>1
                        [
                            [0, 0],
                            [0, 1],
                            [1, 0],
                            [1, -1],
                            [0, 2],
                            [1, 2]
                        ], //1>>2
                        [
                            [0, 0],
                            [0, 1],
                            [1, 0],
                            [1, 1],
                            [0, -2],
                            [1, -2]
                        ], //2>>3
                        [
                            [0, 0],
                            [0, 1],
                            [-1, 0],
                            [-1, -1],
                            [0, 2],
                            [-1, 2]
                        ], //3>>0
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


        if (this.blockNum == 0 && this.blocksPosition.length == 2) {
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

                        if (this.y + i - offsetY < game.board.length) {
                            if (this.y + i - offsetY < 0) offsetY--
                            if (this.y + i - offsetY < 0) offsetY--
                            //console.log('sprawdzam dla x:' + (this.x + j + offsetX) + " y: " + (this.y + i - offsetY))
                            if (this.x + j + offsetX >= 0 && this.x + j + offsetX <= 10) {
                                //console.log(this.y + i - offsetY);

                                if (game.board[this.y + i - offsetY][this.x + j + offsetX] != -1) {
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
        window.Renderr.render(false)
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
        window.Renderr.render(false)
    }
    hold() {
        if (!game.heldNow) {
            game.heldNow = true
            if (game.heldNow != null) {
                let curr = this.blockNum
                let held = game.heldpiecie
                hold.changePiece(curr)
                game.heldpiecie = curr
                game.clearLiveBoard()
                game.newTetramino(held)
            } else {
                game.heldpiecie = this.blockNum
                game.clearLiveBoard()
                game.newTetramino()
            }
        }
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
                window.Renderr.render(false)
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
                window.Renderr.render(false)
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
                    if (this.y + i + 1 < game.board.length) {
                        // console.log(this.y + i + 1);

                        if (game.board[this.y + i + 1][this.x + j] != -1) {
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
        window.client.emit("playerMovement", {
            blockNum: this.blockNum,
            blocksPosition: this.blocksPosition,
            x: this.x,
            y: this.y
        })
        for (let i = 0; i < this.blocksPosition.length; i++) {
            for (let j = 0; j < this.blocksPosition[i].length; j++) {
                const element = this.blocksPosition[i][j];
                if (element != 0) {
                    game.liveBoard[this.y + i][this.x + j] = this.blockNum
                }
            }

        }
        //game.liveBoard
        //this.hekForLines()
        this.checkTouch()
        this.localLock = 500
    }

    addNewTetramino() {
        let collision = false
        for (let i = 0; i < this.blocksPosition.length; i++) {
            for (let j = 0; j < this.blocksPosition[i].length; j++) {
                const element = this.blocksPosition[i][j];
                if (element != 0) {
                    if (this.y + i <= 21) {
                        if (game.board[this.y + i][this.x + j] == -1 && game.liveBoard[this.y + i][this.x + j] == -1) {
                            //game.liveBoard[this.y + i][this.x + j] = this.blockNum
                        } else {
                            collision = true
                        }
                    } else {
                        collision = true
                    }
                }
            }

        }

        if (this.adding) {
            if (collision) {
                this.loss()
            } else {
                //this.adding po to żeby komunikat wyświetlał się tylko raz 

                for (let i = 0; i < this.blocksPosition.length; i++) {
                    for (let j = 0; j < this.blocksPosition[i].length; j++) {
                        const element = this.blocksPosition[i][j];
                        if (element != 0) {
                            if (game.board[this.y + i][this.x + j] == -1) {
                                game.liveBoard[this.y + i][this.x + j] = this.blockNum
                            }
                            this.localLock = 500
                        }
                    }

                }
            }
        }
        window.client.emit("playerMovement", {
            blockNum: this.blockNum,
            blocksPosition: this.blocksPosition,
            x: this.x,
            y: this.y
        })
        //game.liveBoard
        //this.hekForLines()
    }
    loss() {
        if (game.gameStarted) {
            game.playing = false
            game.lock = true
            game.ghostyBoisArray.forEach(element => {
                window.scene.remove(element)
            });
            this.adding = false;
            if (window.score.getScore() == 0) {
                //alert('Zera nie wysyłamy bo po co, naucz się grać gościu')
                // break;
            } else {
                //var epicGamerName = prompt("Twój wynik to:" + window.score.getScore() + " Wpisz swoje imię", "Shanita Faber");
                let epicGamerName = settings.name
                if (epicGamerName) {
                    //var net = new Net
                    window.net.sendScoreToSrv(epicGamerName, window.score.getScore())
                }
                //break;
            }
        }
    }
    place() {

        for (let i = 0; i < game.liveBoard.length; i++) {
            for (let j = 0; j < game.liveBoard[i].length; j++) {
                if (game.liveBoard[i][j] != -1) {
                    game.board[i][j] = this.blockNum
                }
            }
        }

        window.client.emit("place", {
        })

        // console.log('owo '+game.board)
        // console.log('uwu ' + game.oldBoard)


        game.clearLiveBoard()
        game.clearStaticBoard3D()
        this.hekForLines()

        window.Renderr.render(false)
        window.Renderr.render(true)

        this.clearLines(function () {
            game.newTetramino()
            game.lock = false
            window.Renderr.render(false)
            window.Renderr.render(true)
            //game.heldNow=false
        })
        game.heldNow = false
    }


    hardDrop() {

        //  console.log(window.ghost.hardDrop)

        let oldY = this.y
        this.y = window.ghost.hardDrop

        window.client.emit("hardDrop", {
            oldY: oldY,
            y: this.y,
            x: this.x,
            blocksPosition: this.blocksPosition
        })

        for (let i = 0; i < this.blocksPosition.length; i++) {
            for (let j = 0; j < this.blocksPosition[i].length; j++) {
                const element = this.blocksPosition[i][j];
                if (element == 1) {
                    let sprite = settings.spriteOG.clone()
                    sprite.position.y = 210 - 10 * i - 10 * this.y + Math.random() + 10
                    sprite.position.x = 10 * j + 10 * this.x + window.offsetAmount * window.xOffset + Math.random()
                    sprite.position.z = 7 + Math.random()
                    window.scene.add(sprite)
                    let animation = {
                        data: {
                            sprite: sprite,
                            id: i,
                            y: this.y,
                            oldY: oldY,
                            time: 0
                        },
                        animate: function (data, dt) {

                            if (data.time < 75) {
                                data.sprite.material.opacity += 0.1 * dt / 10
                            } else {
                                if (data.sprite.material.opacity > 1) {
                                    data.sprite.material.opacity = 1
                                }
                                data.sprite.material.opacity -= 0.015 * dt / 10
                            }
                            //console.log(data.sprite.material.opacity)
                            sprite.scale.set(33, (data.y - data.oldY) * 4, 1.0)
                            sprite.translateY((dt / 30) * (data.y - data.oldY))

                            if (data.time > 200) {
                                for (let j = 0; j < game.animations.length; j++) {
                                    const element = game.animations[j];
                                    if (element.data.sprite == data.sprite) {
                                        game.animations.splice(j, 1)
                                        scene.remove(sprite)
                                        break;
                                    }
                                }

                            }
                            data.time += dt
                        }
                    }
                    game.animations.push(animation)

                }
            }
        }



        game.clearLiveBoard()
        this.addTetramino()
        this.place()




    }
    resetTetramino(num) {
        this.blockNum = num
        this.blockRotation = 0;
        this.x = 3
        this.y = 0
        this.localLock = 500
        this.totalLock = 4000
        this.touching = false

        switch (this.blockNum) {
            case 0:

                this.blocksPosition = [
                    [0, 0, 0, 0],
                    [1, 1, 1, 1]
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