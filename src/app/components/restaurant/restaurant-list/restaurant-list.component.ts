import { Component } from '@angular/core';
import { userService } from 'src/app/services/api.service/userService';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { RestaurantService } from 'src/app/services/restaurant.service/restaurant.service';


@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent  {

  restaurants!: any[];
  isLogged!: boolean;
  constructor(private restaurantService: RestaurantService, private userservice:userService, public authservice: AuthService){}

  ngOnInit(): void {
    this.isLogged=this.authservice.isLoggedIn();
    if(this.isLogged==true){
      this.userservice.getFavorites(this.userservice.user._id).subscribe((response)=>{
        this.userservice.user._favourites=response;
      })
    }
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

  getFavorites(restaurant:any):boolean{
    let respuesta: boolean;
    if(this.userservice.user._favourites.some((rest)=>{
      if(rest==restaurant){
        return true
      }else{
        return false
      }
    })==true){
      respuesta=true;
    }else{
      respuesta=false;
    }
    return respuesta;
  }

  addToFavorites(restaurant:any){
    this.userservice.user._favourites.push(restaurant);
    this.userservice.addFavourites(this.userservice.user._id,restaurant.id).subscribe(data=>{
      console.log(data);
    });
  }

  deleteFromFavorites(restaurant:any){
    
    const index = this.userservice.user._favourites.findIndex((favRestaurant: any) => favRestaurant === restaurant);
      if (index !== -1) {
        this.userservice.user._favourites.splice(index, 1);
          this.userservice.deleteFavorites(this.userservice.user._id,restaurant.id);
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
}
