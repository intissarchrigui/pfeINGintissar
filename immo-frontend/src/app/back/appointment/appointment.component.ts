import { Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { NgbDate,  NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct, NgbCalendar, NgbDatepicker, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Appointment } from '../models/appointment';
import { AppointmentService } from '../services/appointments.service';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
  styles: [`
  .custom-day {
    text-align: center;
    padding: 0.185rem 0.25rem;
    display: inline-block;
    height: 2rem;
    width: 2rem;
  }
  .custom-day.focused {
    background-color: #e6e6e6;
  }
  .custom-day.range, .custom-day:hover {
    background-color: rgb(2, 117, 216);
    color: white;
  }
  .custom-day.faded {
    background-color: rgba(2, 117, 216, 0.5);
  }
`]
})
export class AppointmentComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
 
  model = {
    pending: false,
    confirmed: false,
    canceled: false
  
  };
  user;
  data:any;
  date1= new Date();
  date2= new Date();
  currentAppoint;
  refresh: Subject<any> = new Subject();
  updateAppoint:boolean=false
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  hoveredDate: NgbDate | null = null;
  
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
     this.getAllAppointmets();
     
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }
  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();


  RDVs: Appointment[];
  appointmentValue;
  constructor(
    private modal: NgbModal,
    private appointmentService:AppointmentService,
    private calendar: NgbCalendar, 
    public formatter: NgbDateParserFormatter,
    private toastr: ToastrService) 
  { 
}



  ngOnInit(): void {
    this.user=JSON.parse(sessionStorage.getItem('user'));
  this.getConfirmedAppointments();

  }
  getAllAppointmets(){
    if (this.fromDate && this.toDate){
      let to=this.toDate.year+"-"+ ('0' + (this.toDate.month)).slice(-2)+"-"+ ('0' + (this.toDate.day)).slice(-2);    
      let from=this.fromDate.year+"-"+('0' + (this.fromDate.month)).slice(-2)+"-"+ ('0' + (this.fromDate.day)).slice(-2);

    this.appointmentService.getAppointmentsDate(from,to).subscribe((res:Appointment[]) =>{
      console.log("res",res)
       this.RDVs=res;
     })
  } else{
    this.appointmentService.getAllRDV().subscribe((res:Appointment[]) =>{
      console.log("res",res)
       this.RDVs=res;
     })
    }
}

getCanceledAppointments(){
  if(this.fromDate && this.toDate){
    let to=this.toDate.year+"-"+ ('0' + (this.toDate.month)).slice(-2)+"-"+ ('0' + (this.toDate.day)).slice(-2);    
    let from=this.fromDate.year+"-"+('0' + (this.fromDate.month)).slice(-2)+"-"+ ('0' + (this.fromDate.day)).slice(-2);
  if(this.model.canceled){
  //this.SpinnerService.show();
  this.appointmentService.getAppointmentsWithDate('Canceled',from,to).subscribe((res:Appointment[]) => {

    this.RDVs=res;
    this.model.confirmed=false;
    this.model.pending=false;
    

   // this.SpinnerService.hide();


  })
}else this.getAllAppointmets();
  }else{
    if(this.model.canceled){
     // this.SpinnerService.show();
      this.appointmentService.getRDV('Canceled').subscribe((res:Appointment[]) => {
    
        this.RDVs=res;
        this.model.confirmed=false;
        this.model.pending=false;
        
    
       // this.SpinnerService.hide();
    
    
      })
    }else this.getAllAppointmets();

  }
}

getConfirmedAppointments(){
  if(this.fromDate && this.toDate){
    let to=this.toDate.year+"-"+ ('0' + (this.toDate.month)).slice(-2)+"-"+ ('0' + (this.toDate.day)).slice(-2);    
    let from=this.fromDate.year+"-"+('0' + (this.fromDate.month)).slice(-2)+"-"+ ('0' + (this.fromDate.day)).slice(-2);

  if(this.model.confirmed){
 // this.SpinnerService.show();
  this.appointmentService.getAppointmentsWithDate('Confirmed',from,to).subscribe((res:Appointment[]) => {

    this.RDVs=res;
    this.model.canceled=false;
    this.model.pending=false;
    

    //this.SpinnerService.hide();


  })
}else this.getAllAppointmets();
  }else{
    if(this.model.confirmed){
    //  this.SpinnerService.show();
      this.appointmentService.getRDV('Confirmed').subscribe((res:Appointment[]) => {
        this.RDVs=res;
       // this.listreservation = data
        this.model.canceled=false;
        this.model.pending=false;
        
    
        //this.SpinnerService.hide();
    
    
      })
    }else this.getAllAppointmets();

  }
}

