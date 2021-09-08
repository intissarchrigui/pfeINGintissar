import { Role } from "./role";

export default class Client{
    _id:Number;
    email: string;
    password: string;
    confirmPassword:string;
    first_name: string;
    last_name: string;
    phone: string; 
    role:Role;
    date_inscrit_client:Date;
    image:string;
   // fileImage:Number;    
  }
  