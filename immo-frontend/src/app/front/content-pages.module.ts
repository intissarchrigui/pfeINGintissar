import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import { ContentPagesRoutingModule } from "./content-pages-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComingSoonPageComponent } from "./coming-soon/coming-soon-page.component";
import { ErrorPageComponent } from "./error/error-page.component";
import { ForgotPasswordPageComponent } from "./forgot-password/forgot-password-page.component";
import { LockScreenPageComponent } from "./lock-screen/lock-screen-page.component";
import { LoginPageComponent } from "./login/login-page.component";
import { MaintenancePageComponent } from "./maintenance/maintenance-page.component";
import { RegisterPageComponent } from "./register/register-page.component";
import { MainPageComponent } from './main-page/main-page.component';
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
import { ListAnnoncesComponent } from './list-annonces/list-annonces.component';
import { DetailsAnnonceComponent } from './details-annonce/details-annonce.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CreationAnnonceComponent } from './creation-annonce/creation-annonce.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AgmCoreModule } from '@agm/core';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MapsComponent} from '../back/maps/maps/maps.component';
import { NgbModalModule, NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DateTimePickerComponent } from '../front/details-annonce/date-time-pikk.component';
import { CustomizerrComponent } from './customizerr/customizerr.component';
import { AppointmentClientComponent } from './appointment-client/appointment-client.component';
import { FavorisComponent } from './favoris/favoris.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { ChatComponent } from './chat/chat.component';
import { ProfileClientComponent } from './profile-client/profile-client.component';
@NgModule({
    imports: [

        CommonModule,
        ContentPagesRoutingModule,
        FormsModule,
        NgbModalModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatStepperModule  ,
        MatIconModule,
        MatInputModule,
        MatDividerModule,
        MatButtonModule,
        MatSelectModule,
        ArchwizardModule,
        NgbModule,
        MatNativeDateModule,
        MatFileUploadModule,
        MatRadioModule,
        MatCardModule,
        MatCheckboxModule,
        ModalModule.forRoot(),
       // SocketIoModule.forRoot(config),
        NgxPaginationModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBHLnd8AgAQ2x22sAD4CS3yVKCvnb1Zf3c',
            libraries: ['places']
          }) ,
          MatGoogleMapsAutocompleteModule,
          NgbModalModule, NgbDatepickerModule, NgbTimepickerModule,
          CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
          }),
          
    ],
    declarations: [
        ComingSoonPageComponent,
        DateTimePickerComponent,
        ErrorPageComponent,
        ForgotPasswordPageComponent,
        LockScreenPageComponent,
        LoginPageComponent,
        MaintenancePageComponent,
        RegisterPageComponent,
        MainPageComponent,
        ListAnnoncesComponent,
        DetailsAnnonceComponent,
        FooterComponent,
        HeaderComponent,
        CreationAnnonceComponent,
        ChangePasswordComponent,
        MapsComponent,
        CustomizerrComponent,
        AppointmentClientComponent,
        FavorisComponent,
        ReclamationComponent,
        ChatComponent,
        ProfileClientComponent
    ],
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
      ]
})
export class ContentPagesModule { }

