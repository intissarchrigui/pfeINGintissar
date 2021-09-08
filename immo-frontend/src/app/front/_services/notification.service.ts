/* import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  constructor(private socket: Socket) { }

   handleConnection() {

    this.socket.on('connection',data=>{
      console.log("data",data)
    
    })

    this.socket.on('newAppoin', data2 => {
      console.log("data2",data2);
  })
}

public sendMessage(message) {
  this.socket.emit('newAppoin', message);
}

} */