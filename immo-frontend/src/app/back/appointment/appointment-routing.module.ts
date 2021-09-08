import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentComponent } from './appointment.component';


const routes: Routes = [
  {
    path: '',
    component: AppointmentComponent,
    data: {
      title: 'Appointmets '
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
