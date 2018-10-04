var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));


app.use('/', indexRouter);
app.use('/users', usersRouter);


var USERS = [];
var uid = 0;

var MasterSocket = require("./socketRedis/socketLib/Socket")

let webSoc = new MasterSocket();

webSoc.onConnection( socket =>{

    console.log(socket.clientId)
    socket.send(JSON.stringify({djoka:{neki_podatci:"GDE 11111111111111111111"}}));
    socket.send(JSON.stringify({djoka:{neki_podatci:"GDE SI BRE BARABO"}}));
    socket.send(JSON.stringify({krastavac:{kolikoJE:"Veliki mi stojko"}}));

    webSoc.event('krastavac',socket,(data)=>{
        console.log("DOBRO je");
        console.log(data);
    });

    webSoc.event('kuhinja',socket,(data)=>{
        console.log("U kuhinji je");
        console.log(data);
    });

    webSoc.disconnect(socket, (msg)=>{
        console.log(msg);
    });

});




// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ port: 8080 });
//
// wss.on('connection', function (ws) {
//     ws.uid = ++uid;
//     USERS[ws.uid] = ws
//
//     ws.on('message', function (message) {
//         console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!: ');
//         console.log("Number of users: "+USERS.length);
//         console.log(JSON.parse(message));
//
//
//         // saljemo drugom odgovo
//         ws.send(JSON.stringify({kljuc:"NEKI MESSAGE"}));
//     });
//     // ws.send(JSON.stringify({kljuc:"NEKI MESSAGE"}));
// });
//

module.exports = app;
