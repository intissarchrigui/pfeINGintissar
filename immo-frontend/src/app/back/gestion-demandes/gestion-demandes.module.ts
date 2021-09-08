import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchProfesionalPipe } from '../pipes/profesional.pipe';
import { GestionDemandesRoutingModule } from './gestion-demandes-routing.module';
import { GestionDemandesComponent } from './gestion-demandes.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
@NgModule({
  declarations: [GestionDemandesComponent,SearchProfesionalPipe],
  imports: [
    CommonModule,
    GestionDemandesRoutingModule,
    NgxPaginationModule,
    FormsModule, ReactiveFormsModule ,
    ModalModule.forRoot(),
  ]
})
export class GestionDemandesModule { }
