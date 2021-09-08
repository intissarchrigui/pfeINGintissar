import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionAnnoncesComponent } from './gestion-annonces.component';


const routes: Routes = [
  {
    path: '',
    component: GestionAnnoncesComponent,
    data: {
      title: 'Gestion annonces '
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionAnnoncesRoutingModule { }
