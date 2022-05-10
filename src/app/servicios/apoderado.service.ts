import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apoderado } from '../entidades/apoderado';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class ApoderadoService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/apoderado';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(objeto: Object): Observable<Apoderado> {
    return this.http.post<Apoderado>(`${this.baseUrl}/registrar`, objeto, cabecera);
  }

  recuperar(id: number): Observable<Apoderado> {
    return this.http.get<Apoderado>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<Apoderado> {
    return this.http.put<Apoderado>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

}