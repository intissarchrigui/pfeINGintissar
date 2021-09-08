import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComingSoonPageComponent } from "./coming-soon/coming-soon-page.component";
import { DetailsAnnonceComponent } from './details-annonce/details-annonce.component';
import { ErrorPageComponent } from "./error/error-page.component";
import { ForgotPasswordPageComponent } from "./forgot-password/forgot-password-page.component";
import { ListAnnoncesComponent } from './list-annonces/list-annonces.component';
import { LockScreenPageComponent } from "./lock-screen/lock-screen-page.component";
import { LoginPageComponent } from "./login/login-page.component";
import { MainPageComponent } from './main-page/main-page.component';
import { MaintenancePageComponent } from "./maintenance/maintenance-page.component";
import { RegisterPageComponent } from "./register/register-page.component";
import { CreationAnnonceComponent } from './creation-annonce/creation-annonce.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import{MapsComponent} from '../back/maps/maps/maps.component'
import { CustomizerrComponent } from './customizerr/customizerr.component';
import { AppointmentClientComponent } from './appointment-client/appointment-client.component';
import { FavorisComponent } from './favoris/favoris.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { ChatComponent } from './chat/chat.component';
import { ProfileClientComponent } from './profile-client/profile-client.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'comingsoon',
        component: ComingSoonPageComponent,
        data: {
          title: 'Coming Soon page'
        }
      },
      {
        path: 'error',
        component: ErrorPageComponent,
        data: {
          title: 'Error Page'
        }
      },
      {
        path: 'forgotpassword',
        component: ForgotPasswordPageComponent,
        data: {
          title: 'Forgot Password Page'
        }
      },   
      
      {
        path: 'lockscreen',
        component: LockScreenPageComponent,
        data: {
          title: 'Lock Screen page'
        }
      },   
      {
        path: 'login',
        component: LoginPageComponent,
        data: {
          title: 'Login Page'
        }
      },
      {
        path: 'maintenance',
        component: MaintenancePageComponent,
        data: {
          title: 'Maintenance Page'
        }
      },
      {
        path: 'register',
        component: RegisterPageComponent,
        data: {
          title: 'Register Page'
        }
      },
      {
        path: 'maps',
        component: MapsComponent,
        data: {
          title: 'Maps Page'
        }
      },
      {
        path: 'home',
        component: MainPageComponent,
        data: {
          title: 'Main Page'
        }
      }  ,
      {
        path: 'creation',
        component: CreationAnnonceComponent,
        data: {
          title: 'creation Page'
        }
      }  ,
      {
        path: 'customizer',
        component: CustomizerrComponent,
        data: {
          title: 'customizer Page'
        }
      }  ,
      {
        path: 'list-annonces',
        component: ListAnnoncesComponent,
        data: {
          title: 'Annonce Page'
        }
      }  
      ,
  /*     {
        path: 'details-annonces/:idAnnonce',
        component: DetailsAnnonceComponent,
        data: {
          title: 'Details Annonce  Page'
        }
      }, */
      {
        path: 'auth/email/reset-password/:token/:email',
        component: ChangePasswordComponent,
        data: {
          title: 'Change Password Page'
        }
      }  ,
      {
        path: 'RdvCLient',
        component: AppointmentClientComponent,
        data: {
          title: 'rdvClient Page'
        }
      }, 
      {
        path: 'favoris',
        component: FavorisComponent,
        data: {
          title: 'favoris Page'
        }
      },
        {
        path: 'reclamations',
        component: ReclamationComponent,
        data: {
          title: 'reclamation Page'
        }
      },
      {
        path: 'details-annonces/:idAnnonce',
        component: ChatComponent,
        data: {
          title: 'chatclt Page'
        }
      }  ,
      
      {
        path: 'profile-client/:currentUserId',
        component: ProfileClientComponent,
        data: {
          title: 'chatclt Page'
        }
      }  ,
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPagesRoutingModule { }
