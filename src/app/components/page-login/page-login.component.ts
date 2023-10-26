import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service/auth.service';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  
  constructor(private router: Router, public authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
  }
  

  onSubmit() {

    let user = new User();
    user.userName = this.loginForm.get('username')?.value!;
    user.password = this.loginForm.get('password')?.value!;
    console.log('Usuario:', user.userName);
    console.log('Contraseña:', user.password);
    // Puedes agregar aquí la lógica para autenticar al usuario
    //te dirige a una pagina por medio de la ruta
    this.authService.login();
    this.router.navigate(['/list-restaurants']);
  }


  studentForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dni: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl('')
  });
   
  
}
