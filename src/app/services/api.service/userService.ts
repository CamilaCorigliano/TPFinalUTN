import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders} from '@angular/common/http';
import { User } from 'src/app/models/user';
import { result } from 'src/app/models/result.interface';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class userService {
  user: User;

  favourites:any[] = [];
  private apiUrl="http://3.21.41.36:3000";
  constructor(private http:HttpClient) { 
    this.user = new User({});
  }
  
 

  public getUsers(url:string):Observable<any>{
    return this.http.get<any>(this.apiUrl+url);
  }

  public getUsersEmail(email:string,password:string):Observable<any>{
    const data={
      email: email,
      password: password
    }
    return this.http.post<result>(this.apiUrl+"/users/email",data);
  }
  
  public addFavourites(userid:string,restaurantid:string):Observable<any>{
    const data={
      user_id:userid,
      restaurant_id:restaurantid
    }
    const result= this.http.post<result>(this.apiUrl+"/users/favorites",data);
    return result;
  }

  public deleteFavorites(userId:string,restaurantId:string):Observable<any>{
    const data={
      user_id: userId,
      restaurant_id: restaurantId
    }
    const result= this.http.post<result>(this.apiUrl+"/users/fav/delete",data);
    return result;
  }

  public getFavorites(userid:string):Observable<any>{
    return this.http.get<any>(this.apiUrl+"/users/favorites/get/"+userid);
  }

  public addUser(user:any):Observable<any>{
    const result =this.http.post<result>(this.apiUrl+"/users",user)
    return result;
  }
  setFavorites(data: any[]){
    this.favourites = data;
  }
}
