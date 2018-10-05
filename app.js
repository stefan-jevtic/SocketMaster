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


var MasterSocket = require("./socketRedis/socketLib/Socket");
let webSoc = new MasterSocket();

webSoc.onConnection( socket =>{

    console.log(socket.clientId)
    /* Server sending sockets to the client with specific purpose, client accept those with client.receiver method*/
    // webSoc.send('supa', socket, {neki_podatci:"GDE 11111111111111111111"});
    // webSoc.send('supa', socket, {neki_podatci:"GDE SI BRE BARABO"});
    // webSoc.send('krastavac', socket, {kolikoJE:"Veliki mi cuperak izraso."});

    webSoc.event('krastavac',socket,(data)=>{
        console.log("DOBRO je");
        console.log(data);
    });

    webSoc.event('kuhinja',socket,(data)=>{
        console.log("U kuhinji je");
        console.log(data);
        webSoc.sendToAll('supa', socket, {ohMoj:"Oh moj bogo, koje stete"});
    });




    webSoc.disconnect(socket, (msg)=>{
        console.log(msg);
    });

});


module.exports = app;
