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
  listRoom:any=[];
  allUser:any=[];
  myInfor:any;
  idRoomSelected:any=null;
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
          this.createNotification('1 thông báo từ '+result.userNameSend,result.content)
        }
      });
  }
  loadRoom(){
    this.roomService.getListRooom().subscribe((data:any)=>{
      this.listRoom=data
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
  gridStyle = {
    width: '25%',
    textAlign: 'center',
  };
  getAvatar(idUser:any){
    try{
    if(this.allUser!=null&&this.allUser.length!=0)
    {
      if(this.allUser.filter((res:any)=>res.userid==idUser))
          return this.allUser.filter((res:any)=>res.id==idUser)[0]!.image ||null ;
    }
  }catch{return null;}
    return null;
  }

  createNotification(title:string,content: string): void {
    this.notification.create(
      'info',
      title,
      content
    );
  }
}
