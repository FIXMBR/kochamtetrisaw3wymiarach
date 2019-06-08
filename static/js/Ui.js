class Ui {
    init() {
        this.net = new Net
        this.GetScoreClickListenerAdd()
        this.closeScoreClick()
    }

    GetScoreClickListenerAdd() {

        $('#btnGetScore').on("click", () => {
            this.showScore()
            console.log("getScoreClick")
            this.net.getScoreFromSrv()
        })
    }
    showScore() {
        $('#scoreDiv').show('slow');
    }

    closeScoreClick() {
        $('#btnCloseScore').on("click", () => {
            $('#scoreDiv').hide('slow');
            console.log("closeScoreClick")
        })
    }

    makeTable(data) {
        console.log(data)
        var byScore = data.slice(0)
        byScore.sort(function(a,b) {
            return b.score - a.score;
        });
        console.log(byScore)
        var table = "<table><tr>  <td></td> <td>PLAYER</td>  <td>SCORE</td> </tr>"
        
        byScore.forEach((element, index) => {
            var color = this.getRandomColor()
            table += `<tr style="color:${color}" > <td> ${index + 1}. </td>  <td> ${element.score} </td> <td> ${element.name} </td> </tr>`
            //console.log(element.name + "  " + element.score + " " + index)
        });
        table += "</table>"
        $("#scoreTable").html(table)
    }
    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}