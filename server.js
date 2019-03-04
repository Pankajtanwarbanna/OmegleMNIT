var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

// Socket.io stuff
var http = require('http').Server(app);
var io = require('socket.io')(http);


// Express serving static file
app.use(express.static('./public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/app/views/index.html');
});

io.on('connection', function (socket) {
    console.log('A user connected.');
    socket.on('disconnect', function () {
        console.log('User disconnected.');
    });

    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
});

http.listen(port , function () {
    console.log('Server listening at port ' + port);
});