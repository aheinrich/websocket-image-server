import * as fs from 'fs'
import * as ws from 'ws'

import { ISocketMessage } from "./index"

export class FolderController {
    
    baseDir:string;
    
    constructor(baseDirectory:string){
        this.baseDir = baseDirectory 
    }
    
    handle(msg:ISocketMessage, ws:ws){
        
        if (msg.payload == "CREATE_FOLDER"){
            this.createFolder()        
        }
        
        this.acknowledge(ws);
            
    }
    
    createFolder(){
        console.log("Creating folder")
        //fs.mkdir("")
    }
    
    removeFolder(){
        console.log("Removing folder")
    }
    
    acknowledge(ws:ws){
        ws.send(JSON.stringify({"event": "ok"}))
    }
    
    
}