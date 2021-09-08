import { RouteInfo } from './sidebar.metadata';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [     
            { path: '/annonces', title: 'Annonces',icon: 'ft-layout',  title1:'annonces', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/disponibility', title: 'Mes disponibilités',icon: 'ft-layout',  title1:'disponibility', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/appointments', title: ' rendez-vous',icon: 'ft-layout',  title1:'appointments', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/chat', title: ' chats',icon: 'ft-layout',  title1:'chats', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/reclamationss', title: ' reclamations',icon: 'ft-layout',  title1:'reclamations', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/dashboard', title: 'Dashboard',  title1:'dashboard',icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/demandes', title: "Professionnels", title1:'demandes',icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/clients', title: "Clients", title1:'clients',icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            /* { path: '/profile/:currentUserId', title: "Profile", title1:'profile',icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }, */
];
