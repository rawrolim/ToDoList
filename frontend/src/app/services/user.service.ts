import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:  HttpClient,
    private cookieService: CookieService
  ) { }

  getUserLogin(email,senha){
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('senha', senha);
    console.log(this.http.get<User[]>("http://localhost:8000/api/login", { params }));
  }

  setUser(user: User): Observable<User>{
    return this.http.post<User>("http://localhost:8000/api/user", user)
  }

  getAllUsers(){
    return this.http.get<User[]>("http://localhost:8000/api/user");
  }
}
