import Client from "app/front/_models/client";

export class Chatt {
  public _id:string;
  /*   public avatar: string;
    public chatClass: string;
    public imagePath: string;
    public time: Date; */

    public messages: Chat2[];
    public client:Client;
    public professionnel:any;
    public clt:any;
    public msgReadet:boolean
   // public messageType: string;
 
  /* 
    constructor(avatar: string, chatClass:string, imagePath: string, time: string, messages: string[], messageType: string) {
      this.avatar = avatar;
      this.chatClass = chatClass;
      this.imagePath = imagePath;
      this.time = time;
      this.messages = messages;
      this.messageType = messageType;
    } */
  }
  export class Chat2{
    public message:string
    public avatar: string;
    public chatClass: string;
    public imagePath: string;
    public time: Date;
    }