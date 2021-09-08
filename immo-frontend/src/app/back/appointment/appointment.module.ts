import 'flatpickr/dist/flatpickr.css'; 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentComponent } from './appointment.component';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgbModalModule, NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DateTimePickerComponent } from './date-time-picker.component';
import { FlatpickrModule } from 'angularx-flatpickr';
//import { CalendarRoutingModule } from "./calendar-routing.module";

//import { CalendarsComponent } from "./calendar.component";

import { SearchAppointmentPipe } from '../pipes/search-appointment.pipe';

@NgModule({
  declarations: [AppointmentComponent,DateTimePickerComponent,SearchAppointmentPipe],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    FormsModule,
    NgbModalModule, NgbDatepickerModule, NgbTimepickerModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    
    NgbModule,
    FlatpickrModule.forRoot()
  ],
  exports: [BsDatepickerModule]
})
export class AppointmentModule { }
