import { Component } from '@angular/core';
import { userService } from 'src/app/services/api.service/userService';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { RestaurantService } from 'src/app/services/restaurant.service/restaurant.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  favorites:any[]=[];

  constructor(private userService:userService, private authservice:AuthService){}

  ngOnInit(){
    this.userService.getFavorites(this.userService.user._id).subscribe(
      data=> {
        this.favorites = data
        this.userService.user._favourites = this.favorites
        console.log(this.favorites)
        console.log(this.userService.user._favourites)
      },
      error => {
        console.log(error);
        
      }
    )
  }
  
  checkfavorites():boolean{
    if(this.favorites.length==0){
      return true;
    }else{
      return false;
    }
  }

  getFavorites(restaurant:any):boolean{
    return this.userService.user._favourites.some(rest=>rest===restaurant);
  }

  deleteFromFavorites(restaurantId: string){
    this.userService.deleteFavorites(this.userService.user._id, restaurantId).subscribe(
      data =>{
        console.log(data);
        this.userService.getFavorites(this.userService.user._id).subscribe(
          data =>{
            this.favorites = data;
            this.userService.user._favourites = data;
          },
          error=>{
            console.log(error);
            
          }
        )
      },
      error=> {
        console.log(error);
      }
    )
   }
  



}
