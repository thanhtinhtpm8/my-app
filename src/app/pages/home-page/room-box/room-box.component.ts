import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/core/services/auth.service';
import { RoomService } from 'src/app/core/services/room.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-room-box',
  templateUrl: './room-box.component.html',
  styleUrls: ['./room-box.component.scss']
})
export class RoomBoxComponent implements OnInit,OnChanges{
  @Input() allUser:any=[];
  @Output() clickRoom:any = new EventEmitter();
  @Input() listRoom:any=[];

  constructor(private roomService:RoomService){}
  ngOnChanges(changes: SimpleChanges): void {
  }
  ngOnInit(): void {
  }
  selectRoom(data:any){
    this.clickRoom.emit(data);
  }
 
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

}
