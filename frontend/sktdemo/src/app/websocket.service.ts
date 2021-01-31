import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import * as io from 'socket.io-client';
import {io} from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  socket:any;
  readonly url:string ="https://utsavtododemo.herokuapp.com";
  // readonly url:string ="http://localhost:3000";
  constructor() {
    this.socket = io(this.url);
  }


  listen(eventName:string)
  {
    return new Observable((subscriber)=>{
        this.socket.on(eventName,(data)=>{
          subscriber.next(data);
        })
    });
  }

  emit(eventName:string,data:any)
  {
    this.socket.emit(eventName,data);
  }


}
