import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Biblioteca } from '../entidades/biblioteca';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class BibliotecaService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/biblioteca';

  constructor(private http: HttpClient) { }

  listar(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  registrar(usuario: Object): Observable<Biblioteca> {
    return this.http.post<Biblioteca>(`${this.baseUrl}/registrar`, usuario, cabecera);
  }

  recuperar(id: number): Observable<Biblioteca> {
    return this.http.get<Biblioteca>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificar(id: number, value: any): Observable<Biblioteca> {
    return this.http.put<Biblioteca>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

  reporte(reporte: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/reporteGeneral`, reporte, {responseType: "text"});
  }

}