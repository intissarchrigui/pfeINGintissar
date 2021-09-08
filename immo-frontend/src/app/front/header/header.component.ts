import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'app/back/models/appointment';
import {ToastrService} from 'ngx-toastr';
import * as io  from 'socket.io-client';
import {Howl, Howler} from 'howler';
import { AuthService } from '../_services/auth.service';
//import {io} from 'socket.io-client/build/index';
//import {io} from 'socket.io-client/build/index';
//import { NotificationService } from '../_services/notification.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input()
    parentData:string;
  socket: any;
  sound;
  user;
  public data: any;
  isLoggedIn:boolean;
  placement = "bottom-right";
  constructor(private toastr: ToastrService, private authService:AuthService,private router: Router //private notifservice:NotificationService
    ) { 
      this.isLoggedIn = this.authService.isLoggedIn();
      this.socket = io('http://127.0.0.1:3001') ;
      this.sound = new Howl({
        src: ['../../../assets/assets/js/sound.mp3']
      });
    /*   if (this.isLoggedIn) {
        this.router.navigate(['/']);
      } */
    }

  ngOnInit(): void {
    console.log("parentData",this.parentData)
    this.user = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.socket)
    if (this.user.role === 'Client') {
     // this.notifservice.handleConnection()
  this.socket.on('connection',data=>{
        console.log("data",data)
      
      })
   
      
  this.socket.on('newAppoin', dataAppoin => {
    console.log('dataAppoin',dataAppoin)
    this.sound.play();
    this.showSuccessAppointment(dataAppoin.start);
   })
 

  }
  }
  logout() {
    this.authService.logout();
    //sessionStorage.setItem('UserConnect', null);
    //sessionStorage.setItem('user', null);
  }

  showSuccessAppointment(eventDateStart: any) {
    this.toastr.success(eventDateStart , 'Nouveau rendez-vous  !',{ timeOut: 20000,extendedTimeOut: 2000000000} );
  } 

}
