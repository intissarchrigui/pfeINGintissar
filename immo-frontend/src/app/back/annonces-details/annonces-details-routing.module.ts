import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnoncesDetailsComponent } from './annonces-details.component';


const routes: Routes = [
  {
    path: '',
    component: AnnoncesDetailsComponent,
    data: {
      title: 'annonces details '
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnoncesDetailsRoutingModule { }
