import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionProfileComponent } from './gestion-profile.component';


const routes: Routes = [
  {
    path: '',
    component: GestionProfileComponent,
    data: {
      title: 'Gestion Clients '
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionProfileRoutingModule { }
