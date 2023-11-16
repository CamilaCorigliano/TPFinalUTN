import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLogged!:boolean;
  constructor(public authService: AuthService) { 
  }

  ngOnInit(){
    this.isLogged=this.authService.isLoggedIn();
  }

  logout(){
    this.authService.logout();
  }

}

