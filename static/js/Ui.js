class Ui {
  init() {
    //this.net = new Net();
    this.GetScoreClickListenerAdd();
    this.closeScoreClick();
    this.closeLoginClick();
    this.startGameClick();
    this.helpDivClick();
    this.interval;
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
    byScore.sort(function(a, b) {
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
      clearInterval(this.interval)
      $("#waitDiv").hide("slow");
      window.net.start()
    });
  }

  helpDivClick() {
    $("#helpBtn").on("click", () => {
      $("#help").show("slow");
      window.net.getHelpDataFromSrv("helpDiv", function (data ) {
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
}
