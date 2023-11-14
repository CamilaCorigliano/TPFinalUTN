import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, TitleStrategy } from '@angular/router';
import { User } from 'src/app/models/user';
import { userService } from 'src/app/services/api.service/userService';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { Observable, forkJoin } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { login } from 'src/app/models/login.interface';
import { result } from 'src/app/models/result.interface';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent {
  loginForm = new FormGroup({
    email :  new FormControl('',[Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'),Validators.required]),
    password: new FormControl('',Validators.minLength(6))
  });
  data:any[]=[];
  msg:string[]=[];
  user = new User;
  errordiv="";
  errordiv2="";
  
  constructor(private router: Router, public authService: AuthService,private apiservice: userService, private fb: FormBuilder) { }

  ngOnInit() {
  }
  
  get invalidEmail(){
    return this.loginForm.get('email')?.invalid && this.loginForm.get('email')?.touched;
  }
  get invalidPassword(){
    return this.loginForm.get('password')?.invalid && this.loginForm.get('password')?.touched;
  }



 getUserID(){
     this.apiservice.getUsersEmail(this.user.email,this.user.password).subscribe((data:any)=>{
      if(data.message=="Login successful"){
        this.user=data.user;
        this.apiservice.userid(data.user);
      }else{
        if(data.message==500){
          this.msg.push("El email no esta registrado");
        }else{
          this.msg.push("Contraseña inconrrecta");
        }
      }
    })
  }

  onSubmit() {
    this.user.email = this.loginForm.get('email')?.value!;
    this.user.password = this.loginForm.get('password')?.value!;
    this.getUserID();
    this.errordiv=" ";
    this.errordiv2=" ";
    setTimeout(() => {
      if (this.user.idUser!="@") {
        this.authService.login();
        this.router.navigate(['/list-restaurants']);
        } else {
         if(this.msg.pop()=="wrong pasword"){
              this.errordiv="Contraseña incorrecta";
           }else{
            this.errordiv2="El email provisto no se encuentra registrado";
           }
        }
    }, 1000);
 };    

  
}
