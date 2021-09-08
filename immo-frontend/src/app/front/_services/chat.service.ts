
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


  constructor(private http: HttpClient) { }
  private extractData(res: Response) {
    let body = res;
    return body || {
     };
  }
  addChat(chat){
    return this.http.post('http://localhost:3000/chat/addChat', chat)
  }

  addChatPro(chat){
    return this.http.post('http://localhost:3000/chat/addChatPro', chat)
  }


  getAllChats() {
    return this.http.get('http://localhost:3000/chat/getChats');
  }



  getChatById(_id) {
    console.log("lenna")
    return this.http.get('http://localhost:3000/chat/getChatById/'+_id);
  }



  updateChat(idClt,idPro,chat) {
      return this.http.patch('http://localhost:3000/chat/updateChat/' +idClt+'/'+idPro, chat );
    }


    updateChatPro(_id,chat) {
      return this.http.patch('http://localhost:3000/chat/updateChatPro/' +_id, chat );
    }

    getChatByClient(client){
      return this.http.get('http://localhost:3000/chat/getChatByClient/'+client);
    }
    getChatByPro(professionnel){
      return this.http.get('http://localhost:3000/chat/getChatByPro/'+professionnel);
    }

    openMsg(_id,msgReadet){
      return this.http.patch('http://localhost:3000/chat/openMsg/'+_id,msgReadet);
    }
}



