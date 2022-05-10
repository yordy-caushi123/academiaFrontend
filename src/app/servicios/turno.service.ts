import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turno } from '../entidades/turno';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class TurnoService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/turno';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(objeto: Object): Observable<Turno> {
    return this.http.post<Turno>(`${this.baseUrl}/registrar`, objeto, cabecera);
  }

  recuperar(id: number): Observable<Turno> {
    return this.http.get<Turno>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<Turno> {
    return this.http.put<Turno>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

}