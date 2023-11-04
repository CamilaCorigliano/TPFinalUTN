import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  
  private apiUrl = 'http://3.21.41.36:3000/restaurants';
  constructor(private http: HttpClient) { }

  getRestaurants(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }


}
