import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import Reclamation from '../_models/reclamation';
import { ReclamationService } from '../_services/reclamation.service';
//import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss']
})
export class ReclamationComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  @ViewChild('modalUpdate') modalUpdate: TemplateRef<any>;
  userann;
  pa;
  currentRecalamation:Reclamation;
  reclamations:Reclamation[]=[];
  title;
  description;
/*   title2;
  description2; */
  //modalRef: BsModalRef;
  showModal:boolean = false;
  addForm:FormGroup;
  updateForm:FormGroup;
  constructor( private reclamationService:ReclamationService,
   // private modalService: BsModalService,
    private _formBuilder: FormBuilder,
    private modal: NgbModal,
    private toastr: ToastrService) { }
/*   openModal(template: TemplateRef<any>,
    ) {
    this.showModal=true;
    this.modalRef = this.modalService.show(template);
  
 }  */

  ngOnInit(): void {
    this.addForm = this._formBuilder.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.updateForm = this._formBuilder.group({
      title2: ['', Validators.required],
      description2: ['', Validators.required],
    });
    this.userann = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.userann._id)
 this.getReclamations()
   
  }
 
  getReclamations(){
    this.userann = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.userann._id)
    this.reclamationService.getAllReclamations().subscribe((res:Reclamation[]) =>{
      console.log("rec",res)
       this.reclamations=res.filter((rec)=>rec.client._id== this.userann._id);;
     })
  }

  createReclamation(){
    
let data={
  title:this.title,
  description:this.description,
client:this.userann._id
  }
     
    this.reclamationService.createReclamation(data).subscribe(res =>{
console.log(res)
this.toastr.success('Votre reclamation a été ajouté avec succés !' ,'', {
  timeOut: 10000,
  positionClass: 'toast-bottom-right',
});
this.getReclamations()
    })
  }
  getReclamationById(_id){
    this.reclamationService.getReclamationById(_id).subscribe((res :Reclamation)=>{
      console.log(res)
      this.currentRecalamation=res
    this.updateForm.patchValue({
    _id:this.currentRecalamation ._id,
      title2:this.currentRecalamation.title,
      description2:this.currentRecalamation.description
 
 });
          })
  }
  
  updateReclamation(){
    //this.title=this.currentRecalamation.title,
   // this.description=this.currentRecalamation.description
    let data={
    //_id:this.currentRecalamation._id,
    title:this.updateForm.value.title2,
    description:this.updateForm.value.description2
      }
         console.log(this.currentRecalamation._id)
        this.reclamationService.updateReclamation(this.currentRecalamation._id,data).subscribe(res =>{
    console.log(res)
  
    this.toastr.success('Votre reclamation a été modifié avec succés !' ,'', {
      positionClass: 'toast-bottom-right',
    });
    this.getReclamations()
        })
     
      }

      deleteReclamation(_id){

        Swal.fire({
          title: 'êtes-vous sûr?',
          text: 'Vous ne pourrez plus récuperer cela!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Oui, supprimez-le!',
          cancelButtonText: 'Annuler',
        }).then((result) => {
          if (result.value) {
            this.reclamationService.deleteReclamation(_id).subscribe(res =>{
        console.log(res)
        this.getReclamations()
            })
            Swal.fire(
              'Supprimé',
              'Votre reclamation a été supprimé avec succés',
              'success'
            ); 
          }
          })
     
          }

       

          open()
          {  this.modal.open(this.modalContent, { size: 'l' });
         
          }

          openUpdate(){
            this.modal.open(this.modalUpdate, { size: 'l' });
          }

}
