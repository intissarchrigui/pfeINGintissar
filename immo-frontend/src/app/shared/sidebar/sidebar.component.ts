import { Component, OnInit, Input, ViewChild, OnDestroy, ElementRef, Renderer2, AfterViewInit } from "@angular/core";

import { ROUTES } from './sidebar-routes.config';
import { RouteInfo } from "./sidebar.metadata";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { customAnimations } from "../animations/custom-animations";
import { ConfigService } from '../services/config.service';
import { LayoutService } from '../services/layout.service';
import { Subscription } from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import * as io  from 'socket.io-client';
import {Howl, Howler} from 'howler';

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  animations: customAnimations
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('toggleIcon') toggleIcon: ElementRef;
  public menuItems: any[];
  depth: number;
  activeTitle: string;
  activeTitles: string[] = [];
  expanded: boolean;
  nav_collapsed_open = false;
  logoUrl = 'assets/img/logo.png';
  public config: any = {};
  layoutSub: Subscription;
  user;
  socket;
  sound;
  notification: Number;
  notifications = [];
  public data: any;
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private configService: ConfigService,
    private layoutService: LayoutService,
    private toastr: ToastrService,
  ) {
    this.socket = io('http://127.0.0.1:3001') ;
 /*    this.sound = new Howl({
      src: ['../../../assets/assets/js/sound.mp3']
    }); */
    if (this.depth === undefined) {
      this.depth = 0;
      this.expanded = true;
    }
 

    this.layoutSub = layoutService.customizerChangeEmitted$.subscribe(
      options => {
        if (options) {
          if (options.bgColor) {
            if (options.bgColor === 'white') {
              this.logoUrl = 'assets/img/logo-dark.png';
            }
            else {
              this.logoUrl = 'assets/img/logo.png';
            }
          }

          if (options.compactMenu === true) {
            this.expanded = false;
            this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
            this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
            this.nav_collapsed_open = true;
          }
          else if (options.compactMenu === false) {
            this.expanded = true;
            this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
            this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
            this.nav_collapsed_open = false;
          }

        }
      });

  }


  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    console.log("user",this.user)
    let role=this.user.role
    this.config = this.configService.templateConf;
    this.menuItems = ROUTES;



    if (this.config.layout.sidebar.backgroundColor === 'white') {
      this.logoUrl = 'assets/img/logo-dark.png';
    }
    else {
      this.logoUrl = 'assets/img/logo.png';
    }
 
  
  /* if (this.user.role === 'Admin') { 
   this.socket.on('connection',data=>{
           console.log("data",data)
         
         })
       this.socket.on('newReclamation', data2 => {
         this.data = data2.title
         this.notifications.push("Nouvelle reclamation:"+this.data);
      this.notification = this.notifications.length;
      console.log("Notiftab",this.notifications);
      console.log("notiflength",this.notification);
  console.log("data2",data2)
         this.showSuccessReclamation(data2.title);
         this.sound.play();
         console.log("sound",this.sound)
        console.log("data2",data2);
       }) 
       this.socket.on('newAnnonce', data3 => {
        this.data = data3.titre
        this.notifications.push("Nouvelle annonce:"+this.data);
        this.notification = this.notifications.length;
        console.log("Notiftab",this.notifications);
        console.log("notiflength",this.notification);
         console.log("data3",data3)
        this.showSuccessAnnonce(data3.titre);
     
        this.sound.play();
       console.log("data3",data3);
      }) 


   } */
  }

  ngAfterViewInit() {

    setTimeout(() => {
      if (this.config.layout.sidebar.collapsed != undefined) {
        if (this.config.layout.sidebar.collapsed === true) {
          this.expanded = false;
          this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
          this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
          this.nav_collapsed_open = true;
        }
        else if (this.config.layout.sidebar.collapsed === false) {
          this.expanded = true;
          this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
          this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
          this.nav_collapsed_open = false;
        }
      }
    }, 0);


  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }

  toggleSlideInOut() {
    this.expanded = !this.expanded;
  }

  handleToggle(titles) {
    this.activeTitles = titles;
  }

  // NGX Wizard - skip url change
  ngxWizardFunction(path: string) {
    if (path.indexOf("forms/ngx") !== -1)
      this.router.navigate(["forms/ngx/wizard"], { skipLocationChange: false });
  }

}
