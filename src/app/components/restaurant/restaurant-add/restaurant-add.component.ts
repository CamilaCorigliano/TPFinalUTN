import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from 'src/app/services/restaurant.service/restaurant.service';

@Component({
  selector: 'app-restaurant-add',
  templateUrl: './restaurant-add.component.html',
  styleUrls: ['./restaurant-add.component.css']
})
export class RestaurantAddComponent {


  constructor(private route: ActivatedRoute, private restaurantService: RestaurantService) {}

  addRestaurantForm = new FormGroup({
    name: new FormControl('', Validators.required),
    adress: new FormControl('',Validators.required),
  });

  userId = "423de511-0560-4a98-87c2-28c50cbdb8ea";

  onSubmit() {

    const { name, adress } = this.addRestaurantForm.value;

    this.restaurantService.createRestaurant(this.userId, name, adress)
        .subscribe(
          response => console.log('Respuesta de la API:', response),
          error => console.error('Error de la API:', error)
        );

  }

}
