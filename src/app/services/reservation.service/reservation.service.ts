import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  apiUrl: string = 'http://3.21.41.36:3000/reservations';
  userReservations: String[] = [];
  constructor(private http: HttpClient) { }


  createReservation(user_id: string, restaurant_id: string, res_size: number, due_date: string, comment: string | null | undefined): Observable<any> {
    const data = {
      user_id: user_id,
      restaurant_id: restaurant_id,
      res_size: res_size,
      due_date: due_date,
      comment: comment,
      state: 'toConfirm'
    };

    return this.http.post<any>(`${this.apiUrl}/create`, data);
  }

  getReservationsByResto(restaurant_id:string): Observable<any> {

    return this.http.get<any>(`${this.apiUrl}/get/${restaurant_id}`)

  }

  confirmReservation(restaurant_id:string, reservation_id:string, state:string, tables: string[]): Observable<any>{
    const data = {
      restaurant_id: reservation_id,
      reservation_id: reservation_id,
      state: state,
      tables: tables
    }

    return this.http.post<any>(`${this.apiUrl}/confirm`,data);

  }
  getById(reservation_id:string): Observable<any>{

    return this.http.get<any>(`${this.apiUrl}/get/${reservation_id}`);

  }



}
