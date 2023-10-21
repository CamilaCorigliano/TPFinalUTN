import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PageLoginComponent } from './components/page-login/page-login.component';
import { PageLogoutComponent } from './components/page-logout/page-logout.component';
import { RegisterAddComponent } from './components/register-add/register-add.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    PageLoginComponent,
    PageLogoutComponent,
    RegisterAddComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  showNavbar: boolean | undefined; 

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (this.router.url === '/login') {
        // Estás en la página de login
        this.showNavbar = false; // Suponiendo que showNavbar es una variable que controla la visibilidad del Navbar
      } else {
        // No estás en la página de login
        this.showNavbar = true;
      }
    });
  }
}
