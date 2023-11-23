
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = `http://3.21.41.36:3000/restaurants`;

  constructor(private http: HttpClient) { }

  createCategory(restaurantId: string, selectedCategories: string[]): Observable<any> {
    const data = {
      restaurant_id: restaurantId,
      categories: selectedCategories
    };

    return this.http.post<any>(`${this.apiUrl}/categories/add`, data);
  }

  deleteCategories(restaurantId: string, selectedCategories: string[]): Observable<any> {
    const data = {
      restaurant_id: restaurantId,
      categories: selectedCategories
    };

    return this.http.post<any>(`${this.apiUrl}/categories/delete`, data);
  }

}
