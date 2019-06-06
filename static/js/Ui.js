class Ui {
    constructor() {
        this.net = new Net
        this.GetScoreClickListenerAdd()
        this.SendScoreClickListenerAdd()
    }

    GetScoreClickListenerAdd() {

        $('#btnGetScore').on("click", () => {
            $('#scoreDiv').show('slow');
            console.log("getScoreClick")
        })
    }

    SendScoreClickListenerAdd() {

        $('#btnSendScore').on("click", () => {
            console.log("sendScoreClick")
        })
    }
}