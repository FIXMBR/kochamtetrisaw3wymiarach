class Ui {
  init() {
    //this.net = new Net();
    this.GetScoreClickListenerAdd();
    this.closeScoreClick();
    this.closeLoginClick();
    this.startGameClick();
    this.helpDivClick();
    this.showedAtakujesz = false
    this.interval;
  }

  showBckd() {
    $("#background").show();
  }

  hideBckd() {
    $("#background").hide();
  }
  GetScoreClickListenerAdd() {
    $("#btnGetScore").on("click", () => {
      this.showScore();
      console.log("getScoreClick");
    });
  }
  showScore() {
    window.net.getScoreFromSrv();
    settings.scoreOpened = true
    $("#scoreDiv").show("slow");

  }

  closeScoreClick() {

    $("#btnCloseScore").on("click", () => {
      this.closeScore()
      console.log("closeScoreClick");
    });
  }

  closeScore() {
    settings.scoreOpened = false
    $("#scoreDiv").hide("slow");
  }

  makeTable(data) {
    // console.log(data);
    var byScore = data.slice(0);
    byScore.sort(function (a, b) {
      return b.score - a.score;
    });
    // console.log(byScore);
    var table = "<table><tr>  <td></td> <td>PLAYER</td>  <td>SCORE</td> </tr>";

    byScore.forEach((element, index) => {
      var color = this.getRandomColor();
      table += `<tr style="color:${color}" > <td> ${index + 1}. </td>  <td> ${
        element.score
        } </td> <td> ${element.name} </td> </tr>`;
      //console.log(element.name + "  " + element.score + " " + index)
    });

    $("#scoreTable").html(table);
  }
  getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  closeLoginClick() {
    var that = this
    $("#loginDiv h1").css('color', window.ui.getRandomColor);
    $("#waitDiv h1").css('color', window.ui.getRandomColor);
    $("#helpText").css('color', window.ui.getRandomColor);
    $("#logujSubmit").on("click", () => {
      //console.log("logujSubmit");
      settings.name = $('#loginInput').val()
      window.client.emit("nameSend", {
        name: settings.name
      })
      $("#loginDiv").hide("slow");
      $("#waitDiv").show("slow");

      this.interval = setInterval(() => {
        window.net.getPlayersList()
      }, 500);
    })
  }

  startGameClick() {
    $("#startGame").on("click", () => {
      console.log("startGame");
      this.hideBckd();
      clearInterval(this.interval)
      $("#waitDiv").hide("slow");
      $("#help").hide("slow");
      window.startData.incremental = $('#incremental').is(':checked')
      window.startData.model = $('#model').is(':checked')
      window.startData.level = parseInt($('#selectLevel').val())
      window.startData.rotation = $('#rotation').is(':checked')
      window.net.startGame()
      //$("#startGame").remove()
    });
  }

  helpDivClick() {
    $("#helpBtn").on("click", () => {
      $("#help").show("slow");
      window.net.getHelpDataFromSrv("helpDiv", function (data) {
        $('#helpText').html(data[0].text)
        $('#helpText1').html(data[0].text1)
        $('#helpText2').html(data[0].text2)
        $('#helpText3').html(data[0].text3)
        $('#helpText4').html(data[0].text4)
        $('#helpText5').html(data[0].text5)
      })
    });
    $("#helpClBtn").on("click", () => {
      $("#help").hide("slow");
    })
  }
  showAtakujesz() {

    if (!this.showedAtakujesz) {
      window.net.getHelpDataFromSrv("atakujesz", function (data) {
        $('#message h3').html(data[0].title)
        $('#message h4').html(data[0].text)
        $('#message').show("slow")
        setTimeout(function () {
          $('#message').hide("slow")
        }, 4000)
      })
    }
    this.showedAtakujesz = true
  }
  showAtakowany() {
    if (!this.showedAtakowany) {
      window.net.getHelpDataFromSrv("atakowany", function (data) {
        $('#message1 h3').html(data[0].title)
        $('#message1 h4').html(data[0].text)
        $('#message1').show("slow")
        setTimeout(function () {
          $('#message1').hide("slow")
        }, 4000)
      })
    }
    this.showedAtakowany = true
  }

  showStart() {
    window.net.getHelpDataFromSrv("start", function (data) {
      $('#message2 h3').html(data[0].title)
      $('#message2 h4').html(data[0].text)
      $('#message2').show("slow")
      setTimeout(function () {
        $('#message2').hide("slow")
      }, 4000)
    })
  }

  showEnd() {
    window.net.getHelpDataFromSrv("koniec", function (data) {
      $('#message2 h3').html(data[0].title)
      $('#message2 h4').html(data[0].text)
      $('#message2').show("slow")
      setTimeout(function () {
        $('#message2').hide("slow")
      }, 4000)
    })
  }


}
