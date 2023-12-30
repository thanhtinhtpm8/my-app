import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-chon-du-lieu',
  templateUrl: './chon-du-lieu.component.html',
  styleUrls: ['./chon-du-lieu.component.scss']
})
export class ChonDuLieuComponent implements OnInit {
  @Output() B1Submit = new EventEmitter<any>();
  @Input() data :any;
  selectDonVi:any;
  selectThietBi:any;
  listDonVi:any=[
    {maDV:'PC01',tenDV:'Điện lực Quảng Nam'},
    {maDV:'PC02',tenDV:'Điện lực Quảng Ngãi'},
    {maDV:'PC03',tenDV:'Điện lực Quảng Bình'},
    {maDV:'PC04',tenDV:'Điện lực Quảng Nam'},
    {maDV:'PC05',tenDV:'Điện lực Quảng Nam'},
    {maDV:'PC06',tenDV:'Điện lực Quảng Nam'},
    {maDV:'PC07',tenDV:'Điện lực Quảng Nam'},
    {maDV:'PC08',tenDV:'Điện lực Quảng Nam'},
  ];
  listThietBi:any=[
    {maTB:'TB1',tenTB:'abc1'},
    {maTB:'TB2',tenTB:'abc2'},
    {maTB:'TB3',tenTB:'abc3'},
    {maTB:'TB4',tenTB:'abc4'}
  ];
  constructor(private message:NzMessageService){}
  ngOnInit(): void {
    console.log('load 1')
    if(this.data) {
      this.selectDonVi=this.data.donvi;
      this.selectThietBi=this.data.thietbi;
      }
  }
  layDuLieu(){
    if(this.selectDonVi&&this.selectThietBi)
      this.B1Submit.emit({donvi:this.selectDonVi,thietbi:this.selectThietBi});
    else
      this.message.warning('Vui lòng chọn thông tin')
  }
}
