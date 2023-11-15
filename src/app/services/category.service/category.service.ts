
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = `http://3.21.41.36:3000/restaurants`;

  constructor(private http: HttpClient) { }

  createCategory(restaurantId: string, category: string | null | undefined): Observable<any> {
    const data = {
      restaurant_id: restaurantId,
      categorie: category
    };

    return this.http.post<any>(`${this.apiUrl}/create/categorie`, data);
  }

}
