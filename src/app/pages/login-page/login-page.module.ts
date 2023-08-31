import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginPageComponent } from './login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { LoginWithGoogleComponent } from 'src/app/shared/components/login-with-google/login-with-google.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
@NgModule({
  declarations: [LoginPageComponent,LoginWithGoogleComponent],
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
    NzMessageModule,
    NzIconModule,
    NzSpinModule
  ]
})
export class LoginPageModule { }
