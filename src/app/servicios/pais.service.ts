import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class PaisService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/pais';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(documento: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/registrar`, documento, cabecera);
  }

  recuperar(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

}