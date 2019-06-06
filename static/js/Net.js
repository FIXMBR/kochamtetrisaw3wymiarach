class Net {
    sendScoreToSrv(name, score) {
        $.ajax({
            data: {
                "name":name,
                "score":score
            },
            url: "/sendScore",
            type: "POST",
            success: function (data) {
              

            },
            error: function (xhr, status, error) {
                console.log(xhr);
            }

        })
    }
    getScoreFromSrv() {
        $.ajax({
            data: {
                action: "getScore"
            },
            type: "POST",
            success: function (data) {
              

            },
            error: function (xhr, status, error) {
                console.log(xhr);
            }

        })
    }
}