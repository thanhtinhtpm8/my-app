import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-dong-bo-du-lieu',
  templateUrl: './dong-bo-du-lieu.component.html',
  styleUrls: ['./dong-bo-du-lieu.component.scss']
})
export class DongBoDuLieuComponent implements OnInit {
 
  @Input() listOfDataPmis:any
  @Input() listOfDataGis:any
  @Input() setOfCheckedId:any;
  @Output() B3Submit = new EventEmitter<any>();
  listDataDongBo:any=[]
  constructor(private message:NzMessageService){}
  ngOnInit(): void {
    console.log(this.setOfCheckedId.has(1))
       this.listOfDataPmis.forEach((x:any)=>{
         if(this.setOfCheckedId.has(x.id)) this.listDataDongBo.push(x)
       })
  }
  onSubmit(type:string){
      if(type==='dongbo')
      {
          this.dongBo()
      }
      if(type==='excel')
      {
        this.excel()
      }
      if(type==='huy')
      {
          this.B3Submit.emit(null);
      }
  }
  excel(){
      
  }
  dongBo(){
      this.message.success('Đồng bộ thành công'); 
  }

}
