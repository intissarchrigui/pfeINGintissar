import { Component, ViewChild,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import Profesionnel from '../_models/Profesionnel';
import { Role } from '../_models/role';
import { AuthService } from '../_services/auth.service';
import Swal from 'sweetalert2';
import { ImageService } from '../_services/image.service';
//import { extname } from "path";
interface Abonnement {
  value: string;
  viewValue: string;
}
@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent implements OnInit{
  choix = '';
    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    registerForm:FormGroup;
    thirdFormGroup: FormGroup;
    selectedCurrency :  any;
    test : Date = new Date();

    hide = true;
    submitted = false;
    filesToUpload: Array<File>;
    filesToUpload2: Array<File>;
    imageSrc: string = "../../../assets/img/ct.png";
    image;
    form:  Profesionnel ={
      _id:"",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      nom_agence:"",
      password:"",
      confirmPassword:"",
      //type_abonnement:"",
      role:Role.Profesional,
     date_inscrit_pro:new Date,
    // emailVerified:false,
     etat:'Pending',
    // type_payement:"",
     matricule_fiscale:"",
     Open:false,
     image:""
    } ;
    fileExtName;
    abonnements:Abonnement[]= [
      {value: 'mensuelle', viewValue: 'mensuelle'},
      {value: 'anuelle', viewValue: 'anuelle'}
     
    ];
   
    constructor( private _formBuilder: FormBuilder,private authService: AuthService,private router: Router,private imageService:ImageService) { }
    //@ViewChild('f', {static: false}) registerForm: NgForm;
    //  On submit click, reset field value
    ngOnInit() {
    /*     this.firstFormGroup = this._formBuilder.group({

          first_name: ['', Validators.required],
          last_name: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          phone: [null, [
            Validators.required,
            Validators.pattern(/^[0-9]\d*$/),
            Validators.minLength(8),
          ]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required],

        });
        this.secondFormGroup = this._formBuilder.group({
          libelle: ['', Validators.required],
          type_abonnement: ['', Validators.required],
        }); */
        this.firstFormGroup = this._formBuilder.group({
          firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
          secondCtrl: ['', Validators.required]
        });
        this.thirdFormGroup = this._formBuilder.group({
          thirdCtrl: ['', Validators.required]
        });

        this.registerForm = this._formBuilder.group({
          first_name: ['', Validators.required],
          last_name: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          phone: [null, [
            Validators.required,
            Validators.pattern(/^[0-9]\d*$/),
            Validators.minLength(8),
          ]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required],
        //  acceptTerms: [false, Validators.requiredTrue]
        }, {
           validator: this.MustMatch('password', 'confirmPassword')
        });
      }
      get f1() {
        return this.firstFormGroup.controls;
      }
      get f2() {
        return this.secondFormGroup.controls;
      }

      readURL(event: any) {
        if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();
    
          reader.onload = (event: any) => {
            this.imageSrc = event.target.result;
          }
    
          reader.readAsDataURL(event.target.files[0]);
          this.filesToUpload = event.target.files;
          this.image = event.target.files[0].image;
         // this.fileExtName =this.image.split('.').slice(-1).join('.');
         // console.log("fileExtName",this.fileExtName)
        }
       // this.fileExtName =this.image.split('.').slice(-1).join('.');
        //console.log("fileExtName",this.fileExtName);
      }
   

      recuperFile(file){
        if (file.target.files && file.target.files[0]) {
          var reader = new FileReader();
    
          reader.onload = (event: any) => {
            this.imageSrc = event.target.result;
          }
    
          reader.readAsDataURL(file.target.files[0]);
          this.filesToUpload2 = file.target.files;
          this.image = file.target.files[0].image;
         // this.fileExtName =this.image.split('.').slice(-1).join('.');
         // console.log("fileExtName",this.fileExtName)
        }

      }
    
    onSubmit() {
    
  /*   const dataPro = {
        first_name: this.firstFormGroup.value.first_name,
        last_name: this.firstFormGroup.value.last_name,
        email:  this.firstFormGroup.value.email,
        password: this.firstFormGroup.value.password,
        confirmPassword: this.firstFormGroup.value.confirmPassword,
        phone:  this.firstFormGroup.value.phone,
        role:Role.Profesional,
        libelle:this.secondFormGroup.value.libelle,
        type_abonnement:this.secondFormGroup.value.type_abonnement.value,
        date_inscrit_pro:new Date(),
        emailVerified:false
      }; 
     
     console.log(this.secondFormGroup.value)

   this.submitted = true;
      if (this.firstFormGroup.invalid||this.secondFormGroup.invalid ) {
        return;
      }   */
      const profesionalInfo = new Profesionnel();
     // profesionalInfo._id = this.form._id;
     // profesionalInfo.type_abonnement = this.form.type_abonnement;
      profesionalInfo.password = this.form.password;
      profesionalInfo.password = this.form.confirmPassword;
      profesionalInfo.email = this.form.email;
      profesionalInfo.nom_agence = this.form.nom_agence;
      profesionalInfo.first_name = this.form.first_name;
      profesionalInfo.last_name = this.form.last_name;
      profesionalInfo.phone = this.form.phone;
     profesionalInfo.role = this.form.role;
      profesionalInfo.date_inscrit_pro=this.form.date_inscrit_pro;
      //profesionalInfo.emailVerified=this.form.emailVerified;
      profesionalInfo.etat=this.form.etat;
      //profesionalInfo.type_payement=this.form.type_payement;
      profesionalInfo.matricule_fiscale=this.form.matricule_fiscale;
      profesionalInfo.image=this.filesToUpload2[0].name;

  
        //this.registerForm.reset();
        this.authService.registerProfesionnel(profesionalInfo)
        .subscribe((res:any) =>{
       
      
 
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(profesionalInfo, null, 4));
     console.log(res)
    
      this.router.navigate(['/login']);
      Swal.fire('Votre demande a été envoyée avec succés!', '', 'success');
  },err=>{
 
    if (err){
   
   
       Swal.fire({
         icon: 'error',
         title: 'oops...',
         text:  'Cet Email existe déja !',
       });
       this.router.navigate(['/register']);
     
     }})
}
    get f() {
      return this.registerForm.controls;
    }
    onSubmitClient() {

    const randomName = Array(24)
    .fill(null)
    .map(() => Math.round(Math.random() * 24).toString(24))
    .join('');
    console.log("randomName",randomName) 
 
     let data:any = {}
      if (this.filesToUpload === undefined) {
        data = {
        first_name: this.registerForm.value.first_name,
        last_name: this.registerForm.value.first_name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        confirmPassword: this.registerForm.value.confirmPassword,
        phone: this.registerForm.value.phone,
        role: Role.Client,
        date_inscrit_client:new Date(),
        image: "anynoyme.png",
      }   } else {
        data = {
         // _id:randomName,
          first_name: this.registerForm.value.first_name,
          last_name: this.registerForm.value.first_name,
          email: this.registerForm.value.email,
          password: this.registerForm.value.password,
          confirmPassword: this.registerForm.value.confirmPassword,
          phone: this.registerForm.value.phone,
          role: Role.Client,
          date_inscrit_client:new Date(),
          image: this.filesToUpload[0].name,
         // this.fileExtName =this.image.split('.').slice(-1).join('.');
          fileImage:randomName
        } }
      
 
          this.submitted = true;
  
      // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
      } 
  
      // display form values on success
      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
      //this.router.navigate(['/login']);
      console.log(this.registerForm.value);
      
      this.authService.registerClient(data).subscribe((res:any) => {
        console.log(res) 
       
          this.router.navigate(['/login']);
         // Swal.fire('Votre demande a été envoyée avec succés!', '', 'success');
          if (this.filesToUpload != undefined) {
            this.imageService
              .pushFileToStorage(this.filesToUpload[0],data.fileImage)
              .subscribe((rest) => {
                console.log(rest);
                console.log("file",this.filesToUpload[0])
              });
          }
       } ,err=>{
 
        if (err){
       
       
           Swal.fire({
             icon: 'error',
             title: 'oops...',
             text:  'Cet Email existe déja !',
           });
           this.router.navigate(['/register']);
         
         }})
    }
    onReset() {
      this.submitted = false;
      this.registerForm.reset();
    }
    profesional() {
        this.choix = 'profesionnel';
      }
    
      client() {
        this.choix = 'client';
      }

  MustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
          const control = formGroup.controls[controlName];
          const matchingControl = formGroup.controls[matchingControlName];
    
          if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
          }
    
          // set error on matchingControl if validation fails
          if (control.value !== matchingControl.value) {
            matchingControl.setErrors({mustMatch: true});
          } else {
            matchingControl.setErrors(null);
          }
        };
      }
  
}
