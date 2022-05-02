import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Biblioteca } from '../entidades/biblioteca';
import { Ejemplar } from '../entidades/ejemplar';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class EjemplarService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/ejemplar';

  constructor(private http: HttpClient) { }

  listar(nroCorre: String): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar/${nroCorre}`, cabecera);
  }

  registrar(usuario: Object): Observable<Ejemplar> {
    return this.http.post<Ejemplar>(`${this.baseUrl}/registrar`, usuario, cabecera);
  }

  recuperar(id: number): Observable<Ejemplar> {
    return this.http.get<Ejemplar>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificar(id: number, value: any): Observable<Ejemplar> {
    return this.http.put<Ejemplar>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

  reporte(reporte: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/reporteGeneral`, reporte, {responseType: "text"});
  }

}
