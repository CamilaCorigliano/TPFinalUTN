
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private apiUrl = `http://3.21.41.36:3000/restaurants`;
  private originalRestaurants: any[] = [];
  restaurants: any[] = [];

  constructor(private http: HttpClient) { }

  getApiRestaurants(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getApiRestaurantsById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/id/${id}`);
  }

  getRestaurants() {
    return this.restaurants;
  }

  setRestaurants(data: any[]) {
    this.originalRestaurants = data;
    this.restaurants = data;
    this.restaurantsSubject.next(this.restaurants);
  }

  private restaurantsSubject = new Subject<any[]>();

  getRestaurantsObservable(): Observable<any[]> {
    return this.restaurantsSubject.asObservable();
  }

  applyFilters(searchTerm: string, selectedCategories: string[]) {
    const lastSelectedCategory = selectedCategories[selectedCategories.length - 1] || '';

    // Verificar si hay al menos un restaurante con la última categoría seleccionada
    const hasRestaurantWithLastCategory = this.originalRestaurants.some(restaurant =>
      this.hasCategory(restaurant, lastSelectedCategory)
    );

    if (!hasRestaurantWithLastCategory) {
      this.clearList();
      return;
    }

    const filteredRestaurants = this.originalRestaurants.filter(restaurant =>
      this.matchesSearchTerm(restaurant, searchTerm) &&
      this.hasAnySelectedCategory(restaurant, selectedCategories)
    );

    if (filteredRestaurants.length > 0) {
      this.restaurants = filteredRestaurants;
      this.restaurantsSubject.next(this.restaurants);
    }
  }

  private hasCategory(restaurant: any, category: string): boolean {

    return restaurant.categories.includes(category);
  }


  clearList() {
    this.restaurants = [];
    this.restaurantsSubject.next(this.restaurants);
  }

  matchesSearchTerm(restaurant: any, searchTerm: string): boolean {
    return restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
  }

  hasAnySelectedCategory(restaurant: any, selectedCategories: string[]): boolean {
    if (selectedCategories.length === 0) {
      return true;
    }
    return selectedCategories.some(category => restaurant.categories.includes(category));
  }

  restoreOriginalList() {
    this.restaurants = this.originalRestaurants.slice();
    this.restaurantsSubject.next(this.restaurants);
  }

  createRestaurant(user_id: string, name: string | null | undefined, adress: string | null | undefined): Observable<any> {
    const data = {
      manager_id: user_id,
      name: name,
      adress: adress
    };

    return this.http.post<any>(`${this.apiUrl}`, data);
  }
  getTablesbyResto(restaurant_id: string) {
    return this.http.get<any>(`${this.apiUrl}/tables/${restaurant_id}`)
  }

}
