import * as ws from 'ws'

import { FolderController, ImageController } from "./index"

const options: ws.IServerOptions = {
    port: 8001
}

const server = new ws.Server(options)

let fc = new FolderController("/var/www/")
let ic = new ImageController()

export interface ISocketMessage {
    "event": string,
    "payload": any,
} 

const handleConnection = (ws:ws) => {
    console.log("Connection established");
    ws.send('Established');
    
    ws.on('open', () => {
        console.log(`Connection opened`);
    });
    
    ws.on('close', (message) => {
        console.log(`Connection closed`);
    });
    
    ws.on('message', (message) => {
        console.log('received: %s', message);
        try {
            
            let msg:ISocketMessage = JSON.parse(message)
            console.log("Message OK")
            console.log(msg.event)
            
            switch(msg.event) {
                
                case "folder": {
                    fc.handle(msg, ws)
                    break;
                }
                
                case "image": {
                    ic.handle(msg, ws)
                    break;
                }
                
                default: {
                    ws.send(JSON.stringify({event: "error", message: "event not recognized"}))
                }
            }
            //ws.send(JSON.stringify({event: "ok", payload: ""}))    
        } catch (err) {
            ws.send(JSON.stringify({event: "error", message: err.message}))
        }
        
    });

}

server.on('connection', handleConnection)
//server.on('error', handleError)
