import { Component, ViewChild, ElementRef, OnInit, ChangeDetectionStrategy, Renderer2, OnDestroy } from '@angular/core';
import { ChatService } from './chat.service';
import { Chat } from './chat.model';
import {ToastrService} from 'ngx-toastr';
import * as io  from 'socket.io-client';
interface Payload {
 // name: string;
  text: string;
}
interface Message {
 // id: string;
 // name: string;
  text: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./chat.component.scss'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit  {
  socket:any;
  message;
  chat:string []=[];
  activeChatUser: string;
  activeChatUserImg: string;
  @ViewChild('messageInput') messageInputRef: ElementRef;
  @ViewChild('chatSidebar') sidebar:ElementRef;
  @ViewChild('contentOverlay') overlay:ElementRef;
  messagess = [];
  nickname = '';
  messages = new Array();
  item: number = 0;
  constructor(private elRef: ElementRef, private renderer: Renderer2, private chatService: ChatService,private toastCtrl:ToastrService) {
    this.socket = io('http://127.0.0.1:3002') 
   // this.chat = chatService.chat1;
    this.activeChatUser = "Elizabeth Elliott";
    this.activeChatUserImg = "assets/img/portrait/small/avatar-s-3.png";
  }

  ngOnInit() {
    this.socket.on('msgToClient', (message: string) => {
      console.log(message)
      this.messagess.push(message);
      if (message) {
        const element = document.createElement('li');
        element.innerHTML = message;
        element.style.background = 'white';
        element.style.padding =  '15px 30px';
        element.style.margin = '10px';
        document.getElementById('message-list').appendChild(element);
        }
     // this.receivedMessage(this.message);
    });
  
    this.socket.on('users-changed', (data) => {
      const user = data['user'];
      if (data['event'] === 'left') {
       // this.showToast('User left: ' + user);
      } else {
      //  this.showToast('User joined: ' + user);
      }
    });
  /*   this.socket.on('joinedRoom', (message: string) => {
      console.log(message)
      this.receivedMessage(message);
    }); */
  
    // $.getScript('./assets/js/chat.js');
  }
  
  receivedMessage(message: string) {
   // const newMessage: Message = {
      //id: uuid.v4(),
      //name: message.name,
     // text: message,
  //  };

    //this.chat.push(message)
  }
  //send button function calls
  SendMessage() {
    if (this.messageInputRef.nativeElement.value != "") {
      this.messages.push(this.messageInputRef.nativeElement.value);
      console.log("message",this.messageInputRef.nativeElement.value)
      let message =this.messageInputRef.nativeElement.value
      console.log(message)
      //this.socket.emit('msgToServer', message);
      this.socket.emit('add-message', { text: this.message });
      this.message = '';
    const element = document.createElement('li');
    element.innerHTML = message;
    element.style.background = 'DarkOrange';
    element.style.padding =  '15px 30px';
    element.style.margin = '10px';
    element.style.textAlign = 'right';
    element.classList.add("over");
document.getElementById('message-list').appendChild(element);
    }
    this.messageInputRef.nativeElement.value = "";
    this.messageInputRef.nativeElement.focus();
 }
 ssendMessage() {
 
}

/*   onAddMessage() {
    if (this.messageInputRef.nativeElement.value != "") {
      this.messages.push(this.messageInputRef.nativeElement.value);
      console.log("message",this.messageInputRef.nativeElement.value)
      let message =this.messageInputRef.nativeElement.value
      console.log(message)
      this.socket.emit('msgToServer', message);
      this.socket.emit('joinRoom', message);
    }
    this.messageInputRef.nativeElement.value = "";
    this.messageInputRef.nativeElement.focus();
  }
 */
  //chat user list click event function
  SetActive(event, chatId: string) {
    var hElement: HTMLElement = this.elRef.nativeElement;
    //now you can simply get your elements with their class name
    var allAnchors = hElement.getElementsByClassName('list-group-item');
    //do something with selected elements
    [].forEach.call(allAnchors, function (item: HTMLElement) {
      item.setAttribute('class', 'list-group-item no-border');
    });
    //set active class for selected item
    event.currentTarget.setAttribute('class', 'list-group-item bg-blue-grey bg-lighten-5 border-right-primary border-right-2');

    this.messages = [];

    if (chatId === 'chat1') {
     // this.chat = this.chatService.chat1;
      this.activeChatUser = "Elizabeth Elliott";
      this.activeChatUserImg = "assets/img/portrait/small/avatar-s-3.png";
    }
    else if (chatId === 'chat2') {
     // this.chat = this.chatService.chat2;
      this.activeChatUser = "Kristopher Candy";
      this.activeChatUserImg = "assets/img/portrait/small/avatar-s-7.png";
    }
    else if (chatId === 'chat3') {
     // this.chat = this.chatService.chat3;
      this.activeChatUser = "Sarah Woods";
      this.activeChatUserImg = "assets/img/portrait/small/avatar-s-8.png";
    }
    else if (chatId === 'chat4') {
   //   this.chat = this.chatService.chat4;
      this.activeChatUser = "Bruce Reid";
      this.activeChatUserImg = "assets/img/portrait/small/avatar-s-5.png";
    }
    else if (chatId === 'chat5') {
     // this.chat = this.chatService.chat5;
      this.activeChatUser = "Heather Howell";
      this.activeChatUserImg = "assets/img/portrait/small/avatar-s-9.png";
    }
    else if (chatId === 'chat6') {
     // this.chat = this.chatService.chat6;
      this.activeChatUser = "Kelly Reyes";
      this.activeChatUserImg = "assets/img/portrait/small/avatar-s-4.png";
    }
    else if (chatId === 'chat7') {
     // this.chat = this.chatService.chat7;
      this.activeChatUser = "Vincent Nelson";
      this.activeChatUserImg = "assets/img/portrait/small/avatar-s-14.png";
    }

  }

  onSidebarToggle() {
    this.renderer.removeClass(this.sidebar.nativeElement, 'd-none');
    this.renderer.removeClass(this.sidebar.nativeElement, 'd-sm-none');
    this.renderer.addClass(this.sidebar.nativeElement, 'd-block');
    this.renderer.addClass(this.sidebar.nativeElement, 'd-sm-block');
    this.renderer.addClass(this.overlay.nativeElement, 'show');
  }

  onContentOverlay() {
    this.renderer.removeClass(this.overlay.nativeElement, 'show');
    this.renderer.removeClass(this.sidebar.nativeElement, 'd-block');
    this.renderer.removeClass(this.sidebar.nativeElement, 'd-sm-block');
    this.renderer.addClass(this.sidebar.nativeElement, 'd-none');
    this.renderer.addClass(this.sidebar.nativeElement, 'd-sm-none');

  }
 /*  ngOnDestroy() {
    this.socket.disconnect();
  }
  async showToast(msg:string) {
    this.toastCtrl.success(
       msg,
       '',
       { timeOut: 20000,extendedTimeOut: 2000000000} 
    );
 
  } */


}
