import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sede } from '../entidades/sede';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class SedeService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/sede';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(objeto: Object): Observable<Sede> {
    return this.http.post<Sede>(`${this.baseUrl}/registrar`, objeto, cabecera);
  }

  recuperar(id: number): Observable<Sede> {
    return this.http.get<Sede>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<Sede> {
    return this.http.put<Sede>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

}