import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  
  index = 0;
  dataB1:any;            // Data chọn B1 don vi, thiet bi
  listOfDataPmis:any=[]  // list data Pmis
  listOfDataGis:any= []  //list data Gis
  setOfCheckedId = new Set<number>();   // list chọn đồng bộ ở b2
  ngOnInit(): void {
    console.log('load')
  }
  onIndexChange(event: number): void {
    if(event==1)
      {if(this.dataB1!=null)
        this.index = event;
    }else
    if(event==2)
    {
      if(this.setOfCheckedId.size!=0)
        this.index = event;
    }
    else{
      this.index = event;
    }
  }

  //1
  B1Submit(data:any){
    this.dataB1=data;
    this.loadDuLieuSoSanh();
    this.index=1
  }
  loadDuLieuSoSanh(){
      this.setOfCheckedId.clear()
      this.listOfDataPmis=[{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10},{id:11},{id:12},{id:13},{id:14}];
      this.listOfDataGis=[{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10},{id:11},{id:12},{id:13},{id:14}]
  }
  //2
  B2Submit(data:any){
    console.log(data)
    if(data)
    {this.setOfCheckedId=data;this.index=2;}
    else this.index =0 //1
  }
  B3Submit(data:any){
    console.log(data)
    if(!data)
    this.index =1
  }

}
