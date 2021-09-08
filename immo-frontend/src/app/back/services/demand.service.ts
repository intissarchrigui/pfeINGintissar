import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DemandService {

  constructor(private http: HttpClient) { }
  private extractData(res: Response) {
    let body = res;
    return body || {
     };
  }
  getListDemand() : Observable<any>{
    return this.http.get(environment.host + '/').pipe(
      map(this.extractData));
  }
  deleteDemand(id) {
    return this.http.get(environment.host + '/profesional/delete/' + id);
  }
  acceptDemand(demand) {
    return this.http.post(environment.host + '/profesional/acceptDemand', demand);
  }
}
