import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { userService } from 'src/app/services/api.service/userService';
import { AuthService } from 'src/app/services/auth.service/auth.service';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), Validators.required]),
    password: new FormControl('', Validators.minLength(6))
  });

  private user!: User;
  errordiv = "";
  errordiv2 = "";

  constructor(private router: Router, public authService: AuthService, private apiservice: userService, private fb: FormBuilder) { 
    
  }

  ngOnInit() {
  }

  get invalidEmail() {
    return this.loginForm.get('email')?.invalid && this.loginForm.get('email')?.touched;
  }

  get invalidPassword() {
    return this.loginForm.get('password')?.invalid && this.loginForm.get('password')?.touched;
  }

  onSubmit() {
    const email = this.loginForm.get('email')?.value!;
    const password = this.loginForm.get('password')?.value!;
  
    this.apiservice.getUsersEmail(email, password).subscribe(
      (data: any) => {
        if (data.message === "Login successful") {
          this.user = new User(data.user); // Crear una nueva instancia de User con los datos del servicio
          this.apiservice.getFavorites(this.user._id).subscribe(
            data=>{
             this.user._favourites = data;
             this.apiservice.user = this.user;
             this.apiservice.setFavorites(this.apiservice.favourites);
            },
            error =>{
              console.log(error);
              
            }
          )
         
          this.authService.login();
          if (this.user._role === 'client') { 
            this.router.navigate(['/list-restaurants']);
          } else {
            this.router.navigate(['/menu-admin']);
          }
        } else {
          if (data.message === 500) {
            this.errordiv2 = "El email no está registrado";
          } else {
            this.errordiv = "Contraseña incorrecta";
          }
        }
      },
      (error) => {
        console.error('Error al intentar iniciar sesión:', error);
      }
    );
  }
}

