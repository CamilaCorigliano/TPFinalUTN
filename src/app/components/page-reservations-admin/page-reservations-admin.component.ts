import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { userService } from 'src/app/services/api.service/userService';
import { RestaurantService } from 'src/app/services/restaurant.service/restaurant.service';

@Component({
  selector: 'app-page-reservations-admin',
  templateUrl: './page-reservations-admin.component.html',
  styleUrls: ['./page-reservations-admin.component.css']
})
export class PageReservationsAdminComponent implements OnInit {
  public reservations: any[] = [];
  public restaurant_id: any;

  constructor(
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private userService: userService,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit() {
    if (this.userService.user && this.restaurantService.restaurants) {
      const userRestaurant = this.restaurantService.restaurants.find(
        (restaurant) => restaurant.manager_id === this.userService.user._id
      );

      if (userRestaurant) {
        this.restaurant_id = userRestaurant.id;

        this.reservationService.getReservationsByResto(this.restaurant_id).subscribe(
          (data) => {
            this.reservations = data;
          },
          (error) => {
            console.log(`Error getting reservations: ${error.message}`);
          }
        );
      } else {
        console.log('No se encontró un restaurante para el usuario actual.');
      }
    } else {
      console.log('Error: Usuario o restaurantes no definidos.');
    }
  }
}
