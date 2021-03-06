class Frame extends THREE.Object3D {
    constructor(player) {
        super()
        let frameUDgeometry = new THREE.BoxGeometry(110, 5, 13);

        let frameDown = new THREE.Mesh(frameUDgeometry, settings.frameMaterial);
        frameDown.position.y = -7.5;
        this.add(frameDown)

        let frameUp = new THREE.Mesh(frameUDgeometry, settings.frameMaterial);
        frameUp.position.y = 201;
        this.add(frameUp)

        let frameLRgeometry = new THREE.BoxGeometry(5, 208, 13)

        let frameLeft = new THREE.Mesh(frameLRgeometry, settings.frameMaterial);
        frameLeft.position.x = -52.5;
        frameLeft.position.y = 98;
        this.add(frameLeft)

        let frameRight = new THREE.Mesh(frameLRgeometry, settings.frameMaterial);
        frameRight.position.x = 52.5;
        frameRight.position.y = 98;
        this.add(frameRight)

        

        
        
        var material = new THREE.MeshLambertMaterial({
            color: 0x30bced,
            transparent: true,
            opacity: 0.05,

            clippingPlanes: [window.localPlane],
            clipShadows: true
        })

        var mesh = new THREE.Mesh(settings.ghostGeometry, material)

        for (let i = 1; i < game.board.length; i++) {
            for (let j = 0; j < game.board[i].length; j++) {

                let piece = mesh.clone()
                piece.name = "bgBoy"
                piece.position.y = 210 - 10 * i
                piece.position.x = 10 * j - 45// + 200 * window.xOffset
                piece.position.z = -10
                this.add(piece)
                // window.staticBoisArray.push(piece)
                // console.log(game.board3d[i][j])



            }
        }

    }
}