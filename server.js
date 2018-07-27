var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/sources/index.html');
});

app.use('/', express.static('./sources'));

io.on('connection', (socket) => {
    socket.on('user_login', (user_name) => {
        socket.user_name = user_name;
    });
    socket.on('send_message', (message) => {
        io.emit('receiver_message', {data: socket.user_name + "(" + socket.id + "): " + message});
    });
});

http.listen(process.env.PORT || 8080);