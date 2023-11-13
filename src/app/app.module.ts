import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';


// Importaciones de Angular Material
import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatInputModule } from '@angular/material/input';
// import { MatNativeDateModule } from '@angular/material/core';


import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PageLoginComponent } from './components/page-login/page-login.component';
import { PageLogoutComponent } from './components/page-logout/page-logout.component';
import { RegisterAddComponent } from './components/register-add/register-add.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RestaurantListComponent } from './components/restaurant/restaurant-list/restaurant-list.component';
import { PageFiltersComponent } from './components/page-filters/page-filters.component';
import { RestaurantService } from './services/restaurant.service/restaurant.service';
import { NameFilterPipe } from './name-filter.pipe';
import { RestaurantViewComponent } from './components/restaurant/restaurant-view/restaurant-view.component';
import { PageReservationComponent } from './components/page-reservation/page-reservation.component';

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
    NameFilterPipe,
    RestaurantViewComponent,
    PageReservationComponent,
    MatDatepickerModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

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