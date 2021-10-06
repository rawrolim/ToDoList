import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Lista } from '../models/lista';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  constructor(
    private http:  HttpClient,
    private cookieService: CookieService
  ) { }

  setLista(lista: Lista): Observable<Lista>{
    return this.http.post<Lista>("http://localhost:8000/api/lista", lista)
  }

  getAllLista(){
    let params = new HttpParams();
    params = params.append('user_id', this.cookieService.get('user_id') );

    return this.http.get<Lista[]>("http://localhost:8000/api/listaUser", {params})
  }

  getLista(lista: Lista){
    let params = new HttpParams();
    params = params.append('id', lista.id);

    return this.http.get<Lista[]>("http://localhost:8000/api/lista", {params})

  }
}
