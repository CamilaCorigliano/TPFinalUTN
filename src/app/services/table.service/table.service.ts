
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private apiUrl = `http://3.21.41.36:3000/restaurants`;

  constructor(private http: HttpClient) { }

  createTable(restaurantId: string, tableNumber: number, capacity: number): Observable<any> {
    const data = {
      restaurant_id: restaurantId,
      tableNumber: tableNumber,
      capacity: capacity
    };

    return this.http.post<any>(`${this.apiUrl}/table`, data);
  }

}
