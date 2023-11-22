import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service/reservation.service';
import { Router } from '@angular/router';
import { userService } from 'src/app/services/api.service/userService';
@Component({
  selector: 'app-page-reservation-view',
  templateUrl: './page-reservation-view.component.html',
  styleUrls: ['./page-reservation-view.component.css']
})
export class PageReservationViewComponent {
  reservation!: any;
  user!: any;

  constructor(private route: ActivatedRoute, private reservationService: ReservationService, private router: Router, private userService: userService) {}

  ngOnInit(): void {
    this.user = this.userService.user;
    console.log(this.user);
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
}
