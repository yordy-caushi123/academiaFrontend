import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Periodo } from '../entidades/periodo';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class PeriodoService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/periodo';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(documento: Object): Observable<Periodo> {
    return this.http.post<Periodo>(`${this.baseUrl}/registrar`, documento, cabecera);
  }

  recuperar(id: number): Observable<Periodo> {
    return this.http.get<Periodo>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<Periodo> {
    return this.http.put<Periodo>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

}