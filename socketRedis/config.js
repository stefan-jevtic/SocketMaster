'use strict';
/*
*   Initial parameters for socket server
*   https://github.com/websockets/ws/blob/master/doc/ws.md
*
* */

module.exports = {

    host: '127.0.0.1',
    port: 8080,
    // backlog: 1000, // {Number} The maximum length of the queue of pending connections.
    noServer : false, // enable no server mode
    maxPayload : 2048 ,//max allowed message size in bytes

    // (pass that parameters from the constructor)

    // server: // pre attached nodejs server instance

    // verifyClient: [function] //function whic can be used to validate incoming connections
    // handleProtocols: [function] //function to handle webSocket sub-protocols


    //an be used to control the behavior of permessage-deflate extension. The extension is disabled when false (default value).
    // If an object is provided then that is extension parameters:

    // perMessageDeflate: {
    //     zlibDeflateOptions: { // See zlib defaults.
    //         chunkSize: 1024,
    //         memLevel: 7,
    //         level: 3,
    //     },
    //     zlibInflateOptions: {
    //         chunkSize: 10 * 1024
    //     },
    //     // Other options settable:
    //     clientNoContextTakeover: true, // Defaults to negotiated value.
    //     serverNoContextTakeover: true, // Defaults to negotiated value.
    //     clientMaxWindowBits: 10,       // Defaults to negotiated value.
    //     serverMaxWindowBits: 10,       // Defaults to negotiated value.
    //     // Below options specified as default values.
    //     concurrencyLimit: 10,          // Limits zlib concurrency for perf.
    //     threshold: 1024,               // Size (in bytes) below which messages
    //                                    // should not be compressed.
    // }

};