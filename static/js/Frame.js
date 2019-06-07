class Frame extends THREE.Object3D{
    constructor(){
        super()
        let frameUDgeometry = new THREE.BoxGeometry(110, 5, 9 );

        let frameDown = new THREE.Mesh( frameUDgeometry, settings.normalMaterial );
        frameDown.position.y = -7.5;
        this.add(frameDown)

        let frameUp = new THREE.Mesh( frameUDgeometry, settings.normalMaterial);
        frameUp.position.y = 202;
        this.add(frameUp)

        let frameLRgeometry = new THREE.BoxGeometry(5,208,9)

        let frameLeft = new THREE.Mesh( frameLRgeometry, settings.normalMaterial);
        frameLeft.position.x = -52.5;
        frameLeft.position.y = 98;
        this.add(frameLeft)
        
        let frameRight = new THREE.Mesh( frameLRgeometry, settings.normalMaterial);
        frameRight.position.x = 52.5;
        frameRight.position.y = 98;
        this.add(frameRight)
        
        var material = new THREE.MeshLambertMaterial({
            color: 0x30bced,
            transparent: true,
            opacity: 0.05
        })

        var mesh = new THREE.Mesh(settings.ghostGeometry, material)

        for (let i = 1; i < game.board.length; i++) {
            for (let j = 0; j < game.board[i].length; j++) {

                let piece = mesh.clone()
                piece.name = "bgBoy"
                piece.position.y = 210 - 10 * i
                piece.position.x = 10 * j -45// + 200 * window.xOffset
                piece.position.z = -10
                this.add(piece)
                // window.staticBoisArray.push(piece)
                // console.log(game.board3d[i][j])



            }
        }
        
    }
}