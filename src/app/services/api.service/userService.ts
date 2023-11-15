import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { HttpClient,HttpParams,HttpHeaders} from '@angular/common/http';
import { User } from 'src/app/models/user';
import { result } from 'src/app/models/result.interface';


@Injectable({
  providedIn: 'root'
})
export class userService {
  user: User;
  private apiUrl="http://3.21.41.36:3000";
  constructor(private http:HttpClient) { 
    this.user = new User({});
  }
  
 

  public getUsers(url:string):Observable<any>{
    return this.http.get<any>(this.apiUrl+url);
  }

  public getUsersEmail(email:string,password:string):Observable<any>{
    const data={
      email: email,
      password: password
    }
    return this.http.post<result>(this.apiUrl+"/users/email",data);
  }
  

  public addUser(user:any):Observable<any>{
    const result =this.http.post<result>(this.apiUrl+"/users",user)
    return result;
  }
}
