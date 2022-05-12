import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Escuela } from '../entidades/escuela';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class EscuelaService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/escuela';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(objeto: Object): Observable<Escuela> {
    return this.http.post<Escuela>(`${this.baseUrl}/registrar`, objeto, cabecera);
  }

  recuperar(id: number): Observable<Escuela> {
    return this.http.get<Escuela>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<Escuela> {
    return this.http.put<Escuela>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

}