var express = require('express');
var app = express()
var http = require('http').createServer(app);
var socketio = require('socket.io')(http);
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true })); 

var players = []
var max = 0
var playersId = []
//var playersNumber = 0

var operations = require("./modules/Operations.js");
var serverOperations = require("./modules/serverOpers.js");
var serverObject;


app.use(express.static('static'))
//app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/static/index.html');

});

app.post('/getScore', function (req, res) {
    serverOperations.getScoresCollectionFromSrv(serverObject.currentDatabase, function(data) {
        //console.log(data)
        operations.SelectAll(data, function (data) {
            //console.log(data)
            res.send(data)
        })
    })
})

app.post('/sendScore', function (req, res) {
    serverOperations.getScoresCollectionFromSrv(serverObject.currentDatabase, function(collection) {
        operations.Insert(collection, req.body , function() {
            console.log("dodano rekord")
            res.send(true)
        })
    })
})

app.post('/getPlayers', function (req, res) {
    //console.log(playersId)
    res.send(playersId)

})

//BAZA DANYCH MONGO DB

serverOperations.loginToSrv("**login**", "**hasło**", "**host**", "**login**" , function(data) {
    if (!data) {
        console.log("niezalogowano do bazy")
    } else {
        console.log("zalogowano do bazy")
        serverObject = data;
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
    playersId.push(client.id)


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
                playersId.splice(j,1)
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
