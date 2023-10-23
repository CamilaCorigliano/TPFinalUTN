import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent {

  user = new User();
  
  constructor(private router: Router) { }

  onSubmit() {
    console.log('Usuario:', this.user.userName);
    console.log('Contraseña:', this.user.password);
    // Puedes agregar aquí la lógica para autenticar al usuario
    //te dirige a una pagina por medio de la ruta
    this.router.navigate(['/list-restaurants']);
  }

}
