import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RoomService } from 'src/app/core/services/room.service';
import { UserService } from 'src/app/core/services/user.service';
import { environment } from 'src/environments/environment';
import * as signalR from '@microsoft/signalr';  
import { AuthService } from 'src/app/core/services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  isVisible = false;
  allUser:any=[];
  myInfor:any;
  idRoomSelected:any=null;
  listRoom:any=[];
  constructor(private roomService:RoomService ,
    private userService:UserService,
    private authService:AuthService,
    private notification: NzNotificationService){}
  ngOnInit(): void {
      this.loadRoom();
      this.loadAllUser();
      this.loadUserInfor();
      const connection = new signalR.HubConnectionBuilder()  
      .configureLogging(signalR.LogLevel.Information)  
      .withUrl(environment.hubUrl)  
      .build(); 
      connection.start().then(function() {  
        console.log('SignalR Connected!');  
      }).catch(function (err) {  
        return console.error(err.toString());  
      });
      connection.on("Message", (result:any) => {  
        if(result.userNameReceive.includes(this.authService.getUserName()))
        {
          this.loadRoom();
          this.createNotification('1 thông báo từ '+result.userNameSend,result.content)
        }
      });
  }
  loadRoom(){
    this.roomService.getListRooom().subscribe((data:any)=>{
      this.listRoom=data;
    })
  }
  loadAllUser(){
    this.userService.getListUser().subscribe((res:any)=>{
      this.allUser=res;
    })
  }
  loadUserInfor(){
    this.userService.getUserInfor().subscribe((res:any)=>{
      this.myInfor=res;
    })
  }
  selectRoom(data:any){
    this.idRoomSelected=data;
  }

  createNotification(title:string,content: string): void {
    this.notification.create(
      'info',
      title,
      content
    );
  }
}
