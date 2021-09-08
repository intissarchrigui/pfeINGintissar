import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionDemandesComponent } from './gestion-demandes.component';


const routes: Routes = [
  {
    path: '',
    component: GestionDemandesComponent,
    data: {
      title: 'Gestion demandes '
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionDemandesRoutingModule { }
