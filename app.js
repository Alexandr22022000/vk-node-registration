const startSingup = require('./app/test-bot/start'),
    endSingup = require('./app/test-bot/end'),

    store = {
        webDriver: null,
    };

startSingup({proxy: ""}, store, () => {
    endSingup({}, store, () => {

    });
});













/*const io = require('socket.io-client');

const socket = io("http://localhost:7000");*/

/*const express = require('express'),
    socketDriver = require('socket.io'),
    app = express();

app.set('port', (process.env.PORT || 6000));

const server = app.listen(app.get('port'), () => {console.log('Server is starting on port ' + app.get('port'))});

const ioo = socketDriver(server);

ioo.on('connection', (socket) => {
    document.getElementById("aaa").innerText = "Connected!";
});*/