import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('../../back/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  
  {
    path: 'create',
    loadChildren: () => import('../../front/creation-annonce/creation-annonce.module').then(m => m.CreationAnnonceModule)
  },
 /*  {
    path: 'maps',
    loadChildren: () => import('../../back/maps/maps/maps.module').then(m => m.MapsModule)
  }, */
  {
    path: 'demandes',
    loadChildren: () => import('../../back/gestion-demandes/gestion-demandes.module').then(m => m.GestionDemandesModule)
  },
  {
    path: 'appointments',
    loadChildren: () => import('../../back/appointment/appointment.module').then(m => m.AppointmentModule)
  },
  {
    path: 'reclamationss',
    loadChildren: () => import('../../back/reclamation-pro/reclamation-pro.module').then(m => m.ReclamationProModule)
  },
  {
    path: 'clients',
    loadChildren: () => import('../../back/gestion-clients/gestion-clients.module').then(m => m.GestionClientsModule)
  },
  {
    path: 'chats',
    loadChildren: () => import('../../back/chat/chat.module').then(m => m.ChatModule)
  },
  {
    path: 'disponibility',
    loadChildren: () => import('../../back/disponibilities/disponibilities.module').then(m => m.DisponibilitiesModule)
  },
  {
    path: 'annonces',
    loadChildren: () => import('../../back/gestion-annonces/gestion-annonces.module').then(m => m.GestionAnnoncesModule)
  },
  {
    path: 'annonces-details/:annonceId',
    loadChildren: () => import('../../back/annonces-details/annonces-details.module').then(m => m.AnnoncesDetailsModule)
  },
  
  {
    path: 'profile/:currentUserId',
    loadChildren: () => import('../../back/gestion-profile/gestion-profile.module').then(m => m.GestionProfileModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('../calendar/calendar.module').then(m => m.CalendarsModule)
  },
  {
    path: 'charts',
    loadChildren: () => import('../charts/charts.module').then(m => m.ChartsNg2Module)
  },
   {
    path: 'forms',
    loadChildren: () => import('../forms/forms.module').then(m => m.FormModule)
  },
/*   {
    path: 'maps',
    loadChildren: () => import('../maps/maps.module').then(m => m.MapsModule)
  }, */
  {
    path: 'tables',
    loadChildren: () => import('../tables/tables.module').then(m => m.TablesModule)
  },
  {
    path: 'datatables',
    loadChildren: () => import('../data-tables/data-tables.module').then(m => m.DataTablesModule)
  },
  {
    path: 'uikit',
    loadChildren: () => import('../ui-kit/ui-kit.module').then(m => m.UIKitModule)
  },
  {
    path: 'components',
    loadChildren: () => import('../components/ui-components.module').then(m => m.UIComponentsModule)
  },
/*   {
    path: 'pages',
    loadChildren: () => import('../../front/full-pages/full-pages.module').then(m => m.FullPagesModule)
  }, */
  {
    path: 'cards',
    loadChildren: () => import('../cards/cards.module').then(m => m.CardsModule)
  },
  {
    path: 'colorpalettes',
    loadChildren: () => import('../color-palette/color-palette.module').then(m => m.ColorPaletteModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('../chat/chat.module').then(m => m.ChatModule)
  },
  {
    path: 'chat-ngrx',
    loadChildren: () => import('../chat-ngrx/chat-ngrx.module').then(m => m.ChatNGRXModule)
  },
  {
    path: 'inbox',
    loadChildren: () => import('../inbox/inbox.module').then(m => m.InboxModule)
  },
  {
    path: 'taskboard',
    loadChildren: () => import('../taskboard/taskboard.module').then(m => m.TaskboardModule)
  },
  {
    path: 'taskboard-ngrx',
    loadChildren: () => import('../taskboard-ngrx/taskboard-ngrx.module').then(m => m.TaskboardNGRXModule)
  },
  {
    path: 'player',
    loadChildren: () => import('../player/player.module').then(m => m.PlayerModule)
  }

];