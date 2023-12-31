import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { userService } from 'src/app/services/api.service/userService';
import { RestaurantService } from 'src/app/services/restaurant.service/restaurant.service';

@Component({
  selector: 'app-page-menu-admin',
  templateUrl: './page-menu-admin.component.html',
  styleUrls: ['./page-menu-admin.component.css']
})
export class PageMenuAdminComponent {

  restaurants!: any[];
  userRestaurant!:any;

  constructor(private router: Router, private restaurantService: RestaurantService, private userService: userService) { }

  ngOnInit(): void {
    this.restaurantService.getApiRestaurants
    ().subscribe(
      data => {
        this.restaurants = data;
        this.restaurantService.setRestaurants(this.restaurants);
        if (this.userService.user && this.restaurants) {
          this.userRestaurant = this.restaurants.find(
            (restaurant) => restaurant.manager_id === this.userService.user._id
          );
        }
      },
      error => {
        console.error(error);
      }
    );


  }

  performOperationsDependingOnRestaurantId() {
    this.viewReservations();
  }
  addRestaurant() {
    this.router.navigate(['/add-restaurant']);
  }

  addCategories() {
    this.router.navigate([`/add-categories`]);

  }

  addTables() {
    this.router.navigate(['/add-tables']);
  }

  viewReservations() {
    this.router.navigate([`/reservations-admin`]);
  }
}
