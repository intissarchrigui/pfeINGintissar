import Profesionnel from "app/front/_models/Profesionnel";
import Addresse from "./addresse";

export default class Annonce{
  _id: string;
  titre:string;
  description:string;
  images:string[];
  fileimages:string[];
  Status:string;
  etage:string;
  usage:string;
  prix:number;
  proprietaire:string;
  nbre_chambres:string;
  pieces_salleBain:string;
  addresse:Addresse;
  date_pub:string;
 /*  ville:string;
  rue:string;
  codePostal:Number; */
  type:string;
  commodites:Boolean[];
  categorie:string;
  superfecie:number;
  professionnel:Profesionnel;
  Open:boolean=false
  favori:boolean
}
