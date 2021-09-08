import { Component, OnInit,  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef } from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { DisponibilityService } from '../services/disponibility.service';
import Disponibility from '../models/disponibility';
const colors: any = {
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
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-disponibilities',
  templateUrl: './disponibilities.component.html',
  styleUrls: ['./disponibilities.component.css']
})
export class DisponibilitiesComponent implements OnInit {

  @ViewChild('modalContentUpdate') modalContentUpdate: TemplateRef<any>;
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  calendarTimeZone = "UTC";
  view: string = 'month';
  date1= new Date();
  date2= new Date();
  titre="";
  date3= new Date();
  date4= new Date();
  titre2="";
  agence;
 user;
 alertAddDispo:boolean=false;
 alertUpdateDispo:boolean=false;
 eventClickId: any;
 currentDisponibility:Disponibility;
  newEvent: CalendarEvent;

  viewDate: Date = new Date();
  updateForm:FormGroup;
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

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];
  eve: CalendarEvent[]=[];
  activeDayIsOpen: boolean = true;

  constructor(
    private modal: NgbModal,
     private disponibilityService:DisponibilityService,
      private _formBuilder: FormBuilder,
      private toastr: ToastrService) { }
  ngOnInit(): void {
    this.user=JSON.parse(sessionStorage.getItem('user'));
 this.agence=this.user

    console.log( this.agence)
 this.disponibilityService.getDisponibilitiesByAgency( this.agence.nom_agence).subscribe((res:CalendarEvent[]) =>{
    console.log("res",res)
    this.eve=res
this.refresh.next();
     for (var i = 0; i < this.eve.length; i++) { 
     console.log("res",this.eve[i])
     this.events.push({
    _id:this.eve[i]._id,
    title: this.eve[i].title,
    start: new Date(this.eve[i].start),
    end: new Date(this.eve[i].end),
    color: this.eve[i].color,
    agence:this.agence

    

     })
   // var today = new Date();
   // this.start.setDate(today.getDate()-7);
     }
  this.refresh.next();
       
    });
    this.updateForm = this._formBuilder.group({
      titre2: ['', Validators.required],
      date3: [new Date(), Validators.required],
      date4: [new Date(), Validators.required],
    });

  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log("evv",events)
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


  changeDatetoUTC(d) {
    const now = new Date(d);
    return new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  }

  
  handleEvent(action: string, event: CalendarEvent): void {
    console.log("evId",event)
    //this.eventClickId = event.id
    console.log("clickEv", this.eventClickId)
    this.modalData = { event, action };
    this.modal.open(this.modalContentUpdate);
  }


  addDisponibility(): void {
    this.newEvent = {
      title: this.titre,
      start: new Date(this.date1.setHours(this.date1.getHours() + 1)) ,
      end:  new Date(this.date2.setHours(this.date2.getHours() + 1)) ,
      color: colors.yellow,
      agence:this.agence
     
 /*      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },*/
 //  actions: this.actions
    }
 
    this.events.push(this.newEvent);
   console.log(this.newEvent.start)
   this.disponibilityService.addDisponibility(this.newEvent).subscribe((res:any)=>{
    console.log(res)
    this.events=res
   // this.alertAddDispo=true

    this.toastr.success('Votre disponibilité a été ajouté avec succés !' ,'', {
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
    });
     })
   
    this.refresh.next();
   // this.handleEvent('Add new event', this.newEvent);
    console.log(this.date1)
      
   
    console.log(this.newEvent.color)
     this.refresh.next();
  }

  deleteDisponibility(_id): void{
    Swal.fire({
      title: 'êtes-vous sûr?',
      text: 'Vous ne pourrez plus récuperer cela!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.value) {
        this.disponibilityService.deleteDisponibility(_id).subscribe(res =>{
    console.log(res)
    this.events = this.events.filter(event => event._id !== _id);
    //this.ngOnInit()
        })
        Swal.fire(
          'Supprimé',
          'Cette disponibilité a été supprimée avec succés',
          'success'
        );
      
      }
      })
  }

  getDisponibilityById(_id){
    console.log("_id",_id)
    this.disponibilityService.getDisponibilityById(_id).subscribe((res :Disponibility)=>{
      console.log(res)
      this.currentDisponibility=res
      console.log("curr", this.currentDisponibility.startDate)
      this.updateForm.patchValue({
        _id:this.currentDisponibility._id,
        titre2:this.currentDisponibility.title,
          date3: this.currentDisponibility.startDate,
          date4:this.currentDisponibility.endDate
     
     });
     // this.titre2=this.currentDisponibility.title
     // this.date3=this.currentDisponibility.startDate
      //this.date4=this.currentDisponibility.endDate

           /*     this.updateForm.patchValue({
    _id:this.currentRecalamation ._id,
      title2:this.currentRecalamation.title,
      description2:this.currentRecalamation.description
 
 }); */
          })
  }
  

  updateDisponibility(_id): void{
    //this.title=this.currentRecalamation.title,
   // this.description=this.currentRecalamation.description
    this.newEvent={
    title:this.updateForm.value.titre2,
    start:this.updateForm.value.date3,
    end:this.updateForm.value.date4,
 color: colors.yellow,
   agence: this.agence
      }
      this.events.push(this.newEvent);
  //    this.events=this.events.splice(this.events.length);
       //  console.log(this.currentDisponibility._id)
        this.disponibilityService.updateDisponibility(_id,this.newEvent).subscribe((res:any) =>{
    console.log(res)
   // this.events=res
   this.toastr.success('Votre disponibilité a été modifié avec succés !' ,'', {
    timeOut: 10000,
    positionClass: 'toast-bottom-right',
  });
    //this.alertUpdateDispo=true;
    this.events = this.events.filter(event => event._id !== _id);
  //  this.getReclamations()
        })
       
        this.refresh.next();
      }




  open()
{  this.modal.open(this.modalContent, { size: 'lg' });
 console.log(this.date1)
 console.log(this.date2)
this.refresh.next();
}

 /*  addDisponibility(): void {
  
    const newDisponibility={
      title:  this.newEvent.title,
      startDate:  new  Date(this.modalData.event.start),
      endDate: new Date(this.modalData.event.end ),
      
    }
    console.log(newDisponibility)

    this.disponibilityService.addDisponibility(newDisponibility).subscribe((res: any) => {
      this.events = res;
      this.refresh.next();
      this.ngOnInit();
    });
    console.log(this.events)

     this.refresh.next();
    this.handleEvent('Add new event', this.newEvent);
  
  } */
}
