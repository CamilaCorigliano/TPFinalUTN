import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant';

@Component({
  selector: 'app-restaurant-view',
  templateUrl: './restaurant-view.component.html',
  styleUrls: ['./restaurant-view.component.css']
})
export class RestaurantViewComponent {

  restaurant = new Restaurant();

  constructor(private route: ActivatedRoute) {
    this.restaurant.name = "Manolo Centro"; 
    this.restaurant.address = "Santa Fe 1900";
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const restaurantId = params['id']; 
      console.log("id restaurant", restaurantId);
    });
  }

}
