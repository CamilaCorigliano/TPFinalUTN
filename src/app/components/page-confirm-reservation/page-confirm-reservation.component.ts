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
  reservations!: any[];
  restaurantTables!: any[];
  reservationsAtSameTime!: any;
  tablesReserved!: any[];
  reservation!: any;
  tablesReservedNumbers: number[] = [];

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
    this.restaurantService.getTablesbyResto(this.userRestaurant.id).subscribe(
      (data) => {
        this.restaurantTables = data;
      },
      (error) => {
        console.log(`Error getting tables: ${error.message}`);
      }
    );
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
    this.reservations = this.reservationService.reservations;
    this.reservationsAtSameTime = this.reservations.filter(reservation => reservation.due_date === this.reservation.due_date);

    if (this.reservationsAtSameTime && this.reservationsAtSameTime.length > 0) {
      this.tablesReserved = this.reservationsAtSameTime[0].tables; 
      this.tablesReservedNumbers = this.tablesReserved.map(tableId => {
        const table = this.restaurantTables.find(table => table.id === tableId);
        return table ? table.number : null;
      });
    }
  }
  onSubmit(){
   
  }
}
