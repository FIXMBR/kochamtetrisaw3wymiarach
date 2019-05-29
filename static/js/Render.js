class Render {
    constructor(bol) {
        window.fallyBoisArray = [];
        if(bol){
            for (let i = 0; i < window.board.length; i++) {
                for (let j = 0; j < window.board[i].length; j++) {
                    const element = window.board[i][j];
                    if(element!=-1){
                        let piece = new Piece(element)
                       
                        piece.position.y = 200-10*i
                        piece.position.x = 10*j
                        window.scene.add(piece)
                    }
                }
            }
        }else{
            for (let i = 0; i < window.liveBoard.length; i++) {
                for (let j = 0; j < window.liveBoard[i].length; j++) {
                    const element = window.liveBoard[i][j];
                    if(element!=-1){
                        let piece = new Piece(element)
                        piece.name = "fallyBoy"
                        piece.position.y = 200-10*i
                        piece.position.x = 10*j
                        window.scene.add(piece)
                        window.fallyBoisArray.push(piece)
                    }
                }
            }
        }
        return window.board
    }
}