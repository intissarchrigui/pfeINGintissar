import { Component, ViewContainerRef, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
//import {io} from 'socket.io-client';
import * as io  from 'socket.io-client';
//import {io} from 'socket.io-client/build/index';
//import { NotificationService } from './front/_services/notification.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
    @Input()
    parentData:string;
    socket: any;
    user;
    public data: any;
    subscription: Subscription;

    constructor(private router: Router,private toastr: ToastrService,//private notifservice:NotificationService
        ) { this.socket = io('http://127.0.0.1:3001') ;
       }

    ngOnInit() {
     //   console.log("dataaa",this.data)
        this.subscription = this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe(() => window.scrollTo(0, 0));
           // console.log("parentData",this.parentData)
            this.user = JSON.parse(sessionStorage.getItem('user'));
            console.log("user",this.user)
              if (this.user.role === 'Admin') {
               // this.notifservice.handleConnection()
            this.socket.on('connection',data=>{
                    console.log("data",data)
                  
                  })
                this.socket.on('newReclamation', data2 => {
                  this.data = data2
          
           
                 // this.showSuccess(data2);
               
                 console.log("data2",data2);
                }) 


            }
    }


    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
       // console.log("parentData",this.parentData)
    }

   /*   showSuccess(eventDateStart: any) {
        this.toastr.success(eventDateStart , 'Nouvel évenement !',{ timeOut: 20000,extendedTimeOut: 2000000000} );
      } 
 */


}