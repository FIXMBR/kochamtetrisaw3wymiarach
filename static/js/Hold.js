class Hold {
    constructor() {
        this.holdyBoysArray = []
    }
    changePiece(num) {
        switch (num) {
            case 0:

                this.holdArr = [
                    [0, 0, 0, 0],
                    [1, 1, 1, 1]
                ];
                break;

            case 1:
                this.holdArr = [
                    [0, 1, 0, 0],
                    [1, 1, 1, 0]

                ];
                break;
            case 2:
                this.holdArr = [
                    [0, 0, 1, 0],
                    [1, 1, 1, 0]

                ];
                break;
            case 3:
                this.holdArr = [
                    [1, 0, 0, 0],
                    [1, 1, 1, 0]

                ];
                break;
            case 4:
                this.holdArr = [
                    [0, 1, 1, 0],
                    [1, 1, 0, 0]

                ];
                break;
            case 5:
                this.holdArr = [
                    [1, 1, 0, 0],
                    [0, 1, 1, 0]

                ];
                break;
            case 6:
                this.holdArr = [
                    [0, 1, 1, 0],
                    [0, 1, 1, 0]

                ]
                break;
        }
        this.holdyBoysArray.forEach(boy => {
            window.scene.remove(boy)

        });
        this.holdyBoysArray = []
        for (let i = 0; i < this.holdArr.length; i++) {
            for (let j = 0; j < this.holdArr[i].length; j++) {
                const element = this.holdArr[i][j];
                if (element == 1) {
                    // console.log(element,game.oldBoard[i][j] );


                    let piece = new Piece(num,true)
                    piece.name = "holdBoy"
                    piece.position.y = 225 - 10 * i
                    piece.position.x = 10 * j + 200 * window.xOffset
                    window.scene.add(piece)
                    this.holdyBoysArray.push(piece)
                    // window.staticBoisArray.push(piece)
                    // console.log(game.board3d[i][j])
                }
            }
        }
    }
}