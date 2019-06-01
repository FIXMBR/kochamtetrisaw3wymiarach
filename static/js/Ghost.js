class Ghost {
    constructor() {
        window.ghostyBoisArray.forEach(element => {
            window.scene.remove(element)
        });

        this.x = tetramino.x
        this.y = tetramino.y
        this.blocksPosition = tetramino.blocksPosition

        let climax
        let loops = true

        let done = false
        let border = 0
        for (let i = this.blocksPosition.length - 1; i >= 0; i--) {
            for (let j = 0; j < this.blocksPosition[i].length; j++) {
                const element = this.blocksPosition[i][j]
                if (!done) {
                    if (element == 1) {
                        border = this.blocksPosition.length - i
                        done = true
                    }
                }
            }

        }
        //console.log(border)
        for (let h = tetramino.y; h < 22; h++) {
            if (loops) {
                for (let i = 0; i < tetramino.blocksPosition.length; i++) {
                    for (let j = 0; j < tetramino.blocksPosition[i].length; j++) {
                        if (tetramino.blocksPosition[i][j] == 1) {
                            if (h + i < window.board.length) {
                                if (window.board[h + i][tetramino.x + j] != -1) {

                                    climax = h - 1
                                    loops = false
                                    break

                                }
                            } else {
                                climax = 21 - tetramino.blocksPosition.length + border
                            }
                        }
                    }
                }
            }
        }

        this.hardDrop = climax
        //console.log(climax)


        for (let i = 0; i < this.blocksPosition.length; i++) {
            for (let j = 0; j < this.blocksPosition[i].length; j++) {
                const element = this.blocksPosition[i][j];
                if (element != 0) {
                    let piece = new Piece('ghost')
                    piece.name = "ghostyBoy"
                    piece.position.y = 210 - 10 * i - 10 * (climax)
                    piece.position.x = 10 * j + 10 * this.x
                    window.scene.add(piece)
                    window.ghostyBoisArray.push(piece)
                }
            }
        }





    }

}