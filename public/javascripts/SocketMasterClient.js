'use strict';

var MasterSocket = function(obj, options){

    this.ip = obj.ip;
    this.port = obj.port;
    let pattern = 'ws://'+this.ip+":"+this.port;

    this.socket = new WebSocket(pattern,options);
};

MasterSocket.prototype.connection = function(callback){

    this.socket.onmessage = (message)=>{
        let json = JSON.parse(message.data);
        callback(json);
    }
};

MasterSocket.prototype.receiver = function(event,socket ,callback){

    if(event in socket){
        callback(socket)
    }
    return;
};

MasterSocket.prototype.send = function(event, data){
    let new_obj = {};
    new_obj[event] = data;
    this.socket.send(JSON.stringify(new_obj))
    return this;
};

MasterSocket.prototype.onSocketOpen = function(callback){
    this.socket.onopen = (ws)=>{
        console.log("Connection established ");
        callback(ws);
    };
};

/* this function is called after conection close */
MasterSocket.prototype.onClose = function(callback){
    this.socket.onclose = function(err){
        callback(err)
    }
};

/* close the connection of socket*/
MasterSocket.prototype.closeNow = function(){
    this.socket.close();
};