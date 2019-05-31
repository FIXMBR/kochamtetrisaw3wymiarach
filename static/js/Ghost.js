class Ghost {
    constructor() {
        this.x = tetramino.x
        this.y = 0
        console.log(window.board.length)
        this.blocksPosition = tetramino.blocksPosition
        for (let height = window.tetramino.y; height < window.board.length - 1; height++) {
            for (let i = this.blocksPosition.length - 1; i >= 0; i--) {
                for (let j = 0; j < this.blocksPosition[i].length; j++) {
                    if (this.blocksPosition[i][j] == 1) {
                        if (this.blocksPosition.length-i-1 + height >= window.board.length-1) {
                            if (this.y < height - 1) {
                                this.y = height - 1
                                console.log('uwu');
                                console.log("data " + height + " i: " + i + " j: " + j + " abominacja: " + (this.blocksPosition.length-i-1))
                            }

                        } else if (window.board[this.blocksPosition.length-i -1+ height][j + this.x] != -1) {
                            if (this.y < height - 1) {
                                this.y = height - 1
                                console.log('owo');
                                console.log("data "+ height + " i: " + i + " j: " + j + " abominacja: " + (this.blocksPosition.length-i-1))

                            }

                            //console.log("ghosty ghost: " + (i + height) + " " + (window.board[i + height][j]))

                        } 
                    }
                }

            }
        }
        console.log(this.y)
        for (let i = 0; i < this.blocksPosition.length; i++) {
            for (let j = 0; j < this.blocksPosition[i].length; j++) {
                const element = this.blocksPosition[i][j];
                if (element != 0) {
                    let piece = new Piece('ghost')
                    piece.name = "ghostyBoy"
                    piece.position.y = 200 - 10 * i - 10 * this.y
                    piece.position.x = 10 * j + 10 * this.x
                    window.scene.add(piece)
                    window.fallyBoisArray.push(piece)
                }
            }
        }
    }

}
