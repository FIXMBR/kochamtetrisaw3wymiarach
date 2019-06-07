class Hold {
    constructor() {

    }
    changePiece(num) {
        for (let i = 0; i < holdArr.length; i++) {
            for (let j = 0; j < holdArr[i].length; j++) {
                const element = holdArr[i][j];
                // console.log(element,game.oldBoard[i][j] );
if(element!=-1){}
                    window.scene.remove(game.board3d[i][j])
                
                let piece = new Piece(element)
                piece.name = "staticBoy"
                piece.position.y = 210 - 10 * i
                piece.position.x = 10 * j + 200 * window.xOffset
                window.scene.add(piece)
                // window.staticBoisArray.push(piece)
                // console.log(game.board3d[i][j])

            }
        }
    }
}