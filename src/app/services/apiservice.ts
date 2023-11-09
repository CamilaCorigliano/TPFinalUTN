import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { result } from '../models/result.interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl="http://3.21.41.36:3000";
  constructor(private http:HttpClient) { }
  

  public getUsers():Observable<any>{
    return this.http.get<any>(this.apiUrl+"/users");
  }

  public addUser(user:any):Observable<any>{
    return this.http.post<result>(this.apiUrl+"/users",user);
  }


  


}
