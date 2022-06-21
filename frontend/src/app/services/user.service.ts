import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:  HttpClient,
    private cookieService: CookieService
  ) { }

  getUserLogin(user: User){
    let params = new HttpParams();
    params = params.append('email', user.email);
    params = params.append('password', user.password);
    
    return this.http.get<User>(environment.url+"login", {params});
  }

  setUser(user: User): Observable<User>{
    return this.http.post<User>(environment.url+"user", user)
  }

  getAllUsers(){
    return this.http.get<User[]>(environment.url+"user");
  }

  getCurrentUser(){
    let params = new HttpParams();
    params = params.append('id', this.cookieService.get("user_id"));
    return this.http.get<User>(environment.url+"user", {params});
  }
}
