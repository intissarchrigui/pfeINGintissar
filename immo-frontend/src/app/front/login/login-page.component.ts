import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../_services/auth.service';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {
    loginForm:FormGroup;
    submitted = false;
    user;
    token;
    //@ViewChild('f') loginForm: NgForm;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
       private authService: AuthService,
       private toastr: ToastrService) {
   
         }
        ngOnInit(): void {
            this.loginForm = this.formBuilder.group({
              email: [''],
              password: [''],
            });
          }
          get f() {
            return this.loginForm.controls;
          }
    // On submit button click
    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
        } 
        // display form values on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));
        //this.router.navigate(['/']);
        console.log(this.loginForm.value);
   //     this.loginForm.reset();
    }
    login() {
      /*   this.submitted = true;
        if (this.loginForm.invalid) {
          return;
        } */
        this.authService.login(this.loginForm.value).subscribe((res: any) => {
          console.log("ress",res.user);
          //console.log(JSON.parse(res))   
         // console.log(res.status);
     if (res.user.role == "Profesional" && res.user.etat=='Pending'){
           
            Swal.fire({
              icon: 'error',
              title: 'oops...',
              text: 'votre compte n`est pas encore activé  !',
            });
            this.router.navigate(['/login']);
          }
    else if ((res.user.role=="Profesional" && res.user.etat=='Accepted')||(res.user.role=="Admin")){
            console.log( res.user.etat)
           // Swal.fire('Bienvenue dans votre espace ', '', 'success');
            this.router.navigate(['/dashboard']);
            this.user = res.user;
            this.token = res.token;
            console.log(this.token);
            // console.log(this.role);
            this.authService.saveToken(this.token, this.user);
            sessionStorage.setItem('UserConnect', this.user.first_name);
            console.log(this.user);
          }   
            else if (res.user.role == "Client"){

                   this.toastr.success('Bienvenue dans votre espace client !');
         
            //Swal.fire('Bienvenue dans votre espace Client ', '', 'success');
              this.router.navigate(['/list-annonces']);
              this.user = res.user;
              this.token = res.token;
              console.log(this.token);
              // console.log(this.role);
              this.authService.saveToken(this.token, this.user);
              sessionStorage.setItem('UserConnect', this.user.first_name);
              console.log(this.user);
            }
        } 
          ,err =>{ 
            if (err){
            this.router.navigate(['/login']);
          
              Swal.fire({
                icon: 'error',
                title: 'oops...',
                text: 'nom utilisateur ou mot de passe incorrecte !',
              });
            
        }

        
          
        });
      }
    
    // On Forgot password link click
    onForgotPassword() {
        this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
    }
    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }
}
