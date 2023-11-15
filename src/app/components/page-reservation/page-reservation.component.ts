import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service/reservation.service';
import { Router } from '@angular/router';
import { userService } from 'src/app/services/api.service/userService';
@Component({
  selector: 'app-page-reservation',
  templateUrl: './page-reservation.component.html',
  styleUrls: ['./page-reservation.component.css']
})
export class PageReservationComponent {
  private restaurantId: string;
   reservation?: any;

  reservationForm = new FormGroup({
    date: new FormControl('', Validators.required),
    res_size: new FormControl('',Validators.required),
    comment: new FormControl(''),
    time: new FormControl('',Validators.required),
  });

  // userId = "774a3a7e-8e0c-4761-b89a-3e0429d34533";

  constructor(private route: ActivatedRoute, private reservationService: ReservationService, private router: Router, private userService: userService) {
    this.restaurantId = '';
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.restaurantId = params['id'];
  
    });
  }
  onSubmit() {
    const { date, res_size, comment, time } = this.reservationForm.value;
    console.log(this.userService.user._id)
  
    if (date !== null && date !== undefined) {
      let selectedDate: string;
      if (time !== null && time !== undefined) {
        const dateObject = new Date(date);
  
        if (time === 'noche') {
          dateObject.setHours(20);
        }
  
        selectedDate = dateObject.toISOString();
      } else {
        selectedDate = new Date(date).toISOString();
      }
  
      this.reservationService.createReservation(this.userService.user._id, this.restaurantId, Number(res_size), selectedDate, comment)
        .subscribe(
          (response) => {
            this.reservation = response;
            console.log('Respuesta de la API:', response);
  
           
            this.router.navigate(['/view-reservation', this.reservation.id]);
          },
          (error) => {
            console.error('Error de la API:', error)

          }
        );
    } else {
      console.error('El valor de "date" es nulo o indefinido.');
    }
  }
  

  
}
