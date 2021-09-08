import { Component, OnInit , ChangeDetectionStrategy,
  ViewChild,
  TemplateRef, 
  Output,
  EventEmitter} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { AnnonceService } from 'app/back/annonce.service';
import Annonce from 'app/back/models/annonce';
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AppointmentService } from 'app/back/services/appointments.service';
import { DisponibilityService } from 'app/back/services/disponibility.service';
import { ImagesAnnonceService } from 'app/back/services/imagesannonce.service';
import { MapLoaderService } from '../../back/maps/maps/map.loader';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { isSameDay, isSameMonth } from 'date-fns';
import { Appointment } from 'app/back/models/appointment';
import { DatePipe } from '@angular/common';
import Profesionnel from '../_models/Profesionnel';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-details-annonce',
  templateUrl: './details-annonce.component.html',
  styleUrls: ['./details-annonce.component.css']
})
export class DetailsAnnonceComponent implements OnInit {
  currentAnnonce:Annonce;
  id_Annnonce;
  alertRDV:boolean=false;
  annonce:Annonce;
  events: any[]=[];
  imageObject: Array<object>= [ ];;
  //markers: marker[]
  //url='http://localhost:3000/annonce/getFile/';
  agence;

dispoDay;
user;
form: any = {};
colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};
calendarVisible = true;
myParam;
view: string = 'month';
date1= new Date();
date2= new Date();
titre=""
commentaire=""
RDV=null
pipe;
//agence:string;
//user;
newEvent: CalendarEvent;

viewDate: Date = new Date();

modalData: {
  action: string;
  event: CalendarEvent;
};

actions: CalendarEventAction[] = [
  {
    label: '<i class="fa fa-fw fa-pencil"></i>',
    onClick: ({ event }: { event: CalendarEvent }): void => {
      this.handleEvent('Edit this event', event);
    }
  },
  {
    label: '<i class="fa fa-fw fa-times"></i>',
    onClick: ({ event }: { event: CalendarEvent }): void => {
      this.events = this.events.filter(iEvent => iEvent !== event);
      this.handleEvent('This event is deleted!', event);
    }
  }
];
public zoom: number;
public latitude: number;
public longitude: number;
refresh: Subject<any> = new Subject();
dispo;

//events: CalendarEvent[] = [];
eve: CalendarEvent[]=[];
activeDayIsOpen: boolean = true;
  constructor(private formBuilder: FormBuilder,
    private imageService: ImagesAnnonceService,
    private annonceService:AnnonceService,
    private route: ActivatedRoute,
    private disponibilityService:DisponibilityService,
    private appointmentService:AppointmentService,
    private modalService: NgbModal,
    private toastr: ToastrService
    )
     {    this.user=JSON.parse(sessionStorage.getItem('user'));
     console.log(this.user)}
     @Output() clickbuttonEvent = new EventEmitter<Object>();
  ngOnInit(): void {
    //this.pipe = new DatePipe('en-US'); // Use your own locale

        this.id_Annnonce = this.route.snapshot.paramMap.get('idAnnonce');
   //this.getAnnonceById(this.id_Annnonce);
 
   this.annonceService.getAnnonce( this.id_Annnonce).subscribe((res:Annonce) =>{
    console.log("res",res)
   
    this.currentAnnonce=res
    this.zoom = 10;
    this.latitude = this.currentAnnonce.addresse.latitude;
    this.longitude = this.currentAnnonce.addresse.longitude;
    this.agence=this.currentAnnonce.professionnel.nom_agence
    console.log("agence",this.agence)

    this.disponibilityService.getDisponibilitiesByAgency(this.agence).subscribe((res:any[]) =>{
      console.log(res)
      for(let i=0;i<res.length;i++){
        if(res[i].color.primary=="#e3bc08"){
       
          let dat=new Date(res[i].start)
          console.log(dat)
          let year=dat.getFullYear();
          console.log(year)
          let month=dat.getMonth()
          console.log(month)
          let day=dat.getDay()
          console.log(day)
          
        let  hour= new Date(dat.setHours(dat.getHours() -2))
        let  second= new Date(dat.getSeconds())
        let  minut= new Date(dat.getMinutes())
        let start=year+'-'+month+'-'+day+'-'+hour+':'+minut+':'+second
        console.log(start)
      
        let data={
          id:res[i]._id,
          start:res[i].start
        }
        this.events.push(data)
      
          //const now =new Date(res[i].start.toLocaleString())
         // console.log("now",now)
         // const myFormattedDate = this.pipe.transform(now, 'short');
         // console.log("myFormattedDate",myFormattedDate)
       
        }
        console.log(this.events)
        console.log("entre",res[i].color.primary)
      }
    //  this.events=res
      console.log("entre",this.events)
   
    //  console.log("user"+localStorage.getItem('id'))
      });
   
    })
 

  }

  sendEvent(element:Profesionnel){
    console.log(element)
    element.Open=true
    this.clickbuttonEvent.emit(element)
  }
