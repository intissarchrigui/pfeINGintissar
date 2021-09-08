import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { GestionAnnoncesRoutingModule } from './gestion-annonces-routing.module';
import { GestionAnnoncesComponent } from './gestion-annonces.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomFormsModule } from 'ngx-custom-validators';
import { MatchHeightModule } from "../../shared/directives/match-height.directive";
import { ArchwizardModule } from 'angular-archwizard';
import { SearchAnnoncePipe } from '../pipes/search-annonce.pipe';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AgmCoreModule } from '@agm/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MatFileUploadModule } from 'angular-material-fileupload';
import {MatRadioModule} from '@angular/material/radio';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatStepperModule} from '@angular/material/stepper';

@NgModule({
  declarations: [GestionAnnoncesComponent,SearchAnnoncePipe],
  imports: [
    CommonModule,
    GestionAnnoncesRoutingModule,
    ModalModule.forRoot(),
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
    CustomFormsModule,
    MatchHeightModule,
    ArchwizardModule,
    NgxPaginationModule,
    AutocompleteLibModule,
    GooglePlaceModule,
    MatStepperModule,
    MatCheckboxModule,
    FlexLayoutModule,
    MatCardModule,
    MatGoogleMapsAutocompleteModule,
    MatRadioModule,
    MatFileUploadModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatIconModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBHLnd8AgAQ2x22sAD4CS3yVKCvnb1Zf3c',
      libraries: ['places']
    }) 
  ],
  entryComponents:[GestionAnnoncesComponent],
  providers: [  { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },],

})
export class GestionAnnoncesModule { }
