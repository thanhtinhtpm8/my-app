import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomService } from 'src/app/core/services/room.service';



@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {
  @Output() taoThanhCong:any = new EventEmitter();
  @Input() list:any
  validateForm!: FormGroup;
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
  isVisible = false;

  constructor(private fb: FormBuilder,private roomService:RoomService) {}
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      roomName: [null, [Validators.required]],
      listUser:[null,[Validators.required]]
    });
    //this.loadUser();
  }

  // loadUser(){
  //   this.userService.getListUser().subscribe((res:any)=>{
  //     console.log(res);
  //     this.list=res;
  //   })
  // }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  createRoom(){
    let obj={
      "roomName": this.validateForm.controls['roomName'].value,
      "listUser": this.validateForm.controls['listUser'].value.map((a:any) => a.userName),
      "listIdUser": this.validateForm.controls['listUser'].value.map((a:any) => a.id)
    }
    console.log(obj)
    if(this.validateForm.valid){
      this.roomService.createRoom(obj).subscribe((res:any)=>{
        console.log(res);
        this.taoThanhCong.emit();
      })
    }
  }
 
}
