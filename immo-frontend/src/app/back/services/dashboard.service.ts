import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }
  private extractData(res: Response) {
    let body = res;
    return body || {
     };
  }


  
  StatisticsReclamationsWithDate() {
    console.log("lenna")
    return this.http.get('http://localhost:3000/reclamation/StatisticsReclamationsWithDate' );
  }
  StatisticsAppointmentWithDate () {
    return this.http.get('http://localhost:3000/rendez-vous/StatisticsAppointmentWithDate' );
  }

}