/*   getAnnonceById(id) {
    this.annonceService.getAnnonce(id).subscribe((res: any) => {
      this.currentAnnonce = res;
      console.log(this.currentAnnonce);
   
    });
  }
 */


   

    datedisp(){

      console.log('votre RDV'+this.RDV );
    }
  
    CreateAppointment(ann){
      let rddv=this.RDV
      console.log(rddv)
      console.log("this.commentaire",this.commentaire)
      this.user=JSON.parse(sessionStorage.getItem('user'));
    //  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.commentaire,null, 4));
      this.appointmentService.CreateAppointment(this.RDV,this.user._id,ann,this.commentaire,{color: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
      }}).subscribe(res =>{
        console.log("resRDV",res)
        this.alertRDV=true;
        this.toastr.success('Votre rendez-vous a été envoyé avec succés !' ,'', {
          timeOut: 10000,
          positionClass: 'toast-bottom-right',
        });
      //  Swal.fire('votre Rendez-Vous a été ajouté avec succés', '', 'success');
       // this.ngOnInit()
       this.commentaire=""
        console.log(this.RDV)
       // console.log("user"+localStorage.getItem('id'))
         
      })
     
    }

    open(content) {
    /*   this.calendrierService.getCalendrierId(this.id).subscribe({
        next: (calendrierId) => {
          console.log(calendrierId);
          if (calendrierId) {
            this.calendrierService.getDisponibility(calendrierId).subscribe({
              next: (disponibility) => {
                this.disponibility = disponibility;
  
                this.calendarEvents = this.disponibility._embedded.disponibilites;
              },
              error: (err) => (this.erroMessage = err),
            });
          }
        },
        error: (err) => (this.erroMessage = err),
      }); */
      this.modalService.open(content, { size: "lg" });
    }
  
    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
     
     
     
      if (isSameMonth(date, this.viewDate)) {
        if (
          (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
          events.length === 0
        ) {
          this.activeDayIsOpen = false;
        } else {
          this.activeDayIsOpen = true;
          this.viewDate = date;
        }
      }
      console.log(this.modalData);
    }
  
    eventTimesChanged({
        event,
      newStart,
      newEnd
      }: CalendarEventTimesChangedEvent): void {
      event.start = newStart;
      event.end = newEnd;
      this.handleEvent('Dropped or resized', event);
      this.refresh.next();
      console.log(  event.start, event.end )
    }
  
    handleEvent(action: string, event: CalendarEvent): void {
      this.modalData = { event, action };
     // this.modalService.open(this.modalContent, { size: 'lg' });
    }

    AjouterFavoris(id){
      console.log("id",id)
      const data={
        
        client:this.user._id,
        annonce:this.id_Annnonce
        }
      this.annonceService.AjoutFavoris(data).subscribe(res =>{
        Swal.fire('Cette annonce a été ajouté au Favoris avec succés', '', 'success');
        console.log("favoris ajouté")
        console.log("user"+this.user._id)
   
      })
    }

  
}