getPendingAppointments(){
  if(this.fromDate && this.toDate){
    let to=this.toDate.year+"-"+ ('0' + (this.toDate.month)).slice(-2)+"-"+ ('0' + (this.toDate.day)).slice(-2);    
    let from=this.fromDate.year+"-"+('0' + (this.fromDate.month)).slice(-2)+"-"+ ('0' + (this.fromDate.day)).slice(-2);

  if(this.model.pending){
//  this.SpinnerService.show();
  this.appointmentService.getAppointmentsWithDate('Pending',from,to).subscribe((res:Appointment[]) => {

    this.RDVs=res;
    this.model.confirmed=false;
    this.model.canceled=false;
    

   // this.SpinnerService.hide();


  })
}else this.getAllAppointmets();
  }else{
    if(this.model.pending){
    //  this.SpinnerService.show();
      this.appointmentService.getRDV('Pending').subscribe((res:Appointment[]) => {
    
        this.RDVs=res;
        this.model.confirmed=false;
        this.model.canceled=false;
        
    
      //  this.SpinnerService.hide();
    
    
      })
    }else this.getAllAppointmets();

  }
}


confirmAppointment(_id) {
  let now = new Date();
  this.appointmentService.acceptAppoint(_id,{status:'Confirmed',
  confirmedDate: now
  }).subscribe(res => {
    console.log(res);
   
   // Swal.fire('Rendez vous  accepté avec succés', '', 'success');
    this.getAllAppointmets();

  }
  );
}

rejectAppointment(_id) {
  let now = new Date();
 
 
   /* Swal.fire({
      title: 'rendez vous annulé !',
      text: 'Vous voulez lui donner un autre rendez vous !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK!',
      cancelButtonText: 'Annuler',
    })
   .then((result) => {
      if (result.value) {

        Swal.fire('Rendez accordé avec succés', '', 'success');
      }
    }); */
    Swal.fire({
      title: 'êtes-vous sûr?',
      text: 'Vous ne pourrez plus récuperer cela!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, annule-le!',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.value) {
        this.appointmentService.rejectAppoint(_id,{status:'Canceled',
        cancelDate: now
        } ).subscribe(res => {
    
          console.log(res);
        });
    this.getAllAppointmets();

    Swal.fire(
      'Annulé',
      'Votre rendez-vous a été annulé avec succés',
      'success'
    );
  }
});

}


getAppointById(id) {
  this.appointmentService.getAppoint(id).subscribe((res: any) => {
    this.currentAppoint = res;
    console.log(this.currentAppoint);
  });
}

updateAppointment() {
  let now = new Date();
  const data={
    confirmedDate: new Date(),
    start: new Date(this.date1.setHours(this.date1.getHours() + 1)) ,
    end:  new Date(this.date2.setHours(this.date2.getHours() + 1)) ,
    status: 'Confirmed',
    agence: this.currentAppoint.agence,
    client: this.currentAppoint.client._id,
    annonce:this.currentAppoint.annonce

  }
  let client= this.currentAppoint.client._id

  this.appointmentService.updateAppoint( this.currentAppoint._id,data ).subscribe(res => {
    let start=this.currentAppoint.start
    let end=this.currentAppoint.end
 
  // console.log ("a",a)
    console.log(res);
    this.toastr.success('Rendez-vous modifié avec succés !' ,'', {
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
    });
   // Swal.fire('Rendez-vous modifié avec succés', '', 'success');
    this.getAllAppointmets();

  }
  );

}

open()
{  this.modal.open(this.modalContent, { size: 'lg' });
this.refresh.next();
}
}