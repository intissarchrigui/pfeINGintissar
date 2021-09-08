import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AbonnementsService {


  constructor(private http: HttpClient) { }
  private extractData(res: Response) {
    let body = res;
    return body || {
     };
  }
  getListAbonnements() {
    return this.http.get(environment.host + '/auth/getListProfesionals')
  }
  deleteAbonnement(id) {
    return this.http.delete(environment.host + '/auth/deleteProfesional/' + id);
  }
  accepterAbonnement(_id,etat) {
    return this.http.patch(environment.host + '/auth/acceptAbonment/'+_id, etat);
  }
  refuseAbonnement(_id,etat) {
    return this.http.patch(environment.host + '/auth/refuseAbonnement/'+_id, etat);
  }
  getProfesional(id) {
    return this.http.get(environment.host + '/auth/getProfesional/' + id);
  }
  updateProfesional(id, updateForm) {
    return this.http.put(environment.host + '/auth/updateProfesional/' + id, updateForm);
  }
}
