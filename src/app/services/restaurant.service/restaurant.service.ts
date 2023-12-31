
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
  private restaurantsSubject = new Subject<any[]>();

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

  

  getRestaurantsObservable(): Observable<any[]> {
    return this.restaurantsSubject.asObservable();
  }

  applyFilters(searchTerm: string, selectedCategories: string[]) {

    if (searchTerm === '' && selectedCategories.length === 0) {
      this.restaurants = this.originalRestaurants.slice();
      this.restaurantsSubject.next(this.restaurants);
      return;
    }
    // Si no hay categorías seleccionadas, pero hay un término de búsqueda, filtrar por nombre
    if (selectedCategories.length === 0 && searchTerm !== '') {
      const filteredRestaurantsByName = this.originalRestaurants.filter(restaurant =>
        this.matchesSearchTerm(restaurant, searchTerm)
      );
  
      if (filteredRestaurantsByName.length > 0) {
        this.restaurants = filteredRestaurantsByName;
        this.restaurantsSubject.next(this.restaurants);
      } else {
        // Si no hay resultados después de filtrar por nombre, mostrar toda la lista original
        this.restaurants = this.originalRestaurants.slice();
        this.restaurantsSubject.next(this.restaurants);
      }
      return;
    }
  
    const lastSelectedCategory = selectedCategories[selectedCategories.length - 1] || '';
  
    // Verificar si hay al menos un restaurante con la última categoría seleccionada
    const hasRestaurantWithLastCategory = this.restaurants.some(restaurant =>
      this.hasCategory(restaurant, lastSelectedCategory)
    );
  
    if (!hasRestaurantWithLastCategory) {
      this.clearList();
      return;
    }
  
    const filteredRestaurants = this.originalRestaurants.filter(restaurant =>
      this.matchesSearchTerm(restaurant, searchTerm) &&
      (selectedCategories.length === 0 || selectedCategories.every(category => this.hasCategory(restaurant, category)))
    );
    
    if (filteredRestaurants.length > 0) {
      this.restaurants = filteredRestaurants;
      this.restaurantsSubject.next(this.restaurants);
    } else {
      // Si no hay resultados después de aplicar los filtros, mostrar toda la lista original
      this.restaurants = this.originalRestaurants.slice();
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
