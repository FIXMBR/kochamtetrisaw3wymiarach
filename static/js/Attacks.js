class Attacks {
    constructor() {
        this.attackBoys = []
        window.client.on('updateAttacks', function (data) {
            attacks.displayAttacks(data.attacks)
        })
        window.client.on('attack', function (data) {

            if (data.id != window.xOffset) {
                window.ui.showAtakowany()

            }
            
            for (let i = 0; i < window.playerNum; i++) {
                if (data.id != i) {
                    const element = window.playerNum[i];
                    let sprite = settings.attackAnimationSprite.clone()
                    sprite.position.y = 210 - 10 * data.lines[0]
                    sprite.position.x = 45 + window.offsetAmount * data.id
                    sprite.position.z = 7 + Math.random()
                    window.scene.add(sprite)
                    //console.log(sprite)
                    //directionVect = clickedVect.clone().sub(player.getPlayerCont().position).normalize()
                    let dirVect = new THREE.Vector3(window.offsetAmount * i + 10, 215, 8)
                    let sprite2 = settings.clearSprite.clone()
                    sprite2.scale.set(2, 2, 1.0);
                    sprite.add(sprite2)

                    let animation = {
                        data: {
                            sprite: sprite,
                            dirVect: dirVect,
                            id: data.id,
                            directionVect: dirVect.clone().sub(sprite.position).normalize(),
                            time: 0,
                            attacks: [...data.attacks]
                        },
                        animate: function (data, dt) {

                            //sprite.translateY((dt / 30) * (data.y - data.oldY))

                            sprite.translateOnAxis(data.directionVect, data.time / 5 + 3)
                            if (sprite.position.y > 220) {
                                sprite.translateX(dirVect.x)
                                sprite.translateY(dirVect.y)
                                sprite.translateZ(dirVect.z)
                            }

                            if (sprite.position.clone().distanceTo(dirVect) < 15) {
                                for (let j = 0; j < game.animations.length; j++) {
                                    const element = game.animations[j];
                                    if (element.data.sprite == data.sprite) {
                                      //console.log('aaaaa')
                                        window.attacks.displayAttacks(data.attacks)
                                        game.animations.splice(j, 1)
                                        scene.remove(sprite)
                                        window.client.emit('updateAttacks')
                                        break;
                                    }
                                }
                            }

                            // if (data.time > 200) {


                            // }
                            data.time += dt / 10
                        }
                    }
                    game.animations.push(animation)
                }
            }

        })
        window.client.on('attackCombo', function (data) {
            // if (data.id != window.xOffset) {
            //     game.attacks += data.lines.length - 1

            // }

            for (let i = 0; i < window.playerNum; i++) {
                if (data.id != i) {
                  //console.log('comboATTACK!!!')
                    const element = window.playerNum[i];
                    let sprite = settings.attackAnimationSprite.clone()
                    sprite.position.y = 110 - 5 * data.lines
                    sprite.position.x = 45 + window.offsetAmount * data.id
                    sprite.position.z = 7 + Math.random()
                    window.scene.add(sprite)
                    //console.log(sprite)
                    //directionVect = clickedVect.clone().sub(player.getPlayerCont().position).normalize()
                    let dirVect = new THREE.Vector3(window.offsetAmount * i + 10, 215, 8)
                    let sprite2 = settings.clearSprite.clone()
                    sprite2.scale.set(2, 2, 1.0);
                    sprite.add(sprite2)

                    let animation = {
                        data: {
                            sprite: sprite,
                            dirVect: dirVect,
                            id: data.id,
                            directionVect: dirVect.clone().sub(sprite.position).normalize(),
                            time: 0,
                            attacks: [...data.attacks]
                        },
                        animate: function (data, dt) {

                            //sprite.translateY((dt / 30) * (data.y - data.oldY))

                            sprite.translateOnAxis(data.directionVect, data.time / 5 + 3)
                            if (sprite.position.y > 220) {
                                sprite.translateX(dirVect.x)
                                sprite.translateY(dirVect.y)
                                sprite.translateZ(dirVect.z)
                            }

                            if (sprite.position.clone().distanceTo(dirVect) < 15) {
                                for (let j = 0; j < game.animations.length; j++) {
                                    const element = game.animations[j];
                                    if (element.data.sprite == data.sprite) {
                                      //console.log('bbbbb')
                                        window.attacks.displayAttacks(data.attacks)
                                        game.animations.splice(j, 1)
                                        scene.remove(sprite)
                                        window.client.emit('updateAttacks')

                                        break;
                                    }
                                }
                            }

                            // if (data.time > 200) {


                            // }
                            data.time += dt / 10
                        }
                    }
                    game.animations.push(animation)
                }
            }

        })
        window.client.on('defend', function (data) {
            let sprite = settings.attackAnimationSprite.clone()
            sprite.position.y = 210 - 10 * data.lines[0]
            sprite.position.x = 45 + window.offsetAmount * data.id
            sprite.position.z = 7 + Math.random()
            window.scene.add(sprite)
          //console.log(sprite)
            //directionVect = clickedVect.clone().sub(player.getPlayerCont().position).normalize()
            let dirVect = new THREE.Vector3(window.offsetAmount * data.id + 10, 215, 8)
            let sprite2 = settings.clearSprite.clone()
            sprite2.scale.set(2, 2, 1.0);
            sprite.add(sprite2)

            let animation = {
                data: {
                    sprite: sprite,
                    dirVect: dirVect,
                    id: data.id,
                    directionVect: dirVect.clone().sub(sprite.position).normalize(),
                    time: 0,
                    attacks: [...data.attacks]
                },
                animate: function (data, dt) {

                    //sprite.translateY((dt / 30) * (data.y - data.oldY))

                    sprite.translateOnAxis(data.directionVect, data.time / 5 + 3)
                    if (sprite.position.y > 220) {
                        sprite.translateX(dirVect.x)
                        sprite.translateY(dirVect.y)
                        sprite.translateZ(dirVect.z)
                    }

                    if (sprite.position.clone().distanceTo(dirVect) < 15) {
                        for (let j = 0; j < game.animations.length; j++) {
                            const element = game.animations[j];
                            if (element.data.sprite == data.sprite) {
                              //console.log('ccccc')
                                window.attacks.displayAttacks(data.attacks)
                                game.animations.splice(j, 1)
                                scene.remove(sprite)
                                window.client.emit('updateAttacks')


                                break;
                            }
                        }
                    }

                    // if (data.time > 200) {


                    // }
                    data.time += dt / 10
                }
            }
            game.animations.push(animation)



        })
    }

    attack(linesNum) {
        window.client.emit("attack", {
            lines: linesNum
        })
    }

    sendCombo() {
        window.client.emit("combo", {
            combo: game.combo
        })
        game.combo = -1
    }

    displayAttacks(attacks) {
      //console.log(attacks)
        this.attackBoys.forEach(attack => {
            window.scene.remove(attack)
        })
        this.attackBoys = []
        x=0
        attacks.forEach(player => {
          //console.log('anime')
            for (let i = 0; i < player.attack; i++) {
                let piece = noclipPieces[7].clone()
                let sprite2 = settings.clearSprite.clone()
                    sprite2.scale.set(25,25, 1.0);
                    piece.add(sprite2)
                piece.name = "attackBoy"
                piece.position.y = 220
                piece.position.x = 17 * i + window.offsetAmount * x
                window.scene.add(piece)
                // window.staticBoisArray.push(piece)
                this.attackBoys.push(piece)
            }
            x++
        });
    }
}