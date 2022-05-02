import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstadoEjemplar } from '../entidades/estado-ejemplar';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class EstadoEjemplarService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/estadoEjemplar';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(documento: Object): Observable<EstadoEjemplar> {
    return this.http.post<EstadoEjemplar>(`${this.baseUrl}/registrar`, documento, cabecera);
  }

  recuperar(id: number): Observable<EstadoEjemplar> {
    return this.http.get<EstadoEjemplar>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<EstadoEjemplar> {
    return this.http.put<EstadoEjemplar>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

}