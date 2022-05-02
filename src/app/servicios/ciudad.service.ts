import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ciudad } from '../entidades/ciudad';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class CiudadService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/ciudad';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(documento: Object): Observable<Ciudad> {
    return this.http.post<Ciudad>(`${this.baseUrl}/registrar`, documento, cabecera);
  }

  recuperar(id: number): Observable<Ciudad> {
    return this.http.get<Ciudad>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<Ciudad> {
    return this.http.put<Ciudad>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

}