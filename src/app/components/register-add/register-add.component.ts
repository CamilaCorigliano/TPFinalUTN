import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service/auth.service';

@Component({
  selector: 'app-register-add',
  templateUrl: './register-add.component.html',
  styleUrls: ['./register-add.component.css']
})
export class RegisterAddComponent {
  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {

    let user = new User();
    user.userName = this.registerForm.get('username')?.value!;
    user.password = this.registerForm.get('password')?.value!;
    console.log('Usuario:', user.userName);
    console.log('Contraseña:', user.password);
    // Puedes agregar aquí la lógica para autenticar al usuario
    //te dirige a una pagina por medio de la ruta
    this.authService.login();
    this.router.navigate(['/list-restaurants']);
  }

}
