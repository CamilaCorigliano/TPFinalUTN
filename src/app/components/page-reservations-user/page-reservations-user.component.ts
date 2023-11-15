import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userService } from 'src/app/services/api.service/userService';
import { ReservationService } from 'src/app/services/reservation.service/reservation.service';
import { RestaurantService } from 'src/app/services/restaurant.service/restaurant.service';
import { Reservation } from 'src/app/models/reservation';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-reservations-user',
  templateUrl: './page-reservations-user.component.html',
  styleUrls: ['./page-reservations-user.component.css']
})
export class PageReservationsUserComponent implements OnInit {

  public reservations$: Observable<Reservation[]> = new Observable<Reservation[]>();

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private restaurantService: RestaurantService,
    private router: Router,
    private userService: userService
  ) { }

  ngOnInit() {
    this.reservations$ = this.reservationService.getByUser(this.userService.user._id);
    this.reservations$.subscribe(reservations => {
      console.log(reservations);
    });
  }
}
