import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoIngreso } from '../entidades/tipoIngreso';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class TipoIngresoService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/tipoingreso';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(objeto: Object): Observable<TipoIngreso> {
    return this.http.post<TipoIngreso>(`${this.baseUrl}/registrar`, objeto, cabecera);
  }

  recuperar(id: number): Observable<TipoIngreso> {
    return this.http.get<TipoIngreso>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<TipoIngreso> {
    return this.http.put<TipoIngreso>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

}