class Render {
    constructor(bol) {
        //window.fallyBoisArray = [];
        if (bol) {
            // console.log(window.board)
            // console.log(window.oldBoard)
            for (let i = 0; i < window.board.length; i++) {
                for (let j = 0; j < window.board[i].length; j++) {
                    const element = window.board[i][j];
                    // console.log(element,window.oldBoard[i][j] );
                    
                    if (element != window.oldBoard[i][j]) {
                        
                        if (element != -1) {
                            if(window.oldBoard[i][j]!=-1){
                                window.scene.remove(window.board3d[i][j])
                            }
                            let piece = new Piece(element)
                            piece.name = "staticBoy"
                            piece.position.y = 210 - 10 * i
                            piece.position.x = 10 * j
                            window.scene.add(piece)
                            // window.staticBoisArray.push(piece)
                            window.board3d[i][j] = piece
                            // console.log(window.board3d[i][j])
                        } else {
                            window.scene.remove(window.board3d[i][j])

                        }
                        window.oldBoard[i][j]=element
                    }

                }
            }

            // window.fallyBoisArray.forEach(element => {
            //     window.scene.remove(element)
            // });
            // window.oldBoard = window.board.slice()
        } else {


            for (let i = 0; i < window.liveBoard.length; i++) {
                for (let j = 0; j < window.liveBoard[i].length; j++) {
                    const element = window.liveBoard[i][j];
                    if (element != -1) {
                        let piece = new Piece(element)
                        piece.name = "fallyBoy"
                        piece.position.y = 210 - 10 * i
                        piece.position.x = 10 * j
                        window.scene.add(piece)
                        window.fallyBoisArray.push(piece)
                    }
                }
            }

            window.ghost = new Ghost()
        }
        return window.board
    }
}