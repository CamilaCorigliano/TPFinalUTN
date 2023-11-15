import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TPFinalUTN';
  showNavbar: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (this.router.url === '/login' || this.router.url === '/register' || this.router.url === '/menu-admin') {
        // Estás en la página de login o en la de registro
        this.showNavbar = false; // 
      } else {
        // No estás en la página de login 
        this.showNavbar = true;
      }
    });
  }
}
