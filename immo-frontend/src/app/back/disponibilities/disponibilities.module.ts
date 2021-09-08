import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisponibilitiesRoutingModule } from './disponibilities-routing.module';
import { DisponibilitiesComponent } from './disponibilities.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { NgbModalModule, NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
//import { CalendarRoutingModule } from "./calendar-routing.module";

//import { CalendarsComponent } from "./calendar.component";
import { DateTimePickerComponent } from './date-time-pick.component'
@NgModule({
  declarations: [DisponibilitiesComponent,DateTimePickerComponent],
  imports: [
    CommonModule,
    DisponibilitiesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule, NgbDatepickerModule, NgbTimepickerModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ]
})
export class DisponibilitiesModule { }
