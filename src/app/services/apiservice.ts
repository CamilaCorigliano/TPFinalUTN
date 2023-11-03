import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl="http://3.21.41.36:3000/users";
  constructor(private http:HttpClient) { }
  

  public getdata():Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }

  

  


}
