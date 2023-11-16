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
      (data)=>{
        this.favorites=data;
      },
      (error)=>{
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
    let respuesta: boolean;
    if(this.userService.user._favourites.some((rest)=>{
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
