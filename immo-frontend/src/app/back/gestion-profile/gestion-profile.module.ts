import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionProfileRoutingModule } from './gestion-profile-routing.module';
import { GestionProfileComponent } from './gestion-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [GestionProfileComponent],
  imports: [
    CommonModule,
    GestionProfileRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class GestionProfileModule { }
