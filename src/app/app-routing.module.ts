import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PageLoginComponent } from './components/page-login/page-login.component';
import { RegisterAddComponent } from './components/register-add/register-add.component';
import { RestaurantListComponent } from './components/restaurant/restaurant-list/restaurant-list.component';
import { RestaurantViewComponent } from './components/restaurant/restaurant-view/restaurant-view.component';
import { PageReservationComponent } from 'src/app/components/page-reservation/page-reservation.component';
import { PageMenuAdminComponent } from './components/page-menu-admin/page-menu-admin.component';
import { RestaurantAddComponent } from './components/restaurant/restaurant-add/restaurant-add.component';
import { CategoryAddComponent } from './components/categories/category-add/category-add.component';
import { PageReservationViewComponent } from './components/page-reservation-view/page-reservation-view.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { TableAddComponent } from './components/tables/table-add/table-add.component';
import { PageReservationsUserComponent } from './components/page-reservations-user/page-reservations-user.component';
import { PageReservationsAdminComponent } from './components/page-reservations-admin/page-reservations-admin.component';
import { PageConfirmReservationComponent } from './components/page-confirm-reservation/page-confirm-reservation.component';
import { authGuard } from './auth.guard';
import { adminGuard } from './admin.guard';

const appRoutes: Routes = [
  { path: 'login', component: PageLoginComponent },
  { path: 'register', component: RegisterAddComponent },
  { path: 'list-restaurants', component:  RestaurantListComponent},       
  { path: 'favorites', component:  FavoritesComponent},  
  { path: 'view-restaurant/:id',canActivate:[authGuard], component: RestaurantViewComponent},
  { path: 'reserve/:id',canActivate:[authGuard], component: PageReservationComponent},
  { path: 'view-reservation/:id',canActivate:[authGuard], component : PageReservationViewComponent},                            
  { path: 'reservations-admin',canActivate:[adminGuard], component: PageReservationsAdminComponent },
  { path: 'menu-admin',canActivate:[adminGuard], component:  PageMenuAdminComponent},
  { path: 'confirm-reservation/:id',canActivate:[adminGuard], component: PageConfirmReservationComponent},// se le pasa el id de reservation
  { path: 'reservations-user',canActivate:[authGuard], component: PageReservationsUserComponent},
  { path: 'add-restaurant',canActivate:[adminGuard], component:  RestaurantAddComponent},
  { path: 'add-categories',canActivate:[adminGuard], component:  CategoryAddComponent},
  { path: 'add-tables',canActivate:[adminGuard], component:  TableAddComponent},      
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component : PageNotFoundComponent },
]


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
