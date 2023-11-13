import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-reservation',
  templateUrl: './page-reservation.component.html',
  styleUrls: ['./page-reservation.component.css']
})
export class PageReservationComponent {

  reservationForm = new FormGroup({
    date: new FormControl(''),
    res_size: new FormControl(''),
    comment: new FormControl(''),
    time: new FormControl(''),
  });

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const restaurantId = params['id'];
      console.log(restaurantId);
    });
  }

  onSubmit() {
    // Implement your form submission logic here
    console.log(this.reservationForm.value);
  }
}
