import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PageLoginComponent } from './components/page-login/page-login.component';
import { PageLogoutComponent } from './components/page-logout/page-logout.component';
import { RegisterAddComponent } from './components/register-add/register-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RestaurantListComponent } from './components/restaurant/restaurant-list/restaurant-list.component';
import { PageFiltersComponent } from './components/page-filters/page-filters.component';
import { HttpClientModule } from '@angular/common/http';
import { RestaurantService } from './services/restaurant.service/restaurant.service';
import { NameFilterPipe } from './name-filter.pipe';


@NgModule({
  
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    PageLoginComponent,
    PageLogoutComponent,
    RegisterAddComponent,
    NavbarComponent,
    RestaurantListComponent,
    PageFiltersComponent,
    NameFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [RestaurantService],
  bootstrap: [AppComponent]
})
export class AppModule {
  showNavbar!: boolean; 

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
