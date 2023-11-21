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
    this.favorites=this.userService.user._favourites
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

  deleteFromFavorites(restaurant:any){
    const index = this.userService.user._favourites.findIndex((favRestaurant: any) => favRestaurant === restaurant);
      if (index !== -1) {
        this.userService.user._favourites.splice(index, 1);
        this.userService.deleteFavorites(this.userService.user._id,restaurant.id).subscribe(data=>{
          console.log(data);
        });
      }
   }
  



}
