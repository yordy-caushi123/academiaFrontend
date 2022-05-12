import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Egreso } from '../entidades/egreso';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class EgresoService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/egreso';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(objeto: Object): Observable<Egreso> {
    return this.http.post<Egreso>(`${this.baseUrl}/registrar`, objeto, cabecera);
  }

  recuperar(id: number): Observable<Egreso> {
    return this.http.get<Egreso>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<Egreso> {
    return this.http.put<Egreso>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

}