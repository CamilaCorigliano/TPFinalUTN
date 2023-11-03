import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Injectable, booleanAttribute } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/apiservice';
import { Observable, forkJoin } from 'rxjs';

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
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    userName: new FormControl(''),
    password: new FormControl(''),
    telephone: new FormControl(''),
    email :  new FormControl(''),
    dni: new FormControl(''),
    idRol: new FormControl('')
  });
  data : any[]=[];
  constructor(private apiservice:ApiService,private router:Router, private fb:FormBuilder){}

  ngOnInit(){
    this.getUsers();
  }

  getUsers(){
    this.apiservice.getdata().subscribe(data=>{
      this.data=data;
      console.log(this.data);
    })
  }

 checkUsername(newuser: User): Observable<boolean> {
    return new Observable((observer) => {
      const isUsernameValid = !this.data.some((user) => user.userName === newuser.userName);
      observer.next(isUsernameValid);
      observer.complete();
    });
  }
  
 checkEmail(newuser: User): Observable<boolean> {
    return new Observable((observer) => {
      const isEmailValid = !this.data.some((user) => user.email === newuser.email);
      observer.next(isEmailValid);
      observer.complete();
    });
  }
  
 checkDni(newuser: User): Observable<boolean> {
    return new Observable((observer) => {
      const isDniValid = !this.data.some((user) => user.dni === newuser.dni);
      observer.next(isDniValid);
      observer.complete();
    });
  }

  createUser(): User{
    let user = new User();
    user.firstName = this.registerForm.get('firstName')?.value!;
    user.lastName = this.registerForm.get('lastName')?.value!;
    user.dni = this.registerForm.get('dni')?.value!;
    user.email = this.registerForm.get('email')?.value!;
    user.userName= this.registerForm.get('userName')?.value!;
    user.password = this.registerForm.get('password')?.value!;
    return user;
  }
  
  
 checkUser(): Observable<boolean[]> {
    let user: User = this.createUser();
  
    // Use forkJoin to combine the results of all checks
    return forkJoin([
      this.checkUsername(user),
      this.checkDni(user),
      this.checkEmail(user),
    ]);
  }
  
  onSubmit(){
    
    this.checkUser().subscribe((results:any) => {
      const [isUsernameValid, isDniValid, isEmailValid] = results;
      console.log(results);
      if (isUsernameValid && isDniValid && isEmailValid) {
        //API
        alert("Tu registro ha sido exitoso");
        this.router.navigate(['/login']);
      } else {
        if(isDniValid==false){
          const divdni=document.getElementById("divdni");
          let errordiv=document.createElement('div');
          errordiv.innerText="El dni provisto ya se encuentra registrado";
          divdni?.appendChild(errordiv);
        }else if(isUsernameValid==false){
          const divusername=document.getElementById("divusename");
          let errordiv2=document.createElement('div');
          errordiv2.innerText="El username provisto ya se encuentra registrado";
          divusername?.appendChild(errordiv2);
        }else if(isEmailValid==false){
          const divemail=document.getElementById("divemail");
          let errordiv3=document.createElement('div');
          errordiv3.innerText="El email provisto ya se encuentra registrado";
          divemail?.appendChild(errordiv3);
        }
      }
    });
    
  }
}
