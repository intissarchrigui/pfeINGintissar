import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnoncesDetailsRoutingModule } from './annonces-details-routing.module';
import { AnnoncesDetailsComponent } from './annonces-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [AnnoncesDetailsComponent],
  imports: [
    CommonModule,
    AnnoncesDetailsRoutingModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBHLnd8AgAQ2x22sAD4CS3yVKCvnb1Zf3c',
      libraries: ['places']
    }) 
  ]
})
export class AnnoncesDetailsModule { }
