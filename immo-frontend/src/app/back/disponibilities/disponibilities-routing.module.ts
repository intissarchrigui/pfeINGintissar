import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisponibilitiesComponent } from './disponibilities.component';


const routes: Routes = [
  {
    path: '',
    component: DisponibilitiesComponent,
    data: {
      title: 'disponibility '
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisponibilitiesRoutingModule { }
