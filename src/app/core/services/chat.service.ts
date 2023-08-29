import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends BaseService{
  middlePath = '/Chat';
  override endPoint = this.middlePath;
  // constructor( private http: HttpClient) { }
  getListChatByIdRoom(id:any,page:number=1){
    return this.GetbyExt("/"+id+'?page='+page);
  }
  sendMessage(data:any){
    return this.PostbyExt("",data);
  }
  sendMessageImage(data:any){
    return this.PostFilebyExt("",data);
  }
}
