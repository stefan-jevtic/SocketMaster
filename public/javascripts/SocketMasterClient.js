'use strict';

class MasterSocket {

    constructor(obj, options){
        this.ip = obj.ip;
        this.port = obj.port;
        let pattern = 'ws://'+this.ip+":"+this.port;
        this.socket = new WebSocket(pattern, options);
    }

    connection(callback){
        this.socket.onmessage = message => {
            let json = JSON.parse(message.data);
            callback(json);
        }
    }

    receiver(event, socket, callback){
        if(event in socket){
            callback(socket)
        }
        return;
    }

    send(event, data){
        let new_obj = {};
        new_obj[event] = data;
        this.socket.send(JSON.stringify(new_obj))
        return this;
    }

    onSocketOpen(callback){
        this.socket.onopen = ws => {
            console.log("Connection established ");
            callback(ws);
        };
    }

    /* this method is called after conection close */
    onClose(callback){
        this.socket.onclose = err => {
            callback(err)
        }
    }

    /* close the connection of socket*/
    closeNow(){
        this.socket.close()
    }
}
