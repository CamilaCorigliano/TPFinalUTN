import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Injectable, booleanAttribute } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { userService } from 'src/app/services/api.service/userService';
import { Observable, forkJoin } from 'rxjs';
import { result } from 'src/app/models/result.interface';

@Injectable({
  providedIn:'root'
})
@Component({
  selector: 'app-register-add',
  templateUrl: './register-add.component.html',
  styleUrls: ['./register-add.component.css']
})

export class RegisterAddComponent {
 registerForm = new FormGroup({
    firstName: new FormControl('',[Validators.minLength(3),Validators.maxLength(10),Validators.required]),
    lastName: new FormControl('',[Validators.minLength(2),Validators.maxLength(10),Validators.required]),
    password: new FormControl('',Validators.minLength(6)),
    confirmPassword: new FormControl(''),
    email :  new FormControl('',[Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'),Validators.required]),
    dni: new FormControl('',[Validators.minLength(7),Validators.required,Validators.pattern('^[0-9]+$')]),
  });
  errordiv=" ";
  errordiv2=" ";
  errordiv3=" ";
  errordiv4=" ";
  data : any[]=[];
  constructor(private apiservice:userService,private router:Router, private fb:FormBuilder){}

  ngOnInit(){
    this.getUsers();
  }

  get invalidName(){
    return this.registerForm.get('firstName')?.invalid && this.registerForm.get('firstName')?.touched;
  }

  get invalidLastname(){
    return this.registerForm.get('lastName')?.invalid && this.registerForm.get('lastName')?.touched;
  }

  get invalidUsername(){
    return this.registerForm.get('userName')?.invalid && this.registerForm.get('userName')?.touched;
  }

  get invalidEmail(){
    return this.registerForm.get('email')?.invalid && this.registerForm.get('email')?.touched;
  }

  get invalidDni(){
    return this.registerForm.get('dni')?.invalid && this.registerForm.get('dni')?.touched;
  }

  get invalidPassword(){
    return this.registerForm.get('password')?.invalid && this.registerForm.get('password')?.touched;
  }



  confirmPassword(password:any):Observable<boolean>{
    return new Observable((observer)=>{
      let validpassword= true;
      let confirmPassword=this.registerForm.get("confirmPassword")?.value;
      if(!(password==confirmPassword)){
        validpassword=false;
      }
      observer.next(validpassword);
      observer.complete();
    })
  }

  getUsers(){
    this.apiservice.getUsers("/users").subscribe(data=>{
      this.data=data;
    })
  }

 checkUsername(newuser: User): Observable<boolean> {
    return new Observable((observer) => {
      const isUsernameValid = !this.data.some((user) => user.userName === newuser._userName);
      observer.next(isUsernameValid);
      observer.complete();
    });
  }

 checkEmail(newuser: User): Observable<boolean> {
    return new Observable((observer) => {
      const isEmailValid = !this.data.some((user) => user.email === newuser._email);
      observer.next(isEmailValid);
      observer.complete();
    });
  }
  
 checkDni(newuser: User): Observable<boolean> {
    return new Observable((observer) => {
      const isDniValid = !this.data.some((user) => user.dni == newuser._dni);
      observer.next(isDniValid);
      observer.complete();
    });
  }

  createUser(): User{
    const data ={
      _firstName: this.registerForm.get('firstName')?.value!,
      _lastName: this.registerForm.get('lastName')?.value!,
      _dni: this.registerForm.get('dni')?.value!,
      _email: this.registerForm.get('email')?.value!,
      _password: this.registerForm.get('password')?.value!,
      _role: this.registerForm.get('role')?.value!
      }
    let user = new User(data);
    return user;
  }
  
  
 checkUser(user:User): Observable<boolean[]> {
    return forkJoin([
      this.checkUsername(user),
      this.checkDni(user),
      this.checkEmail(user),
      this.confirmPassword(user._password)
    ]);
  }
  
  onSubmit(){
    let user: User = this.createUser();
    this.checkUser(user).subscribe((results:any) => {
      const [isUsernameValid, isDniValid, isEmailValid,confirmPassword] = results;
      this.errordiv=" ";
      this.errordiv2=" ";
      this.errordiv3=" ";
      this.errordiv4=" ";
      if (isUsernameValid && isDniValid && isEmailValid && confirmPassword) {
        this.apiservice.addUser(user._firstName, user._lastName, user._email, user._dni, user._password).subscribe(
          (data)=>{
            if(data.message.includes("created")){
              alert("usuario creado")
            }
            },
            (error)=>{
              alert("error al crear usuario")
              console.log(error)
            }
            );
        
        this.router.navigate(['/login']);
      } else {
        if(isDniValid==false){
          this.errordiv="El dni provisto ya se encuentra registrado";
        }
        if(isUsernameValid==false){
          this.errordiv2="El username provisto ya se encuentra registrado";
        }
        if(isEmailValid==false){
          this.errordiv3="El email provisto ya se encuentra registrado";
        }
        if(confirmPassword==false){
          this.errordiv4="Las contraseñas no coinciden";
        }
      }
    });
    
  }
}

