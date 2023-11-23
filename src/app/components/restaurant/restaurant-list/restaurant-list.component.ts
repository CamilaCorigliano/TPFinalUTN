import { Component } from '@angular/core';
import { userService } from 'src/app/services/api.service/userService';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { ApiService } from 'src/app/services/apiservice';
import { RestaurantService } from 'src/app/services/restaurant.service/restaurant.service';


@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent  {

  restaurants!: any[];
  isLogged!: boolean;
 
  constructor(private restaurantService: RestaurantService, private userservice:userService, public authservice: AuthService, private apiService: ApiService){}


  ngOnInit(): void {
  //   this.userservice.getFavorites(this.userservice.user._id).subscribe(
  //     data => {
  //         this.favorites = data;
  //         this.userservice.user._favourites = data;
  //         this.userservice.setFavorites(this.favorites);
  //     },
  //     error => {
  //         console.log(error);
  //     }
  // );
    this.isLogged=this.authservice.isLoggedIn();
    this.restaurantService.getApiRestaurants().subscribe(
      data => {
        this.restaurants = data;
        this.restaurantService.setRestaurants(this.restaurants);
        console.log(this.restaurants);
        
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
  isFavorite(restaurantId: string): boolean {
    if (this.userservice.user._favourites) {
      return this.userservice.user._favourites.some((favRestaurant: any) => favRestaurant.restaurant_id === restaurantId);
    }
    return false;
  }
  
  addToFavorites(restaurant:any){
    
    this.userservice.addFavourites(this.userservice.user._id, restaurant.id).subscribe(
      data=>{
        this.userservice.getFavorites(this.userservice.user._id).subscribe(
          data=>{
            this.userservice.user._favourites = data;
          },
          error =>{
            console.log(error);
            
          }
        )
      this.userservice.user._favourites.push(restaurant);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteFromFavorites(idRestaurant:any){

    const index = this.userservice.user._favourites.findIndex((favRestaurant: any) => favRestaurant.restaurant_id === idRestaurant);
      if (index !== -1) {
        this.userservice.user._favourites.splice(index, 1);
          this.userservice.deleteFavorites(this.userservice.user._id, idRestaurant).subscribe(data=>console.log(data)
          );
      }
      
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

  getRandomStars(): number {
    return Math.floor(Math.random() * 10) / 2 + 0.5;
  }

  addFav(userId: string, restaurantId: string){
    this.apiService.addFavorite(userId, restaurantId);
  }

  getRestaurantRanting(restaurantName: string): number {
    switch (restaurantName) {
      case 'Manolo Centro ':
        return 4.5;

      case 'Banderita Parrilla':
        return 4.5;

      case 'Pacifico':
        return 4.5;

      case 'Mostaza Costa':
        return 4.0;
      
      case 'La Corona':
        return 3.0;

      default:
        return 5.0;
    }
    
  }
}
