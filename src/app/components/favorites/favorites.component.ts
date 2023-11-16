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
    this.favorites=this.userService.user._favourites;
    setInterval(()=>{
      this.checkfavorites();
    },1000)
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

  addToFavorites(restaurant:any){
    if(this.authservice.isLoggedIn()==true){
    this.userService.user._favourites.push(restaurant);
    }
  }

  deleteFromFavorites(restaurant:any){
    if (this.authservice.isLoggedIn()) {
      const favorites = this.userService.user._favourites;
      const index = favorites.findIndex((favRestaurant: any) => favRestaurant === restaurant);
      if (index !== -1) {
          favorites.splice(index, 1);
      }
    }
  }



}
