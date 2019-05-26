var express = require('express');
var app = express()
var http = require('http').createServer(app);
var socketio = require('socket.io')(http);


app.use(express.static('static'))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/static/index.html');
});


http.listen(3000, function () {
    console.log('listening on 3000');
});

socketio.on("connection", function (client) {    
    console.log("klient się podłączył"+ client.id) 
    // client.id - unikalna nazwa klienta generowana przez socket.io

})

