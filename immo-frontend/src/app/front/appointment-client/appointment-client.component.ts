import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Appointment } from 'app/back/models/appointment';
import { AppointmentService } from 'app/back/services/appointments.service';
import { DisponibilityService } from 'app/back/services/disponibility.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { NgbDate,  NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-appointment-client',
  templateUrl: './appointment-client.component.html',
  styleUrls: ['./appointment-client.component.css']
})
export class AppointmentClientComponent implements OnInit {
  userann;
  pa;
  RDVs: Appointment[]=[];


  constructor( private modal: NgbModal,
      private disponibilityService:DisponibilityService,
    private appointmentService:AppointmentService,) { }

  ngOnInit(): void {
    this.userann = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.userann._id)

  
    this.appointmentService.getRDvclient(this.userann._id).subscribe((res:Appointment[]) =>{
      console.log("res",res)
       this.RDVs=res;
     }) 
  }
  rejectAppointment(_id) {
    let now = new Date();
 
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
    this.ngOnInit();

    Swal.fire(
      'Annulé',
      'Votre rendez-vous a été annulé avec succés',
      'success'
    );
  }
});
  }
  

  }


