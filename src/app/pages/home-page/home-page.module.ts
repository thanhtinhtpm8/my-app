import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { HomePageComponent } from './home-page.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CreateRoomComponent } from './create-room/create-room.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgControl, NgModel, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzImageModule } from 'ng-zorro-antd/image';
import { FormsModule } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
@NgModule({
  declarations: [HomePageComponent,CreateRoomComponent, ChatBoxComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomePageRoutingModule,
    NzButtonModule,
    NzGridModule,
    NzCardModule,
    NzIconModule,
    NzModalModule,
    NzFormModule,
    NzListModule,
    NzModalModule,
    NzSelectModule,
    NzTagModule,
    NzMessageModule,
    NzImageModule,
    FormsModule,
    NzSpinModule,
    InfiniteScrollModule
    
    
  ]
})
export class HomePageModule { }
