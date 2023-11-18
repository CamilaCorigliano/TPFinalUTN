import { Component } from '@angular/core';
import { userService } from 'src/app/services/api.service/userService';
import { ReservationService } from 'src/app/services/reservation.service/reservation.service';
import { RestaurantService } from 'src/app/services/restaurant.service/restaurant.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-page-confirm-reservation',
  templateUrl: './page-confirm-reservation.component.html',
  styleUrls: ['./page-confirm-reservation.component.css']
})
export class PageConfirmReservationComponent {
  userRestaurant!: any;
  tablesReserved!: any[];
  reservation!: any;
 

  confirmationForm  = new FormGroup({
    table: new FormControl('', Validators.required)
  });

  constructor(private userService: userService, private restaurantService: RestaurantService, private reservationService: ReservationService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    if (this.userService.user && this.restaurantService.restaurants) {
      this.userRestaurant = this.restaurantService.restaurants.find(
        (restaurant) => restaurant.manager_id === this.userService.user._id
      );
    }
    
    this.route.params.subscribe(params => {
      const reservationId = params['id'];
      this.reservationService.getById(reservationId).subscribe(
        data => {
          this.reservation = data;
        },
        error => {
          console.log(error);
        }
      );
    });
    

   

  
 
    
  }
  onSubmit(){
   
  }
}
