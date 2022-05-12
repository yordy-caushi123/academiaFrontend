import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingreso } from '../entidades/ingreso';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class IngresoService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/ingreso';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(objeto: Object): Observable<Ingreso> {
    return this.http.post<Ingreso>(`${this.baseUrl}/registrar`, objeto, cabecera);
  }

  recuperar(id: number): Observable<Ingreso> {
    return this.http.get<Ingreso>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<Ingreso> {
    return this.http.put<Ingreso>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

}