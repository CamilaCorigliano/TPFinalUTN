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
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select'
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PageLoginComponent } from './components/page-login/page-login.component';
import { RegisterAddComponent } from './components/register-add/register-add.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RestaurantListComponent } from './components/restaurant/restaurant-list/restaurant-list.component';
import { PageFiltersComponent } from './components/page-filters/page-filters.component';
import { RestaurantService } from './services/restaurant.service/restaurant.service';
import { NameFilterPipe } from './name-filter.pipe';
import { RestaurantViewComponent } from './components/restaurant/restaurant-view/restaurant-view.component';
import { PageReservationComponent } from './components/page-reservation/page-reservation.component';
import { PageMenuAdminComponent } from './components/page-menu-admin/page-menu-admin.component';
import { RestaurantAddComponent } from './components/restaurant/restaurant-add/restaurant-add.component';
import { CategoryAddComponent } from './components/categories/category-add/category-add.component';
import { PageReservationViewComponent } from './components/page-reservation-view/page-reservation-view.component';
import { TableAddComponent } from './components/tables/table-add/table-add.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    PageLoginComponent,
    RegisterAddComponent,
    NavbarComponent,
    RestaurantListComponent,
    PageFiltersComponent,
    NameFilterPipe,
    RestaurantViewComponent,
    PageReservationComponent,
    PageMenuAdminComponent,
    RestaurantAddComponent,
    CategoryAddComponent,
    PageReservationViewComponent,
    TableAddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  providers: [RestaurantService],
  bootstrap: [AppComponent],
})
export class AppModule {
  showNavbar!: boolean;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (this.router.url === '/login') {
        this.showNavbar = false; 
      } else {

        this.showNavbar = true;
      }
    });
  }
}
