import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userService } from 'src/app/services/api.service/userService';
import { ReservationService } from 'src/app/services/reservation.service/reservation.service';
import { RestaurantService } from 'src/app/services/restaurant.service/restaurant.service';
import { Reservation } from 'src/app/models/reservation';

@Component({
  selector: 'app-page-reservations-user',
  templateUrl: './page-reservations-user.component.html',
  styleUrls: ['./page-reservations-user.component.css']
})
export class PageReservationsUserComponent implements OnInit {

  public reservations: Reservation[] = [];

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private router: Router,
    private userService: userService,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.reservationService.getByUser(this.userService.user._id).subscribe(
      data => {
        this.reservations = data;
        this.reservationService.setReservations(this.reservations)
      },
      error => {
        console.log(error);
      }
    );
  }

}
