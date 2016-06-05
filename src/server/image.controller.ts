import * as gm from 'gm'
import * as ws from 'ws'
import * as path from 'path'

import { ISocketMessage } from "./index"

export class ImageController {
    
    constructor(){}
    
    handle(msg:ISocketMessage, ws:ws){
        
        if (msg.payload == "PROCESS_IMAGE"){
            this.processImage().then(results => {
                ws.send(JSON.stringify({
                    event: "OK",
                    payload: results
                }))
            })        
        } else {
            this.acknowledge(ws);    
        }
        
    }
    
    processImage(){
        return new Promise((resolve, reject) => {
            console.log("Attempting to process image")
            
            // let i = path.join(__dirname, "images", "image.png")
            // console.log(i) 
            
            gm("images/image.png").identify( (err, value) => {
                console.log(value)
                resolve(value)
            })
        })
        
    }
    
    
    acknowledge(ws:ws){
        ws.send(JSON.stringify({"event": "ok"}))
    }
    
    
}