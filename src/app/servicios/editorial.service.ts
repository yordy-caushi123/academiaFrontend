import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Editorial } from '../entidades/editorial';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class EditorialService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/editorial';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(documento: Object): Observable<Editorial> {
    return this.http.post<Editorial>(`${this.baseUrl}/registrar`, documento, cabecera);
  }

  recuperar(id: number): Observable<Editorial> {
    return this.http.get<Editorial>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<Editorial> {
    return this.http.put<Editorial>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

}