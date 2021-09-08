import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import Annonce from './models/annonce';
import { Message } from './models/message';
const AnnonceAPI='http://localhost:3000/annonce/';
@Injectable({
  providedIn: 'root'
})
export class AnnonceService {

  constructor(private http:HttpClient) { }
  addAnnonce(annonce,image:File[]=[],commodite:string[]=[]): Observable<any>{
    const formdata: FormData = new FormData();
       // formData.append('Image', image);
        for (var i = 0; i < commodite.length; i++) { 
          formdata.append("commodite[]", commodite[i]);
         // formdata.append("Annonce",image[i].name)
          console.log(formdata)
        }

        for (var i = 0; i < image.length; i++) { 
          formdata.append("image[]", image[i]);
         // formdata.append("Annonce",image[i].name)
          console.log(formdata)
        }
        formdata.append("Annonce",annonce.titre)
        formdata.append("Annonce",annonce.description)
        formdata.append("Annonce",annonce.etage)
        formdata.append("Annonce",annonce.prix.toString())
        formdata.append("Annonce[]",annonce.usage)
        formdata.append("Annonce[]",annonce.nbre_chambres)
        formdata.append("Annonce[]",annonce.pieces_salleBain)
        formdata.append("Annonce[]",annonce.delegation)
       // formdata.append("Annonce[]",annonce.localite)
       // formdata.append("Annonce[]",annonce.code_postal.toString())
        formdata.append("Annonce[]",annonce.categorie)
        formdata.append("Annonce[]",annonce.superfecie.toString())
        formdata.append("Annonce[]",annonce.type)
        formdata.append("Annonce[]",annonce.region)
        formdata.append("Annonce[]",annonce.longitude)
        formdata.append("Annonce[]",annonce.latitude)
        formdata.append("Annonce[]",annonce.adresse_exacte)
        formdata.append("Annonce[]",annonce.professionnel)
        formdata.append("Annonce[]",annonce.date_pub),
        formdata.append("Annonce[]",annonce.favori)
       // const headers = new HttpHeaders({
        // reportProgress: true,
        // ContentType: formData,
        // responseType: 'text',
        //})
   /*   const options = {
        reportProgress: true,
        responseType: 'text',
      }; */
     // console.log(options)
    return this.http.post(AnnonceAPI+ 'addAnnonce',formdata,{
      reportProgress: true,
      responseType: 'text',
    })
  }

  addImage(id, value) {
    return this.http.put(AnnonceAPI + 'addAnnonce' + id, {image: "/annonce/annonceimages"+value});
  }

  getAnnonces(){
    return this.http.get(AnnonceAPI+ 'allAnnonces')
  } 
  publishannonce(_id,Status){
    return this.http.patch(AnnonceAPI+'publishAnnonce/'+_id, Status)
  }
  refuseannonce(_id,Status){
    return this.http.patch(AnnonceAPI+'refuseAnnonce/'+_id, Status)
  }
  getAnnonce(_id){
    return this.http.get(AnnonceAPI+'getAnnonce/'+_id)
  }

 /*  getAnnonces(pageNumber: number, 
    pageSize: number): Observable<Message> {
let params = new HttpParams();

params = params.append('page', pageNumber.toString());
params = params.append('size', pageSize.toString());


return this.http.get<any>(AnnonceAPI + 'allAnnones', { params: params })

} */

deleteAnnonce(id) {
  return this.http.delete(AnnonceAPI + 'deleteAnnonce/' + id);
}

updateAnnonce(id,annonce,image:File[]=[],commodite:string[]=[]){
  const formdata: FormData = new FormData();
  // formData.append('Image', image);
   for (var i = 0; i < commodite.length; i++) { 
     console.log("cmm",commodite)
     formdata.append("commodite[]", commodite[i]);
    // formdata.append("Annonce",image[i].name)
     console.log(formdata)
   }

   for (var i = 0; i < image.length; i++) { 
     formdata.append("image[]", image[i]);
    // formdata.append("Annonce",image[i].name) buildFormData(formData, data);
     console.log(formdata)
   }
   formdata.append("Annonce",annonce.titre)
   formdata.append("Annonce",annonce.description)
   formdata.append("Annonce",annonce.etage)
   formdata.append("Annonce",annonce.prix.toString())
   formdata.append("Annonce[]",annonce.usage)
   formdata.append("Annonce[]",annonce.nbre_chambres)
   formdata.append("Annonce[]",annonce.pieces_salleBain)
   formdata.append("Annonce[]",annonce.delegation)
  // formdata.append("Annonce[]",annonce.localite)
  // formdata.append("Annonce[]",annonce.code_postal.toString())
   formdata.append("Annonce[]",annonce.categorie)
   formdata.append("Annonce[]",annonce.superfecie.toString())
   formdata.append("Annonce[]",annonce.type)
   formdata.append("Annonce[]",annonce.region)
   formdata.append("Annonce[]",annonce.longitude)
   formdata.append("Annonce[]",annonce.latitude)
   formdata.append("Annonce[]",annonce.adresse_exacte)
   formdata.append("Annonce[]",annonce.professionnel)
   formdata.append("Annonce[]",annonce.date_pub),
   formdata.append("Annonce[]",annonce.favori)
  return this.http.put(AnnonceAPI + 'updateAnnonce/' + id,formdata,{
    reportProgress: true,
    responseType: 'text',
  });
}

filterAnnonce(filterDTO){
  return this.http.post(AnnonceAPI + "getAnnonceByFilter",filterDTO);
}

AjoutFavoris(obj){
  return this.http.post(AnnonceAPI+'addFavoris',obj)
}
deleteFavoris(_id){
  return this.http.delete(AnnonceAPI+'deleteFavoris/' + _id)
}
AnnonceFavoris(id){
  return this.http.get(AnnonceAPI+'favoriannn/'+id)
}
getVille(){
  return this.http.get('http://localhost:3000/annonce/getville')
}
getDelegation(id){
  return this.http.get('http://localhost:3000/annonce/delegation/'+id)
}
getLocalite(id){
  return this.http.get('http://localhost:3000/annonce/localite/'+id)
}
}
