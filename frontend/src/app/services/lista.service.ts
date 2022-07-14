import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Lista } from '../models/lista';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  constructor(
    private http:  HttpClient,
    private cookieService: CookieService
  ) { }

  setLista(lista: Lista): Observable<Lista>{
    return this.http.post<Lista>(environment.url+"lista", lista)
  }

  getAllListaActive(){
    let params = new HttpParams();
    params = params.append('user_id', this.cookieService.get('user_id') );

    return this.http.get<Lista[]>(environment.url+"listaUserActive", {params})
  }

  getAllListaInactive(){
    let params = new HttpParams();
    params = params.append('user_id', this.cookieService.get('user_id') );

    return this.http.get<Lista[]>(environment.url+"listaUserInactive", {params})
  }

  getLista(lista: Lista){
    return this.http.get<Lista>(environment.url+"lista/"+lista.id)
  }

  Update(lista: Lista){
    return this.http.put(environment.url+"lista/"+lista.id, lista)
  }

  Delete(id){
    return this.http.delete(environment.url+"lista/"+id)
  }
}
