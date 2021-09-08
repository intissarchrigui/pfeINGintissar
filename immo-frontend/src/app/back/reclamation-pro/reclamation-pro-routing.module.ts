import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReclamationProComponent } from './reclamation-pro.component';


const routes: Routes = [
  {
  path: '',
  component: ReclamationProComponent,
  data: {
    title: 'reclamations '
  }
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReclamationProRoutingModule { }
