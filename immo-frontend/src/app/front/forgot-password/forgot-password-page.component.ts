import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AlertService } from 'ngx-alerts';
import { AuthService } from '../_services/auth.service';
import Swal from 'sweetalert2';
//import { ProgressBarService } from '../_services/progress-bar.service';
@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: ['./forgot-password-page.component.scss']
})

export class ForgotPasswordPageComponent {
  email:string;
    @ViewChild('f') forogtPasswordForm: NgForm;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private authService:AuthService) { }

    // On submit click, reset form fields
    onSubmit(f: NgForm) {
        //this.forogtPasswordForm.reset();
    /*     this.alertService.info('Working on sending email');
        this.progressBar.startLoading();
        const resetPasswordObserver = {
          next: x => {
            this.progressBar.setSuccess();
            this.alertService.success('Check email to change password');
            console.log('Check email to change password');
            this.progressBar.completeLoading();
          },
          error: err => {
            this.progressBar.setError();
            console.log(err);
            this.alertService.danger('Unable to send email');
            this.progressBar.completeLoading();
          }
        };*/
        this.authService.resetPassword(f.value).subscribe((res: any) => {
          console.log("res",res);
          Swal.fire('votre demande a été envoyé avec succes ', 'Veuillez vérifier votre email', 'success');
          f.reset();
       
        });
      }
    
    

    // On login link click
    onLogin() {
        this.router.navigate(['login'], { relativeTo: this.route.parent });
    }

    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }
}
