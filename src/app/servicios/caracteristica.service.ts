import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Caracteristica } from '../entidades/caracteristica';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class CaracteristicaService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/caracteristica';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(documento: Object): Observable<Caracteristica> {
    return this.http.post<Caracteristica>(`${this.baseUrl}/registrar`, documento, cabecera);
  }

  recuperar(id: number): Observable<Caracteristica> {
    return this.http.get<Caracteristica>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<Caracteristica> {
    return this.http.put<Caracteristica>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

}