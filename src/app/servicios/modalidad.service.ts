import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Modalidad } from '../entidades/modalidad';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class ModalidadService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/modalidad';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(objeto: Object): Observable<Modalidad> {
    return this.http.post<Modalidad>(`${this.baseUrl}/registrar`, objeto, cabecera);
  }

  recuperar(id: number): Observable<Modalidad> {
    return this.http.get<Modalidad>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<Modalidad> {
    return this.http.put<Modalidad>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

}