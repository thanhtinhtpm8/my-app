import { EventEmitter, OnInit, Output } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DeviceDetectorService } from 'ngx-device-detector';
import { catchError, finalize, take, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
const clientID = environment.clientId;
@Component({
  selector: 'app-login-with-google',
  templateUrl: './login-with-google.component.html',
  styleUrls: ['./login-with-google.component.scss']
})
export class LoginWithGoogleComponent implements OnInit{
  auth2: any;
  returnUrl!: string;
  @Output() submitted = new EventEmitter();
  @ViewChild('loginRef', { static: false }) loginElement!: ElementRef;
  constructor(
    private authService:AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private message:NzMessageService,
    private deviceService: DeviceDetectorService
    ) {this.googleAuthSDK(); }
  ngOnInit() {
    this.returnUrl = this.route.snapshot.paramMap.get('returnUrl') || '/';
    this.googleAuthSDK();
  }

  callLogin() {
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleAuthUser: any) => {
        this.submitted.emit(true);
        this.authService.logInGoogle({idToken:googleAuthUser.getAuthResponse().id_token,deviceInfor:this.deviceService.getDeviceInfo().browser+' - '+this.deviceService.getDeviceInfo().deviceType+' - '+this.deviceService.getDeviceInfo().os_version}).subscribe((res:any)=>{
          const { data, success, message } = res;
        if (success) {
          localStorage.setItem('tokenAccess', res.data.accessToken);
          localStorage.setItem('username', res.data.username);
          this.message.success(message);
          window.location.href="/home"
        } else {
          this.message.error(message);
          this.submitted.emit(false);
        }
        })
      //  console.log(googleAuthUser.getAuthResponse().id_token)
        });

  }

  googleAuthSDK() {
    (<any>window)['googleSDKLoaded'] = () => {
      
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: clientID,
          plugin_name:'login',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.callLogin();
      });
    }

    
    (function (d, s, id) {
      
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement('script');
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }
}
