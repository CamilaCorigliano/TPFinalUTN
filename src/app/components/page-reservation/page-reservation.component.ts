import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-page-reservation',
  templateUrl: './page-reservation.component.html',
  styleUrls: ['./page-reservation.component.css']
})
export class PageReservationComponent {
  constructor(private route: ActivatedRoute){}
  reservationForm = new FormGroup({
    date: new FormControl(''),
    res_size: new FormControl(''),
    comment: new FormControl('')
  })
ngOnInit(){
  this.route.params.subscribe(params =>{
    const restaurantId = params['id'];
    console.log(restaurantId)
  })
}
onSubmit() {

}

}
