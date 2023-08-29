import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService extends BaseService{
  middlePath = '/Room';
  override endPoint = this.middlePath;
  // constructor( private http: HttpClient) { }
  getListRooom(){
    return this.GetbyExt("/myroom")
  }
  createRoom(data:any){
    return this.PostbyExt("",data);
  }
  getRoomInfor(data:any){
    return this.GetbyExt('/'+data)
  }
}
