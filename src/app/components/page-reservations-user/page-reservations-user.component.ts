import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userService } from 'src/app/services/api.service/userService';
import { ReservationService } from 'src/app/services/reservation.service/reservation.service';
import { RestaurantService } from 'src/app/services/restaurant.service/restaurant.service';

@Component({
  selector: 'app-page-reservations-user',
  templateUrl: './page-reservations-user.component.html',
  styleUrls: ['./page-reservations-user.component.css']
})
export class PageReservationsUserComponent implements OnInit {

  public reservations: any[] = [];
  public restaurants: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private router: Router,
    private userService: userService,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit() {
    this.reservationService.getByUser(this.userService.user._id).subscribe(
      data => {
  
        if (Array.isArray(data)) {
          this.reservations = data;
          this.reservationService.setReservations(this.reservations);
          const uniqueRestaurantIds = new Set<string>();
  
          this.reservations.forEach(reservation => {
            if (!uniqueRestaurantIds.has(reservation.restaurant_id)) {
              uniqueRestaurantIds.add(reservation.restaurant_id);
  
              this.restaurantService.getApiRestaurantsById(reservation.restaurant_id).subscribe(
                restaurantData => {
                  this.restaurants.push(restaurantData);
                },
                error => {
                  console.log(`Error getting restaurantInfo: ${error.message}`);
                }
              );
            }
          });
        } else {
          console.error('La respuesta no es un array:', data);
        }
      },
      error => {
        console.log(`Error getting reservations: ${error.message}`);
      }
    );
  }
  cancelReservation(reservation_id: string){
    this.reservationService.cancelReservation(reservation_id).subscribe(
      data => {
        console.log(data);
       this.reservationService.getByUser(this.userService.user._id).subscribe(
        data => {
          this.reservations = data;
        },
        error => {
          console.log(error);
        }
       )
        
      },
      error=> {
        console.log(error);
      }
    )
  }
  
  
}
