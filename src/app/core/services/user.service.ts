import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService{
  middlePath = '/User';
  override endPoint = this.middlePath;
  // constructor( private http: HttpClient) { }
  getListUser(){
    return this.GetAll();
  }
  getListUserByIdRoom(data:any){
    return this.GetbyExt("/getListUser?roomId="+data)
  }
  getUserInfor(){
    return this.GetbyExt("/infor")
  }
  
}
