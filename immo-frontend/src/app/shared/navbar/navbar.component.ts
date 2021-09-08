import { Component, Output, EventEmitter, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from '../services/layout.service';
import { Subscription } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { AuthService } from 'app/front/_services/auth.service';
import {ToastrService} from 'ngx-toastr';
import * as io  from 'socket.io-client';
import {Howl, Howler} from 'howler';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  currentLang = "en";
  toggleClass = "ft-maximize";
  placement = "bottom-right";
  public isCollapsed = true;
  layoutSub: Subscription;
  user;
  socket;
  sound;
  notification: Number;
  notifications:any[] = [];
  notifcationsStorage:any[] = [];
  arrayNotifications:any[] = [];
  public data: any;
  @Output()
  toggleHideSidebar = new EventEmitter<Object>();

  public config: any = {};

  constructor(public translate: TranslateService, private layoutService: LayoutService, private configService:ConfigService,private authService:AuthService,  private toastr: ToastrService) {
    this.socket = io('http://127.0.0.1:3001') ;
  /*   this.sound = new Howl({
      src: ['../../../assets/assets/js/sound.mp3']
    }); */
    this.user = JSON.parse(sessionStorage.getItem('user'));
    console.log("user",this.user)
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|es|pt|de/) ? browserLang : "en");

    this.layoutSub = layoutService.changeEmitted$.subscribe(
      direction => {
        const dir = direction.direction;
        if (dir === "rtl") {
          this.placement = "bottom-left";
        } else if (dir === "ltr") {
          this.placement = "bottom-right";
        }
      });
  }

  ngOnInit() {
 
    this.arrayNotifications = JSON.parse(localStorage.getItem('notifications'))
    this.notification=this.arrayNotifications.length
    this.config = this.configService.templateConf;


 //   if (this.user.role === 'Admin') {
      // this.notifservice.handleConnection()
   this.socket.on('connection',data=>{
           console.log("data",data)
         
         })
      this.socket.on('newReclamation', data2 => {
         this.data = data2.title
         let obj={
           title: "Nouvelle reclamation:"+data2.title,
           type:'reclamation'
         } 
        // this.notifications.push(obj);

     // localStorage.setItem('notifications', JSON.stringify( this.notifications));
 
      //notifcationsStorage.push(obj)
      console.log("Notiftab",this.notifications);
      console.log("notiflength",this.notification);
  console.log("data2",data2)
        this.addCommentLocalStorage(obj)
         this.showSuccessReclamation(data2.title);
        // this.sound.play();
         console.log("sound",this.sound)
        console.log("data2",data2);
       }) 

  

   /*    this.notifcationsStorage=JSON.parse(localStorage.getItem('notifications'));
      this.notification = this.notifcationsStorage.length; */
  // }



  

     this.socket.on('newAnnonce', data3 => {
      this.data = data3.titre
      let obj3={
        title: "Nouvelle annonce:"+data3.titre,
        type:'annonce'
      }
     // this.notifications.push(obj);

     // localStorage.setItem('notifications', JSON.stringify( this.notifications));
     this.addCommentLocalStorage(obj3)
     this.showSuccessAnnonce(data3.titre);
      console.log("Notiftab",this.notifications);
      console.log("notiflength",this.notification);
       console.log("data3",data3)
  
   
     // this.sound.play();
     console.log("data3",data3);
    }) 

 /*    this.notifcationsStorage=JSON.parse(localStorage.getItem('notifications'));
    this.notification = this.notifcationsStorage.length; */
 //}
  } 

   addCommentLocalStorage(obj) {
  
    let id;
    this.arrayNotifications = this.getFromLocalStorage();
   
    this.arrayNotifications.length === 0 ? id = 0 : id = (this.arrayNotifications[this.arrayNotifications.length - 1].id) + 1

    this.arrayNotifications.push(obj)
    localStorage.setItem('notifications', JSON.stringify(this.arrayNotifications))
  
}

 getFromLocalStorage() {
 // let arrayNotifications;
  if(localStorage.getItem('notifications') === null) {
    this.arrayNotifications = []
  } else {
    this.arrayNotifications = JSON.parse(localStorage.getItem('notifications'))
  }
 
  console.log("lngth", this.notification)
  return this.arrayNotifications
}

  showSuccessReclamation(reclamationName :string) {
    if (this.user.role==='Admin'){
    this.toastr.success(reclamationName , 'Nouvelle Réclamation !',{ timeOut: 20000,extendedTimeOut: 2000000000} );
  } 
} 

  showSuccessAnnonce(annonceName :string) {
 if (this.user.role==='Admin'){
    this.toastr.success(annonceName , 'Nouvelle Annonce !',{ timeOut: 20000,extendedTimeOut: 2000000000} );
  } 
}

showSuccessAppointment(AppointmentComm :string) {
  if (this.user.role==='Client'){
     this.toastr.success(AppointmentComm , 'Nouveau rendez-vous !',{ timeOut: 20000,extendedTimeOut: 2000000000} );
   } 
 }
  ngAfterViewInit() {

  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }

  ChangeLanguage(language: string) {
    this.translate.use(language);
  }

  ToggleClass() {
    if (this.toggleClass === "ft-maximize") {
      this.toggleClass = "ft-minimize";
    } else {
      this.toggleClass = "ft-maximize";
    }
  }

  toggleNotificationSidebar() {
    this.layoutService.emitNotiSidebarChange(true);
  }

  toggleSidebar() {
    const appSidebar = document.getElementsByClassName("app-sidebar")[0];
    if (appSidebar.classList.contains("hide-sidebar")) {
      this.toggleHideSidebar.emit(false);
    } else {
      this.toggleHideSidebar.emit(true);
    }
  }
  logout() {
    this.authService.logout();
    //sessionStorage.setItem('UserConnect', null);
    //sessionStorage.setItem('user', null);
  }

}
