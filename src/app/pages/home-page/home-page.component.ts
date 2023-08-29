import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RoomService } from 'src/app/core/services/room.service';
import { UserService } from 'src/app/core/services/user.service';

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
    private userService:UserService){
  }
  ngOnInit(): void {
      this.loadRoom();
      this.loadAllUser();
      this.loadUserInfor();
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
}
