import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionClientsComponent } from './gestion-clients.component';


const routes: Routes = [
  {
    path: '',
    component: GestionClientsComponent,
    data: {
      title: 'Gestion Clients '
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionClientsRoutingModule { }
