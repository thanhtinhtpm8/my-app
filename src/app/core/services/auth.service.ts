import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService extends BaseService{
  middlePath = '/Authentication';
  override endPoint = this.middlePath;
  // constructor( private http: HttpClient) { }
  getUserName() {
    return localStorage.getItem('username');
  }
  getToken(): string | null {
    // console.log(localStorage.getItem('tokenAccess'));
    return localStorage.getItem('tokenAccess');
  }

  isAuthentication():boolean {
    return this.getToken() !== null
  }

  removeToken() {
    localStorage.removeItem('tokenAccess');
  }

  logIn(data:any) {
    const options = {
      withCredentials: false
    }
    this.initOptions(options);
    if (this.getToken()) { this.removeToken(); }
    return this.Post<any>(data);
  }
  register(data:any) {
    if (this.getToken()) { this.removeToken(); }
    console.log(data)
    return this.PostFilebyExt("/register",data);
  }
  
}
