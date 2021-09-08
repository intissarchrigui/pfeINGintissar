
import { Role } from "./role";

export default class Profesionnel{
    _id: string;
    email: string;
    password: string;
    confirmPassword:string;
    first_name: string;
    last_name: string;
    phone: string; 
    nom_agence: string;
   // type_abonnement: string;
      role:Role;
    date_inscrit_pro:Date;
    //emailVerified:Boolean;
   // type_payement:string;
    matricule_fiscale:string;
    etat:string;
    Open:boolean=false;
    image:string;
    
   // image:string;
  }
  
  