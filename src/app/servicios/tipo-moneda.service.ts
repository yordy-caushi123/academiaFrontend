import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoMoneda } from '../entidades/tipo-moneda';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class TipoMonedaService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/tipoMoneda';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(documento: Object): Observable<TipoMoneda> {
    return this.http.post<TipoMoneda>(`${this.baseUrl}/registrar`, documento, cabecera);
  }

  recuperar(id: number): Observable<TipoMoneda> {
    return this.http.get<TipoMoneda>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<TipoMoneda> {
    return this.http.put<TipoMoneda>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

}