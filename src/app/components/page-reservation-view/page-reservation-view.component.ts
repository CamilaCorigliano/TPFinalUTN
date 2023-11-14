import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service/reservation.service';

@Component({
  selector: 'app-page-reservation-view',
  templateUrl: './page-reservation-view.component.html',
  styleUrls: ['./page-reservation-view.component.css']
})
export class PageReservationViewComponent {
  reservation!: any;

  constructor(private route: ActivatedRoute, private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const reservationId = params['id'];
      this.reservationService.getById(reservationId).subscribe(
        data => {
          this.reservation = data;
          console.log(this.reservation); 
        },
        error => {
          console.log(error);
        }
      );
    });
  }
}
