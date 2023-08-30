import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators ,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, finalize, take, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  imageAvt:any=null;
  imageURL:any=null;
  loginForm:FormGroup = this.fb.group({
    userName:['', [Validators.required]],
    password:['', Validators.required]
  });

  registerForm:FormGroup = this.fb.group({
    userName:['', [Validators.required]],
    password:['', Validators.required],
    image:[null]
  });

  ngOnInit(): void {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    signUpButton?.addEventListener('click',(ev:any)=>{
    container?.classList.add("right-panel-active")
    })
    signInButton?.addEventListener('click',()=>{
    container?.classList.remove("right-panel-active")
    })
    
  }
  constructor(private fb: FormBuilder,private authService:AuthService,
    private message:NzMessageService,private router: Router){

  }
  onLogin(){
    if(this.loginForm.valid)
      this.login();
  }

  login() {
    this.authService.logIn(this.loginForm.value).subscribe((res:any)=>{
      const { data, success, message } = res;
        if (success) {
          localStorage.setItem('tokenAccess', res.data.accessToken);
          localStorage.setItem('username', res.data.username);
          this.message.success(message);
        //  window.location.href="/home"
          this.router.navigate(["home"]);
        } else {
          this.message.error(message);
        }
    },(err:any)=>{this.message.error(err.error)})
  }
  changeAvt(data:any){
    this.imageAvt=data.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      console.log(this.imageURL);
    }
    reader.readAsDataURL(this.imageAvt);
  }
  register(){
    const formData = new FormData();
    formData.append('UserName',this.registerForm.controls['userName'].value);
    formData.append('Password', this.registerForm.controls['password'].value );
    if(this.imageAvt) formData.append('Image',this.imageAvt);
    this.authService.register(formData).subscribe((res:any)=>{
      const { data, success, message } = res;
        if (success) {
          this.message.success(message);
        } else {
          this.message.error(message);
        }
    },(err:any)=>{this.message.error(err.error)})
  }
  onRegister(){
    if(this.registerForm.valid)
    this.register();
  }

}
