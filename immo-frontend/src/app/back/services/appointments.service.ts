
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {


  constructor(private http: HttpClient) { }
  private extractData(res: Response) {
    let body = res;
    return body || {
     };
  }
  CreateAppointment(_id,_id2,ann,commentaire,color){
    return this.http.patch('http://localhost:3000/rendez-vous/createAppointment/'+_id+'/'+_id2+'/'+ann+'/'+commentaire, color)
  }

  getAllRDV() {
    console.log("lenna")
    return this.http.get('http://localhost:3000/rendez-vous/getRDV');
  }
  
  getAppointmentsDate(from,to) {
    console.log("lenna")
    return this.http.get('http://localhost:3000/rendez-vous/getRDV/'+from+'/'+to );
  }

  getRDV(etat) {
    console.log("lenna")
    return this.http.get('http://localhost:3000/rendez-vous/getRDV/'+etat);
  }
  
  getAppointmentsWithDate(etat,from,to) {
    console.log("lenna")
    return this.http.get('http://localhost:3000/rendez-vous/getRDV/'+etat+'/'+from+'/'+to );
  }

  getRDvclient(_id) {
    console.log("lenna")
    return this.http.get('http://localhost:3000/rendez-vous/getRDVclient/'+_id);
  }

  acceptAppoint(_id, status) {
    console.log("lenna")
    return this.http.patch('http://localhost:3000/rendez-vous/acceptRDV/'+_id,status);
  }
  rejectAppoint(_id, status){
    return this.http.patch('http://localhost:3000/rendez-vous/rejectRDV/'+_id,status);
  }

 updateAppoint(_id,appoint) {
      return this.http.put('http://localhost:3000/rendez-vous/updateRDV/' + _id, appoint );
    }

  getAppoint(_id){
      return this.http.get('http://localhost:3000/rendez-vous/getAppoint/'+_id)
    }
}



