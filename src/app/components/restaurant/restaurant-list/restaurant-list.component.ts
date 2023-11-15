import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/apiservice';
import { RestaurantService } from 'src/app/services/restaurant.service/restaurant.service';


@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent  {

  restaurants!: any[];

  constructor(private restaurantService: RestaurantService, private apiService: ApiService){}

  ngOnInit(): void {
    this.restaurantService.getApiRestaurants().subscribe(
      data => {
        this.restaurants = data;
        this.restaurantService.setRestaurants(this.restaurants);
      },
      error => {
        console.error(error);
      }
    );

    this.restaurantService.getRestaurantsObservable().subscribe(
      data => {
        this.restaurants = data;
      },
      error => {
        console.error(error);
      }
    );
  }

  

  getStars(rating: number): number[] {
    const int = Math.floor(rating); // Parte entera del puntaje
    const decimal = rating - int;   // Parte decimal del puntaje

    // Crea un arreglo con las estrellas enteras
    let stars = Array(int).fill(1);

    // Si hay parte decimal, agrega una estrella a medias
    if (decimal > 0) {
      stars.push(0.5);
    }

    return stars;
  }
  addFav(userId: string, restaurantId: string){
    this.apiService.addFavorite(userId, restaurantId);
  }
}
