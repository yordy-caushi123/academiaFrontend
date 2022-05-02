import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../entidades/alumno';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class AlumnoService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/alumno';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(objeto: Object): Observable<Alumno> {
    return this.http.post<Alumno>(`${this.baseUrl}/registrar`, objeto, cabecera);
  }

  recuperar(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

}