import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl="http://3.21.41.36:3000/users";
  constructor(private http:HttpClient, httpheader : HttpHeaders) { }
  

  public getdata():Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }

  


}
