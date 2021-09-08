import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReclamationProComponent } from './reclamation-pro.component';
import { ReclamationProRoutingModule } from './reclamation-pro-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [ReclamationProComponent],
  imports: [
    CommonModule,
    ReclamationProRoutingModule,
    NgbModule,
    FormsModule
  ]
})
export class ReclamationProModule { }
