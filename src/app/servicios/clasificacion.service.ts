import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clasificacion } from '../entidades/clasificacion';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class ClasificacionService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/clasificacion';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(documento: Object): Observable<Clasificacion> {
    return this.http.post<Clasificacion>(`${this.baseUrl}/registrar`, documento, cabecera);
  }

  recuperar(id: number): Observable<Clasificacion> {
    return this.http.get<Clasificacion>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<Clasificacion> {
    return this.http.put<Clasificacion>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

}