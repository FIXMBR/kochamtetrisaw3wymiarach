class Net {
    constructor() {
        this.ui = new Ui
    }
    sendScoreToSrv(name, score) {
        var that = this
        console.log(name, score)
        $.ajax({
            data: {
                "name":name,
                "score":score
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
}