import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PageLoginComponent } from './components/page-login/page-login.component';
import { PageLogoutComponent } from './components/page-logout/page-logout.component';
import { RegisterAddComponent } from './components/register-add/register-add.component';
import { RestaurantListComponent } from './components/restaurant/restaurant-list/restaurant-list.component';
import { RestaurantViewComponent } from './components/restaurant/restaurant-view/restaurant-view.component';
import { PageReservationComponent } from 'src/app/components/page-reservation/page-reservation.component';
import { PageReservationViewComponent } from './components/page-reservation-view/page-reservation-view.component';

const appRoutes: Routes = [
  { path: 'login', component: PageLoginComponent },
  { path: 'register', component: RegisterAddComponent },
  { path: 'view-restaurant/:id', component: RestaurantViewComponent },
  { path: 'reserve/:id', component: PageReservationComponent},
  { path: 'view-reservation/:id', component: PageReservationViewComponent},
  { path: 'logout', component:  PageLogoutComponent}, 
  { path: 'list-restaurants', component:  RestaurantListComponent},  
  { path: '', redirectTo: '/list-restaurants', pathMatch: 'full' },
  { path: '**', component : PageNotFoundComponent },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } 
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
