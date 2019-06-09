class Preview {
    constructor() {
        this.previewBoys = []
        this.prevArr = []
    }
    update() {
        this.previewBoys.forEach(boy => {
            window.scene.remove(boy)

        });
        this.previewBoys = []
        for (let x = 0; x <4; x++) {

            switch (parseInt(game.incomingTetraminos[x])) {
                case 0:

                    this.prevArr = [
                        [0, 0, 0, 0],
                        [1, 1, 1, 1]
                    ];
                    break;

                case 1:
                    this.prevArr = [
                        [0, 1, 0, 0],
                        [1, 1, 1, 0]

                    ];
                    break;
                case 2:
                    this.prevArr = [
                        [0, 0, 1, 0],
                        [1, 1, 1, 0]

                    ];
                    break;
                case 3:
                    this.prevArr = [
                        [1, 0, 0, 0],
                        [1, 1, 1, 0]

                    ];
                    break;
                case 4:
                    this.prevArr = [
                        [0, 1, 1, 0],
                        [1, 1, 0, 0]

                    ];
                    break;
                case 5:
                    this.prevArr = [
                        [1, 1, 0, 0],
                        [0, 1, 1, 0]

                    ];
                    break;
                case 6:
                    this.prevArr = [
                        [ 1, 1, 0],
                        [ 1, 1, 0]

                    ]
                    break;
            }


            for (let i = 0; i < this.prevArr.length; i++) {
                for (let j = 0; j < this.prevArr[i].length; j++) {
                    const element = this.prevArr[i][j];
                    if (element == 1) {
                        // console.log(element,game.oldBoard[i][j] );


                        let piece = noclipPieces[parseInt(game.incomingTetraminos[x])].clone()
                        piece.name = "prevBoy"
                        if (x == 0) {
                            piece.position.y = 210 - 10 * i 
                            piece.position.x = 10 * j + window.offsetAmount * window.xOffset + 112
                            
                        } else {
                            piece.position.y = 210 - 7 * i - 30 * x
                            piece.position.x = 7 * j + window.offsetAmount * window.xOffset + 112
                            piece.scale.set(0.7, 0.7, 0.7)
                        }
                        
                        window.scene.add(piece)
                        this.previewBoys.push(piece)
                        // window.staticBoisArray.push(piece)
                        // console.log(game.board3d[i][j])
                    }
                }
            }

        }
    }
}

