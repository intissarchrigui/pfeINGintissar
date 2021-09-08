import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import Swal from 'sweetalert2';
import NewPassword from '../_models/NewPassword';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild('f') forogtPasswordForm: NgForm;
  @Input() password:string;
  Confirmpassword;
  model: any = {};
  token;
  email;
  formNewPass:NewPassword={
    password :'',
   Confirmpassword:''
  }
  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService:AuthService) { }

  ngOnInit(): void {
   this.token= this.route.snapshot.paramMap.get('token');
    this.email=this.route.snapshot.paramMap.get('email');
    this.getNewPass();
  }

  getNewPass() {
    this.authService.GetNewPassword(this.model).subscribe((res: any) => {
      console.log("res",res);
   
    });
  }
  

  onSubmit(f) {

    const data={
    newPasswordToken: this.token,
    email:this.email,
    newPassword:f.value
    }
    this.authService.changePassword(data).subscribe((res: any) => {
      console.log("data",data);
      console.log("res",res);
      Swal.fire('votre mot de passe a été changé avec succés ', '', 'success');
      this.router.navigate(['login'])
    });
  }

}
