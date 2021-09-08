import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DisponibilityService {


  constructor(private http: HttpClient) { }
  private extractData(res: Response) {
    let body = res;
    return body || {
     };
  }
  getDisponibilities() {
    return this.http.get(environment.host + '/disponibility/getDisponibilities')
  }

  getDisponibilitiesByAgency(_id) {
    return this.http.get(environment.host + '/disponibility/getDisponibilities/'+_id)
  }
  getDisponibilityById(_id){
    return this.http.get(environment.host +'/disponibility/getDispoById/'+_id)
  }
  deleteDisponibility(id) {
    return this.http.delete(environment.host + '/disponibility/deleteDispo/' + id);
  }
  addDisponibility(disponibility) {
    return this.http.post(environment.host + '/disponibility/addDisponibility',disponibility);
  }
  updateDisponibility(_id,disponibility) {
    return this.http.put(environment.host + '/disponibility/updateDispo/'+_id, disponibility);
  }
}
