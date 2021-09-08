import { 
  Component,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Renderer2,
 } from '@angular/core';
 import { Subscription } from "rxjs";
import Profesionnel from '../_models/Profesionnel';
import * as io  from 'socket.io-client';
import { ChatService } from '../_services/chat.service';
import { Chat } from 'app/back/chat/chat.model';
import { Chatt } from 'app/back/models/chat.model';
import { updateArrayBindingPattern } from 'typescript';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit,AfterViewInit, OnDestroy  {

  @ViewChild("chat") chat: ElementRef;
  clickbuttonEventData:Profesionnel=new Profesionnel()
  url="http://localhost:3000/auth/getFile/"
  options = {
    direction: "ltr",
    bgColor: "black",
    transparentColor: "",
    bgImage: "assets/img/sidebar-bg/01.jpg",
    bgImageDisplay: true,
    compactMenu: false,
    sidebarSize: "sidebar-md",
    layout: "Light"
  };
  size = "sidebar-sm";
  isOpen = false;
  public config: any = {};
  layoutSub: Subscription;
  isBgImageDisplay = true;
  selectedBgColor: string = "black";
  selectedBgImage: string = "assets/img/sidebar-bg/01.jpg";
  selectedTLBgColor: string = "";
  selectedTLBgImage: string = "";
user;
socket:any;
  message;
  chats:Chatt []=[];
  messagess=[]
  messages =[];
  item: number = 0;
  activeChatUser: string;
  activeChatUserImg: string;
  @ViewChild('messageInput') messageInputRef: ElementRef;
  @ViewChild('chatSidebar') sidebar:ElementRef;
  @ViewChild('contentOverlay') overlay:ElementRef;
@Output() directionEvent = new EventEmitter<Object>();
 clickbutt(message:boolean){
alert(message)
console.log(message)
message=this.isOpen=true
  }
  nickname;
  constructor(  private elRef: ElementRef,
    private renderer: Renderer2,
    private chatService:ChatService) {    this.socket = io('http://127.0.0.1:3002') 
    //this.socket.connect();
    this.user=JSON.parse(sessionStorage.getItem('user'))
    console.log("user",this.user)
  // this. joinChat()
  //  this.socket.emit('set-nickname',{ nickname:this.clickbuttonEventData._id,pro:this.user});
}

  ngOnInit(): void {
   
    this.socket.on('message', message => {
      console.log(message)
      this.messagess.push(message)
      console.log(this.messagess)
     // this.chats.push(message)
     this.user=JSON.parse(sessionStorage.getItem('user'))
     console.log("user",this.user)
     console.log(this.clickbuttonEventData._id  )
    // this.messagess.forEach(msg=>{
      if (message.from==this.clickbuttonEventData._id && message.to==this.user._id) {
        const element = document.createElement('li');
        element.innerHTML = message.text.message;
        element.style.background = 'white';
        element.style.padding =  '15px 30px';
        element.style.margin = '10px';
        element.style.marginRight = '200px';
        element.style.overflowWrap= 'break-word';
        document.getElementById('message-list').appendChild(element);
      }
      //})
    
     // this.receivedMessage(this.message);
    });
    console.log(this.clickbuttonEventData)
  
    this.user=JSON.parse(sessionStorage.getItem('user'))
    console.log("user",this.user)
    this.chatService.getAllChats().subscribe((res:Chatt[])=>{
      console.log("clickb",res[1].professionnel) 
      console.log("clt",res[1].client._id) 
      this.chats=res.filter((chat)=>chat.client._id===this.user._id)
      console.log("resFil", this.chats)
    })
   //  this.config = this.configService.templateConf;
     this.isOpen = !this.config.layout.customizer.hidden;
 
     if (this.config.layout.sidebar.size) {
       this.options.sidebarSize = this.config.layout.sidebar.size;
       this.size = this.config.layout.sidebar.size;
     }

  
  }
 /*  joinChat() {
    this.socket.connect();
    this.socket.emit('set-nickname',{ nickname:this.clickbuttonEventData._id,pro:this.user});
  
  } */
  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
    this.socket.disconnect();
  }
  SendMessage() {
    if (this.messageInputRef.nativeElement.value != "") {
  // this.messages.push(this.messageInputRef.nativeElement.value);
    console.log("message",this.messageInputRef.nativeElement.value)
    let message =this.messageInputRef.nativeElement.value
    console.log(message)
    this.user=JSON.parse(sessionStorage.getItem('user'))
    console.log("user",this.user)
    this.socket.connect();
  //  this.socket.emit('set-nickname',{ nickname:this.clickbuttonEventData._id,pro:this.user});
    this.socket.emit('add-message', { text:message });
  console.log("sock", message)
    const element = document.createElement('li');
    element.innerHTML = message;
    element.style.background = '#ff5424';
    element.style.padding =  '15px 30px';
     element.style.margin = '10px';
    element.style.marginLeft = '200px';
    element.style.textAlign = 'right';
    element.style.color = 'white';
    element.style.overflowWrap= 'break-word'; 

document.getElementById('message-list').appendChild(element);
    }
    this.messageInputRef.nativeElement.value = "";
    this.messageInputRef.nativeElement.focus();
    //this.messages.push(this.messageInputRef.nativeElement.value)
    this.user=JSON.parse(sessionStorage.getItem('user'))
    console.log("user",this.user)
    let chat={
      // avatar:,
      
       messages: [{
        chatClass:'right',
        imagePath: this.user.image,
        time: new Date(),
    
       }],
       client:this.user._id,
       professionnel:this.clickbuttonEventData._id
      // messageType: string;
    }
    console.log("chaat",chat)

   
 }
