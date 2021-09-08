import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreationAnnonceComponent } from './creation-annonce.component';


const routes: Routes = [
  {
    path: '',
    component: CreationAnnonceComponent,
    data: {
      title: 'Gestion annonces '
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreationAnnonceRoutingModule { }
