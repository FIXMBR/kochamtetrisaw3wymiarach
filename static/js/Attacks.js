class Attacks {
    constructor() {
        this.attackBoys=[]
        window.client.on('updateAttacks',function (data){
            attacks.displayAttacks(data.attacks)
        })
        window.client.on('attack', function (data) {
            // if (data.id != window.xOffset) {
            //     game.attacks += data.lines.length - 1

            // }
            attacks.displayAttacks(data.attacks)
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
                    let dirVect = new THREE.Vector3(window.offsetAmount * i + 20, 215, 8)


                    let animation = {
                        data: {
                            sprite: sprite,
                            dirVect: dirVect,
                            id: data.id,
                            directionVect: dirVect.clone().sub(sprite.position).normalize(),
                            time: 0
                        },
                        animate: function (data, dt) {

                            //sprite.translateY((dt / 30) * (data.y - data.oldY))

                            sprite.translateOnAxis(data.directionVect, data.time / 5 + 2)
                            if (sprite.position.y > 220) {
                                sprite.translateX(dirVect.x)
                                sprite.translateY(dirVect.y)
                                sprite.translateZ(dirVect.z)
                            }

                            if (sprite.position.clone().distanceTo(dirVect) < 1) {
                                for (let j = 0; j < game.animations.length; j++) {
                                    const element = game.animations[j];
                                    if (element.data.sprite == data.sprite) {
                                        game.animations.splice(j, 1)
                                        scene.remove(sprite)
                                        break;
                                    }
                                }
                            }

                            // if (data.time > 200) {


                            // }
                            data.time += dt / 20
                        }
                    }
                    game.animations.push(animation)
                }
            }

        })
        window.client.on('defend', function (data) {
            attacks.displayAttacks(data.attacks)
            let sprite = settings.attackAnimationSprite.clone()
            sprite.position.y = 210 - 10 * data.lines[0]
            sprite.position.x = 45 + window.offsetAmount * data.id
            sprite.position.z = 7 + Math.random()
            window.scene.add(sprite)
            console.log(sprite)
            //directionVect = clickedVect.clone().sub(player.getPlayerCont().position).normalize()
            let dirVect = new THREE.Vector3(window.offsetAmount * data.id + 20, 215, 8)


            let animation = {
                data: {
                    sprite: sprite,
                    dirVect: dirVect,
                    id: data.id,
                    directionVect: dirVect.clone().sub(sprite.position).normalize(),
                    time: 0
                },
                animate: function (data, dt) {

                    //sprite.translateY((dt / 30) * (data.y - data.oldY))

                    sprite.translateOnAxis(data.directionVect, data.time / 5 + 2)
                    if (sprite.position.y > 220) {
                        sprite.translateX(dirVect.x)
                        sprite.translateY(dirVect.y)
                        sprite.translateZ(dirVect.z)
                    }

                    if (sprite.position.clone().distanceTo(dirVect) < 1) {
                        for (let j = 0; j < game.animations.length; j++) {
                            const element = game.animations[j];
                            if (element.data.sprite == data.sprite) {
                                game.animations.splice(j, 1)
                                scene.remove(sprite)
                                break;
                            }
                        }
                    }

                    // if (data.time > 200) {


                    // }
                    data.time += dt / 20
                }
            }
            game.animations.push(animation)



        })
    }

    attack(linesNum) {
        window.client.emit("attack", {
            lines: linesNum,
        })
    }

    displayAttacks(attacks) {
        console.log(attacks)
        this.attackBoys.forEach(attack=>{
            window.scene.remove(attack)
        })
        this.attackBoys = []
        attacks.forEach(player => {
            console.log('sram')
            for (let i = 0; i < player.attack; i++) {
                let piece = noclipPieces[7].clone()
                piece.name = "attackBoy"
                piece.position.y = 220 
                piece.position.x = 17 * i + window.offsetAmount * player.id
                window.scene.add(piece)
                // window.staticBoisArray.push(piece)
                this.attackBoys.push(piece)
            }
        });
    }
}