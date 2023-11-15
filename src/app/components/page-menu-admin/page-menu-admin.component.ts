import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from 'src/app/services/restaurant.service/restaurant.service';

@Component({
  selector: 'app-page-menu-admin',
  templateUrl: './page-menu-admin.component.html',
  styleUrls: ['./page-menu-admin.component.css']
})
export class PageMenuAdminComponent {

  restaurants!: any[];
  constructor(private router: Router, private restaurantService: RestaurantService) {}
  ngOnInit(): void {

    this.restaurantService.getRestaurantsObservable().subscribe(
      data => {
        this.restaurants = data;
      },
      error => {
        console.error(error);
      }
    );
  }

  userId = "423de511-0560-4a98-87c2-28c50cbdb8ea";

  addRestaurant() {
    this.router.navigate(['/add-restaurant']);
  }

  addCategories() {
    this.router.navigate(['/add-categories']);
  }

  addTables() {
    this.router.navigate(['/add-tables']);
  }

}
