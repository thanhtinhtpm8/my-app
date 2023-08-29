import { AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from 'src/app/core/services/chat.service';
import * as signalR from '@microsoft/signalr';  
import { AuthService } from 'src/app/core/services/auth.service';
import { RoomService } from 'src/app/core/services/room.service';
import { environment } from 'src/environments/environment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserService } from 'src/app/core/services/user.service';
import { pl_PL } from 'ng-zorro-antd/i18n';
@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit, AfterViewChecked ,AfterViewInit{
  @Input() idRoom!:string;
  @Input() usersDetail!:any;
  @Input() myInfor!:any;
  data:any=[];
 
  roomDetail:any;
  validateForm!: FormGroup;
  fileImage:any;
  imageURL:any;
  loading:any=true;
  throttle = 0;
  distance = 2;
  page = 1;
  loadnew=true;
  @ViewChild('content1')
  content!: ElementRef;
  constructor(private chatService:ChatService,private fb: FormBuilder,
    private authService:AuthService,
    private roomService:RoomService,
    private message:NzMessageService){ 
      this.validateForm = this.fb.group({
      content: [''],
      image: [null],
    });}
  ngAfterViewInit(): void { 
  }
  
  ngAfterViewChecked(): void {    
  }
  ngOnInit(): void {
    
    if(this.idRoom) {this.loadData(); this.loadRoomInfo();}
    // this.username = this.authService.getUserName();
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
      if(result.includes(this.authService.getUserName()))
      {
        this.page=1;
        this.loadData();
      }
    });

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.myInfor)
    if(this.idRoom){
      this.data=[];
      this.validateForm.controls['content'].setValue('');
      this.validateForm.controls['image'].setValue(null);
      this.fileImage=null;
      this.loading=true;
      this.page=1;
      this.loadData();
      this.loadRoomInfo();
    }
  }

  loadData(){
    if(this.idRoom)
      this.chatService.getListChatByIdRoom(this.idRoom).subscribe((res:any)=>{this.data=res.data;this.loading=false;
     this.scrollBottom(); });
  }
  loadRoomInfo(){
    this.roomService.getRoomInfor(this.idRoom).subscribe((res:any)=>{console.log(res);this.roomDetail=res;})
  }

  getAvatar(idUser:any){
    if(this.usersDetail!=null)
    {
      if(this.usersDetail.filter((res:any)=>res.userid==idUser))
          return this.usersDetail.filter((res:any)=>res.id==idUser)[0].image ;
    }
    return null;
  }
  

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
  scrollBottom(){
    try{this.content.nativeElement.scrollTop =(this.content.nativeElement.scrollHeight);}catch{console.log('error scroll')}
  }
  OnChangeFile(data:any){
    this.fileImage=data.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(this.fileImage);
  }
  send(){
    if(this.idRoom)
    {
      const formData = new FormData();
      formData.append('Image',this.fileImage||null);
      formData.append('RoomId', this.idRoom );
      formData.append('Content', this.validateForm.controls['content'].value );
 
      if(this.validateForm.valid){
        if( this.validateForm.controls['content'].value==='' && !this.validateForm.controls['image'].value) this.message.warning('Vui lòng nhập tin nhắn!')
        else
        { 
         
          this.data.push({'content':formData.get('Content'),userName:this.myInfor.userName,userId:this.myInfor.id,image:this.imageURL||null})
          this.validateForm.controls['content'].setValue('');
           this.fileImage=null;
           this.imageURL=null;
           this.chatService.sendMessageImage(formData).subscribe((res:any)=>{
            if(res.success) { this.validateForm.controls['image'].setValue(null); this.scrollBottom(); }
              else 
            {this.validateForm.controls['content'].setValue(formData.get('Content'));
             this.fileImage=formData.get('Image');
             this.message.error('Đã xảy ra lỗi, Vui lòng thử lại!')
            }
          },(err:any)=>{
          this.validateForm.controls['content'].setValue(formData.get('Content'));
          this.fileImage=formData.get('Image');this.message.error('Vui lòng kiểm tra kết nối!');});
        }
      }
    }    
  }
  onScrollUp(ev:any): void {
    console.log("scrolled up!", ev);
    this.chatService.getListChatByIdRoom(this.idRoom,++this.page)
      .subscribe((res:any) => {
        this.data.push(...res.data);
      });
  }
  onScroll(data:any){
    console.log('scroll')
    if(this.content.nativeElement.scrollTop===0)
    {
      this.loading=true;
      this.chatService.getListChatByIdRoom(this.idRoom,++this.page)
      .subscribe((res:any) => {
        if(res.data.length==0) this.message.info('Hết')
        else{
        var kq=res.data.concat(this.data);
        this.data=kq;
        this.content.nativeElement.scrollTop=this.content.nativeElement.scrollTop+4;
        }
        this.loading=false;
      });
    }
  }
  loadFinish(data:any){
    console.log('dâdada')
  }
}
