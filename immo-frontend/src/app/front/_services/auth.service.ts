import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Profesionnel from '../_models/Profesionnel';
const AUTH_API = 'http://localhost:3000/auth/';
const  changePasswordUrl = "http://localhost:4200/reset-password/";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Client from '../_models/client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwt: string;
  username: string;
  user;
  constructor(private http: HttpClient, private router: Router) { 
  
  }


  registerProfesionnel(user :any): Observable<any> {

    return this.http.post(AUTH_API + 'create',user)
  }
  registerClient(user :any): Observable<any> {

    return this.http.post(AUTH_API + 'create',user)
  }
  login(data) {
    return this.http.post(AUTH_API + 'login', data);
  }
  resetPassword(model: any) {
  /*   let headers = new HttpHeaders({
      changePasswordUrl: changePasswordUrl
    });
    let options = { headers: headers }; */
    return this.http.get(AUTH_API + 'email/forgot-password/' +model);
  }

  GetNewPassword(model: any) {
    return this.http.get(AUTH_API + 'email/reset-password/' +model);
  }

  changePassword(model: any) {
    return this.http.post(AUTH_API + "email/reset-password",model);
  }

  getUserById(id) {
    return this.http.get(AUTH_API + 'getClientById/' + id);
  }
  updateUser(id, updateForm) {
    return this.http.put(AUTH_API+ 'updateClient/' + id, updateForm);
  }

  deleteUser(id) {
    return this.http.delete(AUTH_API + 'deleteClient/' + id);
  }
  saveToken(jwt: string, user: object) {
    sessionStorage.setItem('token', jwt);
    sessionStorage.setItem('user', JSON.stringify(user));
    this.jwt = jwt;
    this.user = user;
    // console.log( this.jwt)
  }
  loadToken() {
    this.jwt = sessionStorage.getItem('token');
  }
  initParams() {
    this.jwt = undefined;
    this.user = undefined;
  }

  isLoggedIn() {
    let token = sessionStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }
  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
