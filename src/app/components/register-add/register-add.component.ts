import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/apiservice';

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
    this.llenardata();
  }

  llenardata(){
    this.apiservice.getdata().subscribe(data=>{
      this.data=data;
      console.log(this.data);
    })
  }

  onSubmit(){
    let user = new User();
    user.firstName = this.registerForm.get('firstName')?.value!;
    user.lastName = this.registerForm.get('lastName')?.value!;
    user.dni = this.registerForm.get('dni')?.value!;
    user.email = this.registerForm.get('email')?.value!;
    user.userName= this.registerForm.get('userName')?.value!;
    user.password = this.registerForm.get('password')?.value!;
    console.log('nombre:', user.firstName);
    console.log('apellido:', user.lastName);
    console.log('dni:', user.dni);
    console.log('email:', user.email);
    console.log('username:', user.userName);
    console.log('Contraseña:', user.password);
    alert("Tu registro ha sido exitoso");
    this.router.navigate(['/login']);
  }
}
