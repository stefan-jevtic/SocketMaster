'use strict';
/*
*
* Web socket wraper with specific functions: resource(https://github.com/websockets/ws#protocol-support)
*  - routing messages from sockets based on event which they send
*  - information about clients, and manage logic
*  -
*
* */
const WebSocket = require('ws');
const config = require('../config');
const fs = require('fs');


class SocketMaster {

    /*init params for webSocket Server*/
    constructor() {
        let params = arguments[0];
        let paramLength = arguments.length;
        let callback;

        //control of arguments
        if (paramLength >2)
            throw "You constructor need to be empty or to have 1 argument typeof Object!!!";
        //accept callback from arguments
        if (paramLength === 2)
            callback = arguments[1];
        if (fs.existsSync('/socketRedis/config.js'))
            throw  "You miss config.js file pls make it";

        //reinitialise config parameters passed by constructor
        for(let key in arguments) {
            config[key] = arguments[key];
        }
        //manage all clients
        this.CLIENTS_UID = {};
        this.CLIENT_length = 0;
        this.server = new WebSocket.Server(config,callback);
    }

    onConnection(callback){
        this.server.on('connection', ws => {
            if(typeof ws.clientId === undefined){
                ws.clientId = new Date().getTime();
                //fatch from DB clientID
            }
            this.CLIENTS_UID[ws.clientId] = ws;
            this.CLIENTS_length += 1;
            callback(ws);
        });
    }

    event(name, ws, callback){
        ws.on('message', data => {
            data = JSON.parse(data);
            //check if event exist on server and foreword if its true
            if(name in data){
                console.log("AAAAAAAAAAAAAAAAAAa to je to")
                let obj ={};
                obj['uid'] = ws.clientId;
                obj['data'] = data[name];
                callback(obj);
            }
            return false;
        })
    }

    send(event, socket, data){
        let data_obj = {};
        data_obj[event]= data;
        socket.send(JSON.stringify(data_obj));
        return this;
    }

    disconnect(socket, callback){
        socket.on('close', (code, err) => {
            delete this.CLIENTS_UID[err.clientId];
            this.CLIENTS_length -=   1;
            console.log("AJDE BREEE-------------- OVO je za zatvaranje konekcije");
            callback(`client with uid: ${socket.clientId} is DELETED`)
        });
    }

    /* Send message to all clients who are connected to the server, to specific method */
    sendToAll(chanel = 'all', socket, data){
        if(chanel === '')
            return;

        let mySocket = socket.clientId;
        for(let client in this.CLIENTS_UID){
            if(client == mySocket)
                continue;
            let user_socket = this.CLIENTS_UID[client];
            this.send(chanel, user_socket, data);
        }

    }
}

module.exports = SocketMaster;