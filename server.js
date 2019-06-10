var express = require('express');
var app = express()
var http = require('http').createServer(app);
var socketio = require('socket.io')(http);
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));

var players = []
var max = 0
var playersId = []
var rngArray = []
var gameState = 'waiting'
var attacks = []

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function getRNG(num) {
    if (rngArray.length - 1 > num) {
        //console.log(rngArray)
        return rngArray[num]
    } else {
        while (rngArray.length - 1 <= num) {
            let array = shuffle([0, 1, 2, 3, 4, 5, 6])
            rngArray.push(array[0], array[1], array[2], array[3], array[4], array[5], array[6])
            //console.log(rngArray)
        }
        return rngArray[num]
    }
}
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
    serverOperations.getScoresCollectionFromSrv(serverObject.currentDatabase, function (data) {
        //console.log(data)
        operations.SelectAll(data, function (data) {
            //console.log(data)
            res.send(data)
        })
    })
})

app.post('/sendScore', function (req, res) {
    serverOperations.getScoresCollectionFromSrv(serverObject.currentDatabase, function (collection) {
        operations.Insert(collection, req.body, function () {
            console.log("dodano rekord")
            res.send(true)
        })
    })
})

app.post('/getData', function (req, res) {
    serverOperations.getHelpCollection(serverObject.currentDatabase, function (data) {
        //console.log(data)
        operations.SelectAndLimitData(data, req.body, function (dataRec) {
            //console.log(dataRec)
            res.send(dataRec)
        })
        //operations.SelectAll(data, function (data) {
        //console.log(data)
        //  res.send(data)
        // })


    })
})

app.post('/getPlayers', function (req, res) {
    //console.log(playersId)
    res.send(playersId)

})
app.post('/startGame', function (req, res) {
    if (req.body.confirm) {
        console.log('reee')
        //res.send(playersId)
        rngArray = []
        gameState = 'playing'
        socketio.sockets.emit("startGame", { /*posX: data.posX, posY:data.posY*/ });
    }
})

app.post('/getRNG', function (req, res) {
    //console.log("stram")
    //console.log(req.body.num)
    let rngd = getRNG(JSON.parse(req.body.num))
    //console.log(rngd);

    res.send(JSON.stringify(rngd))
    //let num = getRNG(data.num)
    // var allData = ""
    // var finish = ""
    // req.on("data", function (data) {
    //     console.log("data: " + data)
    //     allData += data
    // })
    // req.on("end", function (data) {
    //     finish = qs.parse(allData)
    //     console.log(JSON.parse(finish.num))
    //     res.send(getRNG(JSON.parse(finish.num)))
    // })


})

//BAZA DANYCH MONGO DB

serverOperations.loginToSrv("**login**", "**hasło**", "**host**", "**login**", function (data) {
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
            if (i == players[j].id) {
                used = true
            }

        }
        if (!used) {
            id = i
            break
        }
    }
    attacks.push(0)
    players.push({ id: id, attack: 0 })
    playersId.push(client.id)


    // client.on("boards", function (data) {
    //     client.broadcast.emit("boards", {
    //         board: data.board,
    //         liveBoard: data.liveBoard
    //     })
    // })
    console.log("klient się podłączył: " + client.id + "id: " + id)

    client.on("disconnect", function (data) {
        client.broadcast.emit("playerNumber", {
            players: players
        })
        console.log("id: " + id + ' disconnected');

        for (let j = 0; j < players.length; j++) {
            const element = players[j].id;

            if (element == id) {
                players.splice(j, 1)
                playersId.splice(j, 1)
                break
            }
        }
        console.log('players left: ' + JSON.stringify(players))
        //attacks.unshift()
    })

    client.on("playerMovement", function (data) {
        if (gameState == 'playing')
            client.broadcast.emit("playerMoved", {
                id: id,
                //clientid: client.id,
                blockNum: data.blockNum,
                blocksPosition: data.blocksPosition,
                x: data.x,
                y: data.y
            })
    })
    client.on("boardUpdate", function (data) {
        if (gameState == 'playing')
            client.broadcast.emit("boardUpdate", {
                id: id,
                board: data.board
            })
    })
    client.on("animation", function (data) {
        if (gameState == 'playing')
            client.broadcast.emit("animation", {
                id: id,
                line: data.line,
            })
    })
    //TODO fix this shit man (attacks)
    client.on("attack", function (data) {
        if (gameState == 'playing') {
            // console.log(attacks)
            console.log(players)

            if (players[id].attack > 0) {
                console.log('DEFEND! currAttack: ' + players[id].attack)
                let rmamount = players[id].attack
                console.log(players[id].attack - (data.lines.length - 1))
                if (players[id].attack - (data.lines.length - 1) < 0) {
                    // for (let i = 0; i < players.length; i++) {
                    //     //const element = attacks[i];
                    //     players[i].attack += (data.lines.length - 1) - rmamount
                    // }
                    players[id].attack = 0
                    for (let i = 0; i < players.length; i++) {
                        //const element = attacks[i];
                        if (i != id)
                            if (data.lines.length == 4) {
                                players[i].attack += (data.lines.length) - rmamount
                            } else {
                                players[i].attack += (data.lines.length - 1) - rmamount
                            }
                    }
                } else {
                    players[id].attack -= (data.lines.length - 1)
                }
                console.log('DEFEND! final attack: ' + players[id].attack)

                socketio.sockets.emit("defend", {
                    id: id,
                    lines: data.lines,
                    attacks: players
                })
            } else {
                for (let i = 0; i < players.length; i++) {
                    //const element = attacks[i];
                    if (i != id)
                        if (data.lines.length == 4) {
                            players[i].attack += (data.lines.length) - players[id].attack
                        } else {
                            players[i].attack += (data.lines.length - 1) - players[id].attack
                        }
                }

                socketio.sockets.emit("attack", {
                    id: id,
                    lines: data.lines,
                    attacks: players
                })
            }
        }
    })
    client.on("hardDrop", function (data) {
        if (gameState == 'playing')
            client.broadcast.emit("hardDrop", {
                id: id,
                oldY: data.oldY,
                y: data.y,
                x: data.x,
                blocksPosition: data.blocksPosition
            })
    })

    client.on("place", function (data) {
        if (gameState == 'playing') {
            if (players[id] != undefined) {

                if (players[id].attack > 0) {
                    client.emit("trash", {
                        id: id,
                        trash: players[id].attack
                    })
                }
            }
        }
    })

    client.on("trashed", function (data) {
        if (gameState == 'playing') {
            players[id].attack -= data.trash
        }
        socketio.sockets.emit("updateAttacks", {
            attacks: players
        })
    })

    client.emit("onconnect", {
        players: players,
        id: id
    })
    client.broadcast.emit("playerNumber", {
        players: players
    })
})
