import { NgModule,ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from 'app/front/main-page/main-page.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MainPageRoutingModule,
    NgbModule,
    NgSelectModule,
    GooglePlaceModule,
    ReactiveFormsModule,
    FormsModule,

    NgMultiSelectDropDownModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBHLnd8AgAQ2x22sAD4CS3yVKCvnb1Zf3c',
      libraries: ['places']
    }) ,
  ],
  declarations: [MainPageComponent],
  bootstrap: [MainPageComponent],

})

export class MainPageModule {
  static forRoot(): ModuleWithProviders<NgMultiSelectDropDownModule> {
    return {
      ngModule: NgMultiSelectDropDownModule
    };
  }
}