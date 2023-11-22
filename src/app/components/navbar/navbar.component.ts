import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { userService } from 'src/app/services/api.service/userService';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public authService: AuthService, public userService: userService) { 
    
  }
  
  checkLoginStatus() {
   
    const isLoggedIn = this.authService.isLoggedIn();
  
    if (isLoggedIn) {
      console.log('El usuario está autenticado.');
    } else {
      console.log('El usuario no está autenticado.');
    }

    console.log(this.userService);
  }
  
  logout(){
    this.authService.logout();
  }

}

