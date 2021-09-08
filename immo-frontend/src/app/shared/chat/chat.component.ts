import { Component, ViewChild, ElementRef, OnInit, ChangeDetectionStrategy, Renderer2, OnDestroy } from '@angular/core';

import { Chat } from './chat.model';
import * as io  from 'socket.io-client';
import { ChatService } from 'app/front/_services/chat.service';
import { Chat2, Chatt } from 'app/back/models/chat.model';
import { table } from 'console';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
 // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./chat.component.scss'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit,OnDestroy {
  newChat:boolean=false
  chats:Chatt[]
  activUserList:any[]=[]
  mssssssg:any;
  newMsg:any;
  chat: Chatt;
  latestElement:{};
  chattttt:Chatt
  acitvUser:boolean=false;
  activeChatUser: string;
  activChatId:Number;
  activeChatMsg:any[];
  activMsg:any[]=[];
  activeChatUserImg: any;
  activAvatar:string;
  activClass:string;
  clientValue;
  url="http://localhost:3000/auth/getFile/"
  @ViewChild('messageInput') messageInputRef: ElementRef;
  @ViewChild('chatSidebar') sidebar:ElementRef;
  @ViewChild('contentOverlay') overlay:ElementRef;
socket:any;
user;
messagess:any[]=[]
chaaats:any[]=[]
activMsgs:Chat2[];
  messages : any[]=[];
  item: number = 0;
  nickname:string;
  constructor(private elRef: ElementRef, private renderer: Renderer2, private chatService: ChatService) {
    this.socket = io('http://127.0.0.1:3002')

  }

  ngOnInit() {
    this.user=JSON.parse(sessionStorage.getItem('user'))
    console.log("user",this.user)
    this.chatService.getAllChats().subscribe((res:Chatt[])=>{
      this.chats=res.filter((chat)=>chat.professionnel==this.user._id)
      console.log("choott",   this.chats)
    this.chattttt = this.chats[0];
   console.log("chat",   this.chat )
   this.activeChatMsg =this.chats[0].messages;
   this.activChatId=this.chats[0].client._id;
    this.activeChatUser =this.chats[0].client.first_name+" "+this.chats[0].client.last_name;
    this.activeChatUserImg = "http://localhost:3000/auth/getFile/"+this.chats[0].client.image
  /*   this.activAvatar=this.chat.avatar
    this.activClass=this.chat.chatClass
    this.activMsgs=this.chat.messages */
    console.log(this.activMsgs)
    })
    this.socket.on('message', message => {
      console.log(message)
      this.mssssssg=message
      this.newMsg=message
      /*   this.chaaats.forEach(element=>{
          if (message.from._id==element.from._id){
           // if ()
           element.texts.push(message.text)
          }
          else if (message.from._id!==element.from._id){
      
          }
        }) */
        this.user=JSON.parse(sessionStorage.getItem('user'))
        console.log("user",this.user)
        let chat={
          // avatar:,
          
           messages: [{
             avatar:'left',
            chatClass:'chat chat-left',
            imagePath: message.from.image,
            time: new Date(),
            message:message.text
           }],
           client:message.from._id,
           professionnel:message.to,
           msgReadet:false,
           clt:message.from,

          // messageType: string;
        }
        console.log("ch",chat)
        let existsuserlist=[]
        let existsuserBase=[]
        console.log("activUserList",this.activUserList)
       this.activUserList.forEach(element=>{
         if(element.clt._id==message.from._id){
          existsuserlist.push(element)
         }

       }
        )
        console.log("chats",this.chats)
      this.chats.forEach(element=>{
        if(element.client._id==message.from._id){
          existsuserBase.push(element)
         }
        
      })
        console.log("exists",existsuserlist)
        console.log("exists",existsuserBase)
    if (existsuserlist.length==0 && existsuserBase.length==0){
      this.acitvUser=true
      this.activUserList.push(chat)
      console.log("activUserList",this.activUserList)
    }else if (existsuserlist.length !==0&& existsuserBase.length!==0){
      this.acitvUser=false
      console.log("activUserList",this.activUserList)
    }

    this.activUserList.forEach(element=>{
  this.latestElement=element.messages.message
  console.log("this.latestElement",this.latestElement)
    })

    // const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" });
        this.chatService.addChat(chat).subscribe((res:any)=>{
          console.log("resAdd",res)
          let data=res.clientProChat  
          var obj = {
            avatar:'left',
            chatClass:'chat chat-left',
            imagePath: message.from.image,
            time: new Date(),
            message:message.text,
            msgRadet:false
          };
  
           console.log("data",data)
           data.messages.push(obj)
            let msgs=data.messages
            console.log("msgs",msgs)
          if (res.message==true){
            this.chatService.updateChat(data.client,data.professionnel,msgs).subscribe(res=>{
              console.log("res",res)
            })
   /*       let existsClientBase=[]
         let existsProrBase=[]
        this.chats.forEach(element=>{
         if(element.client==message.from._id){
          existsClientBase.push(element)
         }

       }
        )
      this.chats.forEach(element=>{
        if(element.professionnel==message.to){
          existsProrBase.push(element)
         }
        
      })
        console.log("existsClt",existsClientBase)
        console.log("existsPro",existsProrBase)
    if (existsClientBase.length==1 && existsProrBase.length>1){
      this.chatService.updateChatClient(message.from._id,msgs).subscribe(res=>{
        console.log("res",res)
      }) 
     
    }else if (existsClientBase.length>1 && existsProrBase.length==1){
      this.chatService.updateChatPro(message.to,msgs).subscribe(res=>{
        console.log("res",res)
      }) 
    }else {
      this.chatService.updateChatClient(message.from._id,msgs).subscribe(res=>{
        console.log("res",res)
      }) 
     
    }
        */ 
          
           }})
          console.log("activUserList",this.activUserList)
       // this.messagess.push(message)
        localStorage.setItem('chats', JSON.stringify( this.messagess));
  
        console.log("msggg",this.messagess)
  /*       const elem=document.createElement('h6');
        elem.innerHTML = message.from;
        document.getElementById('user-list').appendChild(elem); */
        //this.chat.push(message)
  //    this.chats.forEach(element=>{
    console.log("frr",message.from._id)
    // console.log("uss",element.client._id)
     console.log("acc",this.activChatId)
        if (this.activChatId===message.from._id ) {
          this.newChat=true
          const element = document.createElement('li');
          element.innerHTML = message.text;
          element.style.background = 'white';
          element.style.padding =  '15px 30px';
          element.style.margin = '10px';
          element.style.marginRight = '200px';
          element.style.overflowWrap= 'break-word';
      
    
         this.activMsg.push(  this.mssssssg)
         console.log( "acctiv",this.activMsg)
          //document.getElementById('message-list').appendChild(element);
          }
      //  })
        })
   
     this.chaaats=JSON.parse(localStorage.getItem('chats'))
    console.log("chaaats",this.chaaats)
    //this.socket.connect();


  }



  onAddMessage() {

    if (this.messageInputRef.nativeElement.value != "") {
  // this.messages.push(this.messageInputRef.nativeElement.value);
    console.log("message",this.messageInputRef.nativeElement.value)
    let message =this.messageInputRef.nativeElement.value
    console.log(message)
    this.user=JSON.parse(sessionStorage.getItem('user'))
    console.log("user",this.user)
    this.socket.connect();
    this.socket.emit('set-nickname',{ nickname:this.activChatId,pro:this.user._id });
    var obj = {
      avatar:'right',
      chatClass:'chat',
      imagePath: this.user.image ,
      time: new Date(),
      message:message,
      to:this.activChatId,
      from:this.user
    };
    let chat={
      // avatar:,
      
       messages: [{
         avatar:'right',
        chatClass:'chat',
        imagePath: this.user.image,
        time: new Date(),
        message:message
       }],
       client:this.activChatId,
       professionnel:this.user._id
      // messageType: string;
    }

    console.log("chat",chat)
    this.chatService.addChat(chat).subscribe((res:any)=>{
      console.log("resAdd",res)
      let data=res.clientProChat  
      var obj = {
        avatar:'right',
        chatClass:'chat',
        imagePath: this.user.image ,
        time: new Date(),
        message:message,
        to:this.activChatId,
        from:this.user
      };

       console.log("data",data)
       data.messages.push(obj)
        let msgs=data.messages
        console.log("msgs",msgs)
      if (res.message==true){
        this.chatService.updateChat(data.client,data.professionnel,msgs).subscribe(res=>{
          console.log("res",res)
        })

      
       }})
 
    this.socket.emit('add-message-pro', { text:obj });
   
    if (this.activChatId===obj.to) {
      this.newChat=true
 
    this.activMsg.push(obj)
    console.log("listmsg", this.activMsg)
  }
  
    const element = document.createElement('li');
    element.innerHTML = message;
    element.style.background = '#ff5424';
    element.style.padding =  '15px 30px';
   // element.style.height =  '30px';
   //  element.style.width =  '20px';
    element.style.margin = '10px';
    //element.style.marginRight = '20px';
    element.style.marginLeft = '200px';
    element.style.textAlign = 'right';
    element.style.color = 'white';
    element.classList.add("over");
   // element.innerHTML = message;
 

    }
    this.messageInputRef.nativeElement.value = "";
    this.messageInputRef.nativeElement.focus();
    //this.messages.push(this.messageInputRef.nativeElement.value)
    this.user=JSON.parse(sessionStorage.getItem('user'))
    console.log("user",this.user)

 }

  getAllChat(){
    this.chatService.getAllChats().subscribe((res:Chatt[])=>{
      this.chats=res.filter((chat)=>chat.professionnel==this.user._id)
      console.log("chats",   this.chats)
    })
  }

  //chat user list click event function
  SetActive(event, chatId: number,nickname:Number,newMsg:Boolean) {
    this.newChat=false
    //newMsg=true
    if(this.newMsg!=undefined){
    this.newMsg.new=true
  }
    var hElement: HTMLElement = this.elRef.nativeElement;
    //now you can simply get your elements with their class name
    var allAnchors = hElement.getElementsByClassName('list-group-item');
    //do something with selected elements
    [].forEach.call(allAnchors, function (item: HTMLElement) {
      item.setAttribute('class', 'list-group-item no-border');
    });
    //set active class for selected item
    event.currentTarget.setAttribute('class', 'list-group-item bg-blue-grey bg-lighten-5 border-right-primary border-right-2');

  
  this.user=JSON.parse(sessionStorage.getItem('user'))
  console.log("user",this.user)
  this.activMsg=[]
  this.socket.connect();
  this.socket.emit('set-nickname',{ nickname:nickname,pro:this.user._id });
  console.log("ch",chatId)
  if (chatId!==0){this.chatService.getChatById(chatId).subscribe((res:Chatt)=>{
    console.log("bid",res)
    this.chat=res
    this.activChatId=nickname;
   // this.activeChatUser =res.client["first_name"]
    this.activeChatMsg =res.messages
    this.activeChatUser =res.client.first_name+" "+res.client.last_name;
    this.activeChatUserImg = "http://localhost:3000/auth/getFile/"+res.client.image
    console.log("ccc",this.activeChatUser )


    let chat={
      // avatar:,
      
       messages: [{
         avatar:'right',
        chatClass:'chat ',
        imagePath: this.user.image,
        time: new Date(),
        message:this.messageInputRef.nativeElement.value
       }],
       client:res.client,
       professionnel:res.professionnel
      // messageType: string;
    }
    console.log("chat",chat)

  
      let data=res
      var obj = {
        avatar:'right',
        chatClass:'chat ',
        imagePath: this.user.image,
        time: new Date(),
        message:this.messageInputRef.nativeElement.value
      };

       console.log("data",data)
      //  console.log(data.messages.push(obj))
        //let msgs=data.messages
      ////  console.log("msgs",msgs)
     /*    this.chatService.updateChat(message.from._id,msgs).subscribe(res=>{
          console.log("res",res)
        }) 
        */




 // this.activeChatUserImg = "http://localhost:3000/auth/getFile/"+this.chat.imagePath;
/*       this.activAvatar=this.chat.avatar
  this.activClass=this.chat.chatClass
  this.activMsgs=this.chat.messages */
  })
}
else if (chatId==0){
  this.chatService.getChatByClient(nickname).subscribe((res:any)=>{
    console.log("bid",res)
    this.chat=res.chatClient
    this.activChatId=nickname;
   // this.activeChatUser =res.client["first_name"]
    this.activeChatMsg =res.chatClient.messages
    this.activeChatUser =res.chatClient.client.first_name+" "+res.chatClient.client.last_name;
    this.activeChatUserImg = "http://localhost:3000/auth/getFile/"+res.chatClient.client.image
    console.log("ccc",this.activeChatUser )


    let chat={
      // avatar:,
      
       messages: [{
         avatar:'right',
        chatClass:'chat ',
        imagePath: this.user.image,
        time: new Date(),
        message:this.messageInputRef.nativeElement.value
       }],
       client:res.client,
       professionnel:res.professionnel
      // messageType: string;
    }
    console.log("chat",chat)

  
      let data=res
      var obj = {
        avatar:'right',
        chatClass:'chat ',
        imagePath: this.user.image,
        time: new Date(),
        message:this.messageInputRef.nativeElement.value
      };

       console.log("data",data)
      //  console.log(data.messages.push(obj))
        //let msgs=data.messages
      ////  console.log("msgs",msgs)
     /*    this.chatService.updateChat(message.from._id,msgs).subscribe(res=>{
          console.log("res",res)
        }) 
        */




 // this.activeChatUserImg = "http://localhost:3000/auth/getFile/"+this.chat.imagePath;
/*       this.activAvatar=this.chat.avatar
  this.activClass=this.chat.chatClass
  this.activMsgs=this.chat.messages */
  })
}
this.chatService.openMsg(chatId,true).subscribe((res:any)=>{
  console.log("opnmsg",res)
})
  }

  ngOnDestroy() {
    this.socket.disconnect();
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

}
