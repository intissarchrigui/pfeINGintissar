import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/front/_services/auth.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-gestion-profile',
  templateUrl: './gestion-profile.component.html',
  styleUrls: ['./gestion-profile.component.scss']
})
export class GestionProfileComponent implements OnInit {
  url="http://localhost:3000/auth/getFile/"
  currentPage: string = "About";
  alertModif:boolean=false;
  currentUserId;
  currentUser;
  updateForm:FormGroup;
  constructor(
    private authService:AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUserId = this.route.snapshot.paramMap.get('currentUserId');
    this.getUserById(this.currentUserId);
    // this.userr=JSON.parse(sessionStorage.getItem('user'));
   // console.log(this.user) 
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
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }


  showPage(page: string) {
    this.currentPage = page;
}

getUserById(currentUserId) {
  this.authService.getUserById(currentUserId).subscribe((res: any) => {
  this.currentUser = res;
    this.updateForm.setValue({
      first_name: this.currentUser.first_name,
      last_name: this.currentUser.last_name,
      email: this.currentUser.email,
      phone: this.currentUser.phone,
      nom_agence:this.currentUser.nom_agence,
      matricule_fiscale: this.currentUser.matricule_fiscale,
      password:this.currentUser.password
    });
  });
 // return this.user
}

updateUser() {
  this.authService
    .updateUser(this.currentUser._id, this.updateForm.value)
    .subscribe(
      (response) => {
        console.log(response);
        Swal.fire('Votre compte a été modifié avec succés', '', 'success');
        //this.getProById();
       this.alertModif=true
        this.currentPage  = "About"
        this.getUserById(this.currentUser._id);
        this.ngOnInit();
        this.currentUser=response
    
      },
      (error) => {
        console.log(error);
      }
    );
}

deleteUser() {
  Swal.fire({
    title: 'êtes-vous sûr?',
    text: 'Vous ne pourrez plus récuperer cela!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, désactive-le!',
    cancelButtonText: 'Annuler',
  }).then((result) => {
    if (result.value) {
      this.authService.deleteUser(this.currentUser._id).subscribe((res: any) => {
      //  this.clients= res;
        this.ngOnInit();
      });
      Swal.fire(
        'Désactivé',
        'Votre compte a été désactivé avec succés',
        'success'
      );
    }
  });
}

}
