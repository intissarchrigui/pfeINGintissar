import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreationAnnonceRoutingModule } from './creation-annonce-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { ArchwizardModule } from 'angular-archwizard';
import {MatNativeDateModule} from '@angular/material/core';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MatFileUploadModule } from 'angular-material-fileupload';
import {MatRadioModule} from '@angular/material/radio';

import { ModalModule } from 'ngx-bootstrap/modal';

import { NgxPaginationModule } from 'ngx-pagination';
import { AgmCoreModule } from '@agm/core';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CreationAnnonceRoutingModule,
    FormsModule,ReactiveFormsModule,
    MatStepperModule,
    NgbModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatSelectModule,
    ArchwizardModule,
    MatNativeDateModule,
    NgxPaginationModule,
    AgmCoreModule,
    MatCardModule,
    FlexLayoutModule,
    MatRadioModule,
    MatFileUploadModule,
    MatCheckboxModule,
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBHLnd8AgAQ2x22sAD4CS3yVKCvnb1Zf3c',
      libraries: ['places']
    }) ,
    MatGoogleMapsAutocompleteModule
  ],
  
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
      ]
})
export class CreationAnnonceModule { }
