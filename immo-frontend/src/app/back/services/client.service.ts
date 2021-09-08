import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


  constructor(private http: HttpClient) { }
  private extractData(res: Response) {
    let body = res;
    return body || {
     };
  }
  getListClients() {
    return this.http.get(environment.host + '/auth/getListClients')
  }
  deleteClient(id) {
    return this.http.delete(environment.host + '/auth/deleteClient/' + id);
  }
  getClient(id) {
    return this.http.get(environment.host + '/auth/getClientById/' + id);
  }
  updateClient(id, updateForm) {
    return this.http.put(environment.host + '/auth/updateClient/' + id, updateForm);
  }
}
