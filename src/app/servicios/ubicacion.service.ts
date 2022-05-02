import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ubicacion } from '../entidades/ubicacion';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class UbicacionService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/ubicacion';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(documento: Object): Observable<Ubicacion> {
    return this.http.post<Ubicacion>(`${this.baseUrl}/registrar`, documento, cabecera);
  }

  recuperar(id: number): Observable<Ubicacion> {
    return this.http.get<Ubicacion>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<Ubicacion> {
    return this.http.put<Ubicacion>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

}