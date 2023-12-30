import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-so-sanh-du-lieu',
  templateUrl: './so-sanh-du-lieu.component.html',
  styleUrls: ['./so-sanh-du-lieu.component.scss']
})
export class SoSanhDuLieuComponent implements OnInit{
     @ViewChild("tb1") TB1:any= ElementRef;
     @ViewChild("tb2") TB2:any= ElementRef;
     @Input() data:any;
     @Output() B2Submit = new EventEmitter<any>();
     @Input() listOfDataPmis:any
     @Input() listOfDataGis:any
     @Input() setOfCheckedId:any;
     checked = false;
     constructor(private message:NzMessageService){}
     ngOnInit(): void {
      console.log('load 2')
     }
     onScroll1(data:any){
      this.TB2.nativeElement.scrollTop = this.TB1.nativeElement.scrollTop;
      this.TB2.nativeElement.scrollLeft  = this.TB1.nativeElement.scrollLeft;
     }
     onScroll2(data:any){
      this.TB1.nativeElement.scrollTop = this.TB2.nativeElement.scrollTop;
      this.TB1.nativeElement.scrollLeft  = this.TB2.nativeElement.scrollLeft;
     }

    /// xử lý check table 1 (data PMIS)
    updateCheckedSet(id: number, checked: boolean): void {
      if (checked) {
        this.setOfCheckedId.add(id);
      } else {
        this.setOfCheckedId.delete(id);
      }
    }
    refreshCheckedStatus(): void {
      const listOfEnabledData = this.listOfDataPmis;
      this.checked = listOfEnabledData.every((x:any) => this.setOfCheckedId.has(x.id));
    }
    onAllChecked(checked: boolean): void {
      this.listOfDataPmis.forEach((x:any) => this.updateCheckedSet(x.id, checked));
      console.log(this.setOfCheckedId)
      this.refreshCheckedStatus();
    }
    onItemChecked(id: number, checked: boolean): void {
      this.updateCheckedSet(id, checked);
      this.refreshCheckedStatus();
    }
    //
    onSubmit(data:any){
        if(data==='huy')
          this.B2Submit.emit(null);
        if(data==='ok')
          if(this.setOfCheckedId.size==0) this.message.error('Vui lòng chọn dữ liệu')
          else this.B2Submit.emit(this.setOfCheckedId);
    }

     
}
