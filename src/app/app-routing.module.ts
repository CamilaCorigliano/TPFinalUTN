import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PageLoginComponent } from './components/page-login/page-login.component';
import { PageLogoutComponent } from './components/page-logout/page-logout.component';
import { RegisterAddComponent } from './components/register-add/register-add.component';
import { RestaurantListComponent } from './components/restaurant/restaurant-list/restaurant-list.component';


const appRoutes: Routes = [
  { path: 'login', component: PageLoginComponent },
  { path: 'register', component: RegisterAddComponent },
//  { path: 'view/:id', component: StudentViewComponent },
  { path: 'logout', component:  PageLogoutComponent}, 
  { path: 'list-restaurants', component:  RestaurantListComponent},  
  { path: '', redirectTo: '/logout', pathMatch: 'full' },
  { path: '**', component : PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
