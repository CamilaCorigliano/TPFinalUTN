import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  
  private apiUrl = 'http://3.21.41.36:3000/restaurants';
  private originalRestaurants: any[] = [];
  restaurants: any[] = [];
  
  constructor(private http: HttpClient) { }

  getApiRestaurants(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }

  getRestaurants() {
    return this.restaurants;
  }

  setRestaurants(data: any[]) {
    this.originalRestaurants = data;  // Asegúrate de inicializar originalRestaurants
    this.restaurants = data;  // También asigna data a restaurants
    this.restaurantsSubject.next(this.restaurants); // Emitir los cambios
  }

  private restaurantsSubject = new Subject<any[]>();

  getRestaurantsObservable(): Observable<any[]> {
    return this.restaurantsSubject.asObservable();
  }

  applyFilters(searchTerm: string) {

    this.restaurants = this.originalRestaurants.filter(restaurant =>
      restaurant.name.includes(searchTerm)
    );

    this.restaurantsSubject.next(this.restaurants); // Emitir los cambios
  }

  restoreOriginalList() {
    this.restaurants = this.originalRestaurants.slice();
    this.restaurantsSubject.next(this.restaurants); // Emitir los cambios
  }
  


}
