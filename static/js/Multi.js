class Multi {
    constructor() {
        this.boysArray = []
        this.board3dArray = []
        this.oldBoards=[]
        var _this=this
        window.client.on("playerMoved", function (data) {
            //console.log(data)
            while(_this.boysArray.length-1<data.id){
                _this.boysArray.push([])
            }
            _this.boysArray.forEach(element => {
                window.scene.remove(element)
            });
            for (let i = 0; i < data.blocksPosition.length; i++) {
                for (let j = 0; j < data.blocksPosition[i].length; j++) {
                    const element = data.blocksPosition[i][j];
                    if (element != 0) {
                        let piece = pieces[data.blockNum].clone()
                        piece.name = "multiBoy"
                        piece.position.y = 210 - 10 * i - 10 * data.y
                        piece.position.x = 10 * j + 10 * data.x + window.offsetAmount * data.id
                        window.scene.add(piece)
                        _this.boysArray.push(piece)
                    }
                }
            }
        })
        window.client.on("boardUpdate", function (data) {
            //console.log(data)

            while(_this.board3dArray.length-1<data.id){
                _this.board3dArray.push([
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null, null, null]
                ])
            }
            while(_this.oldBoards.length-1<data.id){
                _this.oldBoards.push([
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
                ])
            }

            for (let i = 0; i < data.board.length; i++) {
                for (let j = 0; j < data.board[i].length; j++) {
                    const element = data.board[i][j];
                    // //console.log(element,game.oldBoard[i][j] );

                    if (element != _this.oldBoards[data.id][i][j]) {

                        if (element != -1) {
                            if (_this.oldBoards[data.id][i][j] != -1) {
                                window.scene.remove(_this.board3dArray[data.id][i][j])
                            }
                            let piece = pieces[element].clone()
                            piece.name = "staticBoy"
                            piece.position.y = 210 - 10 * i
                            piece.position.x = 10 * j + window.offsetAmount * data.id
                            window.scene.add(piece)
                            // window.staticBoisArray.push(piece)
                            _this.board3dArray[data.id][i][j] = piece
                            // //console.log(_this.board3dArray[data.id][i][j])
                        } else {
                            window.scene.remove(_this.board3dArray[data.id][i][j])

                        }
                        _this.oldBoards[data.id][i][j] = element
                    }

                }
            }
        })
        window.client.on("animation", function (data) {
                let line = data.line
                for (let i = 0; i < _this.board3dArray[data.id][line].length; i++) {

                    window.scene.remove(_this.board3dArray[data.id][line][i])
                    ////console.log(piece)
                    _this.board3dArray[data.id][line][i] = new THREE.Mesh(settings.pieceGeometry, settings.clearMaterial)
                    //piece.material = settings.clearMaterial
    
                    _this.board3dArray[data.id][line][i].name = "staticBoy"
                    _this.board3dArray[data.id][line][i].position.y = 210 - 10 * line
                    _this.board3dArray[data.id][line][i].position.x = 10 * i + window.offsetAmount * data.id
                    const piece = _this.board3dArray[data.id][line][i];
                    window.scene.add(_this.board3dArray[data.id][line][i])
    
                    
                    let sprite = settings.clearSprite.clone()
                    sprite.scale.set(30, 30, 1.0);
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
                                
                                window.scene.remove(data.piece)
                                for (let j = 0; j < game.animations.length; j++) {
                                    const element = game.animations[j];
                                    if (element.data.piece == data.piece) {
                                        game.animations.splice(j, 1)
                                        break;
                                    }
                                }
    
                            }
                            data.time += dt
                        }
                    }
                    game.animations.push(animation)
    
                    //piece.add(sprite); // this centers the glow at the mesh
                    _this.oldBoards[data.id][line][i] = 8
                }
            
        })
        window.client.on("hardDrop", function (data) {
            for (let i = 0; i < data.blocksPosition.length; i++) {
                for (let j = 0; j < data.blocksPosition[i].length; j++) {
                    const element = data.blocksPosition[i][j];
                    if (element == 1) {
                        let sprite = settings.spriteOG.clone()
                        sprite.position.y = 210 - 10 * i - 10 * data.y + Math.random() + 10
                        sprite.position.x = 10 * j + 10 * data.x + window.offsetAmount * data.id + Math.random()
                        sprite.position.z = 7 + Math.random()
                        window.scene.add(sprite)
                        let animation = {
                            data: {
                                sprite: sprite,
                                id: i,
                                y: data.y,
                                oldY: data.oldY,
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
        
    })
    }
}