import { Component, OnInit, TemplateRef } from '@angular/core';
import Client from 'app/front/_models/client';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'app/front/_services/auth.service';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-gestion-clients',
  templateUrl: './gestion-clients.component.html',
  styleUrls: ['./gestion-clients.component.css']
})
export class GestionClientsComponent implements OnInit {
  clients:Client[];
  currentPro:Client;
  clientValue;
  pg;
  filesToUpload: Array<File>;
  modalRef: BsModalRef;
  updateForm:FormGroup;
  addForm:FormGroup;
  photo;
  imageSrc: string = "../../../assets/img/ct.png";
   constructor(
     private clientService:ClientService, 
       private formBuilder: FormBuilder,
     private modalService: BsModalService,
     private authService: AuthService) { }
   openModal(template: TemplateRef<any>) {
     this.modalRef = this.modalService.show(template);
   }

  ngOnInit(): void {
    this.getListClients()
    this.addForm = this.formBuilder.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[0-9]\d*$/),
          Validators.minLength(8),
        ],
      ],

      password: [null, [Validators.required, Validators.minLength(6)]],
      // Adresse:[this.currentMember.Adresse,Validators.required],
    });
    this.updateForm = this.formBuilder.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[0-9]\d*$/),
          Validators.minLength(8),
        ],
      ],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  readURL(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.imageSrc = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
      this.filesToUpload = event.target.files;
      this.photo = event.target.files[0].image;
    }
  }


  // this.SpinnerService.show();
  getListClients() {
  this.clientService.getListClients().subscribe((res: Client[]) => {
    console.log("res",res)
    this.clients = res.filter((client)=>client.role==='Client');
    console.log(this.clients)
   // this.SpinnerService.hide();
  });
}


get addFormControls() {
  return this.addForm.controls;
} 
get updateFormControls() {
  return this.updateForm.controls;
}

addClientt() {
  //this.submitted = true;
  // stop here if form is invalid
/*   if (this.addForm.invalid) {
    return;
  } */

  let data = {}
  if (this.filesToUpload === undefined) {
    data = {
      first_name: this.addForm.value.first_name,
      last_name: this.addForm.value.last_name,
       role: 'Client',
      email: this.addForm.value.email,
      phone: this.addForm.value.phone,
      password: this.addForm.value.password,
      confirmPassword: this.addForm.value.password,
      date_inscrit_client:new Date(),
      image: "anynoyme.png",
    };
  } else {
    data = {
      first_name: this.addForm.value.first_name,
      last_name: this.addForm.value.last_name,
      role: 'Client',
      email: this.addForm.value.email,
      phone: this.addForm.value.phone,
      password: this.addForm.value.password,
      confirmPassword: this.addForm.value.password,
      date_inscrit_client:new Date(),
      image: this.filesToUpload[0].name,
    };
  }

  this.authService.registerClient(data)
  .subscribe((res:any) =>{
 alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
console.log(res)
Swal.fire('Ce client a été ajouté avec succés!', '', 'success');
this.getListClients();
this.modalRef.hide();
},err=>{

if (err){


 Swal.fire({
   icon: 'error',
   title: 'oops...',
   text:  'Cet Email existe déja !',
 });


}})
}

getClientById(id) {
  this.clientService.getClient(id).subscribe((res: Client) => {
    this.currentPro = res;
    this.updateForm.setValue({
      first_name: this.currentPro.first_name,
      last_name: this.currentPro.last_name,
      email: this.currentPro.email,
      phone: this.currentPro.phone,
      password:this.currentPro.password
    });
  });
}

updateClientt() {
  this.clientService
    .updateClient(this.currentPro._id, this.updateForm.value)
    .subscribe(
      (response) => {
        console.log(response);
        Swal.fire('Ce client a été modifié avec succés', '', 'success');
        //this.getProById();
        this.getListClients();
        this.modalRef.hide();
      },
      (error) => {
        console.log(error);
      }
    );
}

deleteClient(_id) {
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
      this.clientService.deleteClient(_id).subscribe((res: any) => {
        this.clients= res;
        this.ngOnInit();
      });
      Swal.fire(
        'Supprimé',
        'Ce client a été supprimée avec succés',
        'success'
      );
    }
  });
}


}
