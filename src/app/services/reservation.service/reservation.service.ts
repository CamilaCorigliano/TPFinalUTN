import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject  } from 'rxjs';
import { Reservation } from 'src/app/models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  apiUrl: string = 'http://3.21.41.36:3000/reservations';
  userReservations: String[] = [];
  reservations: Reservation[]= [];
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

    return this.http.get<any>(`${this.apiUrl}/restaurant/${restaurant_id}`)

  }
  setReservations(data:any[]){
    this.userReservations = data;
    this.reservations = data;
    this.reservationSubject.next(this.reservations)
  }
  private reservationSubject = new Subject<any[]>();

  confirmReservation(restaurant_id:string, reservation_id:string, state:string, tables: number[]): Observable<any>{
    const data = {
      restaurant_id: restaurant_id,
      reservation_id: reservation_id,
      state: state,
      tables: tables
    }

    return this.http.post<any>(`${this.apiUrl}/confirm`,data);

  }
  getById(reservation_id:string): Observable<any>{

    return this.http.get<any>(`${this.apiUrl}/get/${reservation_id}`);

  }
  getByUser(user_id:string): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/get/user/${user_id}`);
  }

  getTablesByDate(restaurant_id:string, due_date:string): Observable<any[]>{
    const data ={
      restaurant_id: restaurant_id,
      due_date: due_date
    }
    return this.http.post<any[]>(`${this.apiUrl}/get/tables/date`, data)
  }
  cancelReservation(reservation_id: string):Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/cancell/${reservation_id}`)
  }
  
}
