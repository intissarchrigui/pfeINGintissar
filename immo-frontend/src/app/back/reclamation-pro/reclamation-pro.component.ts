import { Component, OnInit } from '@angular/core';
import Reclamation from 'app/front/_models/reclamation';
import { ReclamationService } from 'app/front/_services/reclamation.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-reclamation-pro',
  templateUrl: './reclamation-pro.component.html',
  styleUrls: ['./reclamation-pro.component.css']
})
export class ReclamationProComponent implements OnInit {
  reclamations:Reclamation[]=[]
  model = {
    pending: false,
    processed: false,
    refused: false
  
  };
  rejectRec:boolean=false;
    traitRec:boolean=false;
  constructor(private reclamationService:ReclamationService) { }

  ngOnInit(): void {
    this.getReclamations()
  }

  getReclamations(){

    this.reclamationService.getAllReclamations().subscribe((res:Reclamation[]) =>{
      console.log("res",res)
       this.reclamations=res;
     })
  }

  getPendingReclamations(){
 
      if(this.model.pending){
      //  this.SpinnerService.show();
        this.reclamationService.getReclamationByStatus('Pending').subscribe((res:Reclamation[]) => {
          this.model.pending=true;
          this.reclamations=res;
          this.model.processed=false;
          this.model.refused=false;
      //  this.SpinnerService.hide();
        })

      }else this.getReclamations();
  
    }

    getRefusedReclamations(){
 
      if(this.model.refused){
      //  this.SpinnerService.show();
        this.reclamationService.getReclamationByStatus('Refused').subscribe((res:Reclamation[]) => {
          this.model.refused=true
          this.reclamations=res;
          this.model.processed=false;
          this.model.pending=false;
      //  this.SpinnerService.hide();
        })

      }else this.getReclamations();
  
    }
    getProcessedReclamations(){
 
      if(this.model.processed){
      //  this.SpinnerService.show();
        this.reclamationService.getReclamationByStatus('Processed').subscribe((res:Reclamation[]) => {
          this.model.processed=true
          this.reclamations=res;
          this.model.pending=false;
          this.model.refused=false;
          
      
        //  this.SpinnerService.hide();
      
      
        })
      }else this.getReclamations();
  
    }
  
  
  traitReclamation(_id){
    let now=new Date()
    this.reclamationService.traitReclamation(_id,{etat:"Processed", confirmedDate: now}).subscribe(res =>{
  /*     Swal.fire(
        "reclamation a été traité avec succés!",
        '',
        'success'
      ); */
      this.traitRec=true;
      console.log(_id)
      this.getReclamations();
  
    })
  }

  rejectReclamation(_id){
    let now=new Date()
    this.reclamationService.rejectReclamation(_id,{etat:"Refused", refusedDate: now}).subscribe(res =>{
    /*   Swal.fire(
        "reclamation a été rejeté avec succés!",
        '',
        'success'
      ); */
      this.rejectRec=true;
      console.log(_id)
      this.getReclamations();
  
    })
  }
}
