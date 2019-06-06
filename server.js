var express = require('express');
var app = express()
var http = require('http').createServer(app);
var socketio = require('socket.io')(http);


var players = []
var max = 0
//var playersNumber = 0

var operations = require("./modules/Operations.js")
var serverOperations = require("./modules/serverOpers.js")



app.use(express.static('static'))
//app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/static/index.html');

});

app.post('')
//BAZA DANYCH MONGO DB

serverOperations.loginToSrv("**login**", "**hasło**", "**host**", "**login**" , function(data) {
    if (!data) {
        console.log("niezalogowano")
    } else {
        console.log("zalogowano")
       // console.log(data)
    }
})

//sram ASDASDAs

http.listen(3000, function () {
    console.log('listening on 3k');
});

socketio.on("connection", function (client) {

    //playersNumber++
    // client.id - unikalna nazwa klienta generowana przez socket.io
    let id = null
    for (let i = 0; i < players.length + 1; i++) {
        let used = false
        for (let j = 0; j < players.length; j++) {
            if (i == players[j]) {
                used = true
            }

        }
        if (!used) {
            id = i
            break
        }
    }

    players.push(id)



    client.on("boards", function (data) {
        client.broadcast.emit("boards", {
            board: data.board,
            liveBoard: data.liveBoard
        })
    })
    console.log("klient się podłączył: " + client.id + "id: " + id)

    client.on("disconnect", function (data) {
        client.broadcast.emit("playerNumber", {
            players: players
        })
        console.log("id: " + id + ' disconnected');

        for (let j = 0; j < players.length; j++) {
            const element = players[j];
            
            if (element == id) {
                players.splice(j, 1)
                break
            }
        }
        console.log('players left: ' + players);
        
    })

    client.emit("onconnect", {
        players: players,
        id:id
     })
     client.broadcast.emit("playerNumber", {
        players: players
    })
})
