class Render {
    constructor(bol) {
        //game.fallyBoisArray = [];
        if (bol) {
            // console.log(game.board)
            // console.log(game.oldBoard)
            for (let i = 0; i < game.board.length; i++) {
                for (let j = 0; j < game.board[i].length; j++) {
                    const element = game.board[i][j];
                    // console.log(element,game.oldBoard[i][j] );
                    
                    if (element != game.oldBoard[i][j]) {
                        
                        if (element != -1) {
                            if(game.oldBoard[i][j]!=-1){
                                window.scene.remove(game.board3d[i][j])
                            }
                            let piece = new Piece(element)
                            piece.name = "staticBoy"
                            piece.position.y = 210 - 10 * i
                            piece.position.x = 10 * j +200 *window.xOffset
                            window.scene.add(piece)
                            // window.staticBoisArray.push(piece)
                            game.board3d[i][j] = piece
                            // console.log(game.board3d[i][j])
                        } else {
                            window.scene.remove(game.board3d[i][j])

                        }
                        game.oldBoard[i][j]=element
                    }

                }
            }

            // game.fallyBoisArray.forEach(element => {
            //     window.scene.remove(element)
            // });
            // game.oldBoard = game.board.slice()
        } else {


            for (let i = 0; i < game.liveBoard.length; i++) {
                for (let j = 0; j < game.liveBoard[i].length; j++) {
                    const element = game.liveBoard[i][j];
                    if (element != -1) {
                        let piece = new Piece(element)
                        piece.name = "fallyBoy"
                        piece.position.y = 210 - 10 * i
                        piece.position.x = 10 * j +200 *window.xOffset
                        window.scene.add(piece)
                        game.fallyBoisArray.push(piece)
                    }
                }
            }

            window.ghost = new Ghost()
        }
        return game.board
    }
}