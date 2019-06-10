class Net {
    constructor() {
        this.ui = new Ui
        //console.log(this.getHelpDataFromSrv("anime"))
        this.getHelpDataFromSrv("anime", function (data ) {
            console.log(data)
        })
    }
    sendScoreToSrv(name, score) {
        var that = this
        console.log(name, score)
        $.ajax({
            data: {
                "name": name,
                "score": score
            },
            url: "/sendScore",
            type: "POST",
            success: function (added) {
                console.log(added)
                if (added) {

                    that.getScoreFromSrv()
                    that.ui.showScore()
                }
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            }

        })
    }

    getScoreFromSrv() {
        //console.log("getScoreNet")
        var that = this
        $.ajax({
            data: {
                action: "getScore"
            },
            url: "/getScore",
            type: "POST",
            success: function (data) {

                //console.log(data)
                that.ui.makeTable(data)

            },
            error: function (xhr, status, error) {
                console.log(xhr);
            }

        })
    }

    getPlayersList() {
        var that = this
        $.ajax({
            data: {
                action: "getPlayers"
            },
            url: "/getPlayers",
            type: "POST",
            success: function (data) {

                //console.log(data)
                //console.log(data)
                var table = "<table><tr>  <td></td> <td>PLAYER</td>  <td>ID</td> </tr>";
                var red = 255
                var blue = 150
                var green = 255
                data.forEach((element, index) => {

                    table += `<tr style="color:rgb(${red},${green},${blue});" > <td> ${index + 1}. </td>  <td> ${
                        element
                        } </td> <td> ${element} </td> </tr>`;
                    red -= 40;
                    blue += 20;
                    green -= 5;

                });
                table += "</table>";
                $("#connectedPlayersTable").html(table);
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            }

        })
    }

    getHelpDataFromSrv(data, callback) {
        //console.log("getScoreNet")
        var that = this
        $.ajax({
            data: {
                name: data
            },
            url: "/getData",
            type: "POST",
            success: function (data) {

                //console.log(data)
                //that.ui.makeTable(data)
                //console.log(data)
                callback(data)
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            }

        })
    }


    start(){
        $.ajax({
            url: "/startGame",
            type: "POST"

        })
    }
}