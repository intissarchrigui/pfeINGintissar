import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import Annonce from "../models/annonce";




@Injectable({
    providedIn: 'root',
  })
  export class ImagesAnnonceService {
    images:string [] = [];
    constructor(private http: HttpClient) { }
    pushFileToStorage(images: File[]=[],annonce:Annonce,options): Observable<HttpEvent<{}>> {
      const formdata: FormData = new FormData();
      for (var i = 0; i < images.length; i++) { 
        formdata.append("images[]", images[i]);
        console.log(images)
      }
      options= {
        formdata,
        reportProgress: true,
        responseType: 'text',
      }
    
     options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
     // formdata.append('image', image[]);
      const req = new HttpRequest(
        'POST',
        environment.host + '/annonce/annonceimages'
        ,
        annonce,
       // formdata
       
      );
      return this.http.request(req);
    }
    getFile(path): Observable<any> {
      return this.http.get(environment.host + '/auth/getFile/' + path);
    }
    
  }
  