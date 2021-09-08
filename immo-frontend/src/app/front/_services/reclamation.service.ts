
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {


  constructor(private http: HttpClient) { }
  private extractData(res: Response) {
    let body = res;
    return body || {
     };
  }
  createReclamation(reclamation){
    return this.http.post('http://localhost:3000/reclamation/addReclamation', reclamation)
  }

  getAllReclamations() {
    console.log("lenna")
    return this.http.get('http://localhost:3000/reclamation/getReclamations');
  }



  getReclamationById(_id) {
    console.log("lenna")
    return this.http.get('http://localhost:3000/reclamation/getReclamation/'+_id);
  }



 updateReclamation(_id,reclamation) {
      return this.http.put('http://localhost:3000/reclamation/updateReclamation/' +_id, reclamation );
    }

    deleteReclamation(_id){
      return this.http.delete('http://localhost:3000/reclamation/deleteReclamation/'+_id)
    }
    traitReclamation(_id, status) {
      console.log("lenna")
      return this.http.patch('http://localhost:3000/reclamation/traitReclamation/'+_id,status);
    }
  

    rejectReclamation(_id, status) {
      console.log("lenna")
      return this.http.patch('http://localhost:3000/reclamation/rejectReclamation/'+_id,status);
    }
    getReclamationByStatus(etat) {
      console.log("lenna")
      return this.http.get('http://localhost:3000/reclamation/getReclamationByStatus/'+etat);
    }
    
}



