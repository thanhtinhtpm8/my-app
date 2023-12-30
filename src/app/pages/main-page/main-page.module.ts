import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzImageModule } from 'ng-zorro-antd/image';
import { FormsModule } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { MainPageComponent } from './main-page.component';
import { ChonDuLieuComponent } from './chon-du-lieu/chon-du-lieu.component';
import { SoSanhDuLieuComponent } from './so-sanh-du-lieu/so-sanh-du-lieu.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { DongBoDuLieuComponent } from './dong-bo-du-lieu/dong-bo-du-lieu.component';
@NgModule({
  declarations: [
    MainPageComponent,
    ChonDuLieuComponent,
    SoSanhDuLieuComponent,
    DongBoDuLieuComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    NzButtonModule,
    NzGridModule,
    NzCardModule,
    NzIconModule,
    NzFormModule,
    NzListModule,
    NzModalModule,
    NzSelectModule,
    NzTagModule,
    NzMessageModule,
    NzImageModule,
    FormsModule,
    NzSpinModule,
    InfiniteScrollModule,
    NzAvatarModule,
    NzNotificationModule,
    NzStepsModule,
    NzTableModule
  ]
})
export class MainPageModule { }
