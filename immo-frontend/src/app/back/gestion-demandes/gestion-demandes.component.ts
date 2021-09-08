import { Component, OnInit,TemplateRef } from '@angular/core';
import Profesionnel from 'app/front/_models/Profesionnel';
import Swal from 'sweetalert2';
import { AbonnementsService } from '../services/abonnements.service';
import { DemandService } from '../services/demand.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'app/front/_services/auth.service';
@Component({
  selector: 'app-gestion-demandes',
  templateUrl: './gestion-demandes.component.html',
  styleUrls: ['./gestion-demandes.component.css']
})
export class GestionDemandesComponent implements OnInit {
 abonnements:Profesionnel[];
 currentPro:Profesionnel;
 proValue;
 pg;
 filesToUpload: Array<File>;
 modalRef: BsModalRef;
 updateForm:FormGroup;
 addForm:FormGroup;
 photo;
 imageSrc: string = "../../../assets/img/ct.png";
  constructor(
    private abonnementService:AbonnementsService, 
      private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private authService: AuthService) { }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit(): void {
    this.getListAbonnements()
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
      
      nom_agence: [null, Validators.required],
      matricule_fiscale: [null, Validators.required],
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

      nom_agence: [null, Validators.required],
      matricule_fiscale: [null, Validators.required],
      // Adresse:[this.currentMember.Adresse,Validators.required],
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
     // this.fileExtName =this.image.split('.').slice(-1).join('.');
     // console.log("fileExtName",this.fileExtName)
    }
   // this.fileExtName =this.image.split('.').slice(-1).join('.');
    //console.log("fileExtName",this.fileExtName);
  }


  // this.SpinnerService.show();
  getListAbonnements() {
  this.abonnementService.getListAbonnements().subscribe((res: Profesionnel[]) => {
    console.log("res",res)
    this.abonnements = res.filter((abonement)=>abonement.role==='Profesional');
    console.log(this.abonnements)
   // this.SpinnerService.hide();
  });
}
accepterAbonnement(_id){
  this.abonnementService.accepterAbonnement(_id,{etat:'Pending'}).subscribe(res =>{
    Swal.fire(
      "Demande d'abonnement a été acceptée avec succés!",
      '',
      'success'
    );
    console.log(_id)
    this.getListAbonnements();

  })
}

get addFormControls() {
  return this.addForm.controls;
} 
get updateFormControls() {
  return this.updateForm.controls;
}

addProfesional() {
  //this.submitted = true;
  // stop here if form is invalid
  if (this.addForm.invalid) {
    return;
  }

  let data = {}
  if (this.filesToUpload === undefined) {
    data = {
      first_name: this.addForm.value.first_name,
      last_name: this.addForm.value.last_name,
       role: this.addForm.value.role,
      email: this.addForm.value.email,
      phone: this.addForm.value.phone,
      nom_agence: this.addForm.value.nom_agence,
      date_inscrit_pro: this.addForm.value.date_inscrit_pro,
      etat: this.addForm.value.etat,
      matricule_fiscale: this.addForm.value.matricule_fiscale,
      password: this.addForm.value.password,
      confirmPassword: this.addForm.value.password,
      image: "anynoyme.png",
    };
  } else {
    data = {
      first_name: this.addForm.value.first_name,
      last_name: this.addForm.value.last_name,
       role: this.addForm.value.role,
      email: this.addForm.value.email,
      phone: this.addForm.value.phone,
      nom_agence: this.addForm.value.nom_agence,
      date_inscrit_pro: this.addForm.value.date_inscrit_pro,
      etat: this.addForm.value.etat,
      matricule_fiscale: this.addForm.value.matricule_fiscale,
      password: this.addForm.value.password,
      confirmPassword: this.addForm.value.password,
      image: this.filesToUpload[0].name,
    };
  }

  this.authService.registerProfesionnel(data)
  .subscribe((res:any) =>{
 


alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
console.log(res)
Swal.fire('Ce professionnel a été ajouté avec succés!', '', 'success');
this.getListAbonnements();
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

getProById(id) {
  this.abonnementService.getProfesional(id).subscribe((res: Profesionnel) => {
    this.currentPro = res;
    this.updateForm.setValue({
      first_name: this.currentPro.first_name,
      last_name: this.currentPro.last_name,
      email: this.currentPro.email,
      phone: this.currentPro.phone,
      nom_agence:this.currentPro.nom_agence,
      matricule_fiscale: this.currentPro.matricule_fiscale,
    });
  });
}

updateProfesional() {
  this.abonnementService
    .updateProfesional(this.currentPro._id, this.updateForm.value)
    .subscribe(
      (response) => {
        console.log(response);
        Swal.fire('Ce professionnel a été modifié avec succés', '', 'success');
        //this.getProById();
        this.getListAbonnements();
        this.modalRef.hide();
      },
      (error) => {
        console.log(error);
      }
    );
}
refuseAbonnement(_id){
  this.abonnementService.refuseAbonnement(_id,{etat:'Pending'}).subscribe(res =>{
    console.log(_id)
    this.getListAbonnements();

  })
}
deleteAbonnement(_id) {
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
      this.abonnementService.deleteAbonnement(_id).subscribe((res: any) => {
        this.abonnements = res;
        this.ngOnInit();
      });
      Swal.fire(
        'Supprimé',
        'Cette demande a été supprimée avec succés',
        'success'
      );
    }
  });
}


}
