import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import Annonce from "app/back/models/annonce";
import { environment } from "environments/environment";
import { Observable } from "rxjs";




@Injectable({
    providedIn: 'root',
  })
  export class ImageService {
    constructor(private http: HttpClient) { }
    pushFileToStorage(image: File,_id): Observable<HttpEvent<{}>> {
      const formdata: FormData = new FormData();
      formdata.append('image', image);
      const req = new HttpRequest(
        'POST',
        environment.host + '/auth/upload/'+_id,
        formdata,
  
        {
          reportProgress: true,
          responseType: 'text',
        }
      );
      return this.http.request(req);
    }
    getFile(path): Observable<any> {
      return this.http.get(environment.host + '/auth/getfile/' + path);
    }
  }
  