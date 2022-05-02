import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModoIngreso } from '../entidades/modo-ingreso';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class ModoIngresoService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/modoIngreso';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(documento: Object): Observable<ModoIngreso> {
    return this.http.post<ModoIngreso>(`${this.baseUrl}/registrar`, documento, cabecera);
  }

  recuperar(id: number): Observable<ModoIngreso> {
    return this.http.get<ModoIngreso>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<ModoIngreso> {
    return this.http.put<ModoIngreso>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

}