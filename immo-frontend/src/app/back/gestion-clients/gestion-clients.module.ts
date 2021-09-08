import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchClientPipe } from '../pipes/client.pipe';
import { GestionClientsRoutingModule } from './gestion-clients-routing.module';
import { GestionClientsComponent } from './gestion-clients.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [GestionClientsComponent,SearchClientPipe],
  imports: [
    CommonModule,
    GestionClientsRoutingModule,
    FormsModule, ReactiveFormsModule ,
    NgxPaginationModule,
    ModalModule.forRoot(),

  ]
})
export class GestionClientsModule { }