getAllChat(){
  this.user=JSON.parse(sessionStorage.getItem('user'))
  console.log("user",this.user)
  console.log("prooo",this.clickbuttonEventData._id) 

  console.log("prooo",this.clickbuttonEventData._id) 
  this.chatService.getAllChats().subscribe((res:Chatt[])=>{
    console.log("clickb",res[1].professionnel) 
    console.log("clt",res[1].client._id) 
    this.chats=res.filter((chat)=>{chat.professionnel===this.clickbuttonEventData._id &&chat.client._id===this.user._id})
    console.log("resFil", this.chats)
  })
}
  ngAfterViewInit() {
    setTimeout(() => {
      if (this.config.layout.dir) {
        this.options.direction = this.config.layout.dir;
      }

      if (this.config.layout.variant) {
        this.options.layout = this.config.layout.variant;
      }
      if (this.config.layout.sidebar.collapsed != undefined) {
        this.options.compactMenu = this.config.layout.sidebar.collapsed;
      }

      if (
        this.config.layout.sidebar.backgroundColor &&
        this.config.layout.sidebar.backgroundColor != ""
      ) {
        this.options.bgColor = this.config.layout.sidebar.backgroundColor;
        this.selectedBgColor = this.config.layout.sidebar.backgroundColor;
      } else {
        this.options.bgColor = "black";
        this.selectedBgColor = "black";
      }

      if (this.config.layout.sidebar.backgroundImage != undefined) {
        this.options.bgImageDisplay = this.config.layout.sidebar.backgroundImage;
        this.isBgImageDisplay = this.config.layout.sidebar.backgroundImage;
      }

      if (this.config.layout.sidebar.backgroundImageURL) {
        this.options.bgImage = this.config.layout.sidebar.backgroundImageURL;
        this.selectedBgImage = this.config.layout.sidebar.backgroundImageURL;
      }

      if (this.options.layout === "Transparent") {
        this.options.bgColor = "black";
        this.selectedBgColor = "black";
        this.options.bgImageDisplay = false;
        this.selectedTLBgColor = "";
        this.selectedBgImage = "";
        this.options.bgImage = "";
        this.isBgImageDisplay = false;

        if (this.config.layout.sidebar.backgroundColor) {
          if (this.config.layout.sidebar.backgroundColor === "bg-glass-1") {
            this.selectedTLBgImage = "assets/img/gallery/bg-glass-1.jpg";
            this.options.transparentColor = "bg-glass-1";
          } else if (
            this.config.layout.sidebar.backgroundColor === "bg-glass-2"
          ) {
            this.selectedTLBgImage = "assets/img/gallery/bg-glass-2.jpg";
            this.options.transparentColor = "bg-glass-2";
          } else if (
            this.config.layout.sidebar.backgroundColor === "bg-glass-3"
          ) {
            this.selectedTLBgImage = "assets/img/gallery/bg-glass-3.jpg";
            this.options.transparentColor = "bg-glass-3";
          } else if (
            this.config.layout.sidebar.backgroundColor === "bg-glass-4"
          ) {
            this.selectedTLBgImage = "assets/img/gallery/bg-glass-4.jpg";
            this.options.transparentColor = "bg-glass-4";
          } else {
            this.options.transparentColor = this.config.layout.sidebar.backgroundColor;
            this.selectedTLBgColor = this.config.layout.sidebar.backgroundColor;
          }
        } else {
          this.options.bgColor = "black";
          this.selectedBgColor = "black";
          this.options.bgImageDisplay = false;
          this.selectedBgColor = "";
          this.selectedTLBgColor = "";
          this.selectedTLBgImage = "assets/img/gallery/bg-glass-1.jpg";
          this.options.transparentColor = "bg-glass-1";
        }
      }
    }, 0);
  }

  sendOptions() {
    this.directionEvent.emit(this.options);
   // this.layoutService.emitChange(this.options);
  }

  bgImageDisplay(e) {
    if (e.target.checked) {
      this.options.bgImageDisplay = true;
      this.isBgImageDisplay = true;
    } else {
      this.options.bgImageDisplay = false;
      this.isBgImageDisplay = false;
    }
    //emit event to FUll Layout
    //this.layoutService.emitCustomizerChange(this.options);
  }

  toggleCompactMenu(e) {
    if (e.target.checked) {
      this.options.compactMenu = true;
    } else {
      this.options.compactMenu = false;
    }
    //emit event to FUll Layout
   // this.layoutService.emitCustomizerChange(this.options);
  }

  changeSidebarWidth(value) {
    this.options.sidebarSize = value;
    this.size = value;
    //emit event to FUll Layout
  //  this.layoutService.emitCustomizerChange(this.options);
  }

  onLightLayout() {
    this.options.layout = "Light";
    this.options.bgColor = "man-of-steel";
    this.selectedBgColor = "man-of-steel";
    if (this.isBgImageDisplay) {
      this.options.bgImageDisplay = true;
    }

    //emit event to FUll Layout
    //this.layoutService.emitCustomizerChange(this.options);
  }

  onDarkLayout() {
    this.options.layout = "Dark";
    this.options.bgColor = "black";
    this.selectedBgColor = "black";
    if (this.isBgImageDisplay) {
      this.options.bgImageDisplay = true;
    }
    //emit event to FUll Layout
   // this.layoutService.emitCustomizerChange(this.options);
  }

  onTransparentLayout() {
    this.options.layout = "Transparent";
    this.options.bgColor = "black";
    this.selectedBgColor = "black";
    this.options.bgImageDisplay = false;
    this.selectedBgColor = "";
    this.selectedTLBgColor = "";
    this.selectedTLBgImage = "assets/img/gallery/bg-glass-1.jpg";
    this.options.transparentColor = "bg-glass-1";

    //emit event to FUll Layout
   // this.layoutService.emitCustomizerChange(this.options);
  }

  toggleCustomizer() {
  this.clickbuttonEventData.Open=false
  console.log(this.clickbuttonEventData)
 /*    if (this.isOpen) {
      this.renderer.removeClass(this.customizer.nativeElement, "open");
      this.isOpen = false;
    } else {
      this.renderer.addClass(this.customizer.nativeElement, "open");
      this.isOpen = true;
    } */
  }

  closeCustomizer() {
    this.clickbuttonEventData.Open=false
    console.log(this.clickbuttonEventData)
  /*   this.renderer.removeClass(this.customizer.nativeElement, "open");
    this.isOpen = false; */
  }

  changeSidebarBgColor(color) {
    this.selectedBgColor = color;
    this.selectedTLBgColor = "";
    this.options.bgColor = color;
    if (this.isBgImageDisplay) {
      this.options.bgImageDisplay = true;
    }
    //emit event to FUll Layout
   // this.layoutService.emitCustomizerChange(this.options);
  }

  changeSidebarBgImage(url) {
    this.selectedBgImage = url;
    this.selectedTLBgImage = "";

    //emit event to FUll Layout
    this.options.bgImage = url;
    if (this.isBgImageDisplay) {
      this.options.bgImageDisplay = true;
    }
    //emit event to FUll Layout
    //this.layoutService.emitCustomizerChange(this.options);
  }

  changeSidebarTLBgColor(color) {
    this.selectedBgColor = "";
    this.selectedTLBgColor = color;
    this.selectedTLBgImage = "";
    this.options.transparentColor = color;
    this.options.bgImageDisplay = false;

    //emit event to FUll Layout

  //  this.layoutService.emitCustomizerChange(this.options);
  }

  changeSidebarTLBgImage(url, color) {
    this.selectedTLBgColor = "";
    this.selectedTLBgImage = url;
    this.options.transparentColor = color;
    this.options.bgImageDisplay = false;

    //emit event to FUll Layout

   // this.layoutService.emitCustomizerChange(this.options);
  }

}
