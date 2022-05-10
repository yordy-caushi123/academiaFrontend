import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlumnoApoderado } from '../entidades/alumnoApoderado';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class AlumnoApoderadoService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/alumnoapoderado';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(objeto: Object): Observable<AlumnoApoderado> {
    return this.http.post<AlumnoApoderado>(`${this.baseUrl}/registrar`, objeto, cabecera);
  }

  recuperar(id: number): Observable<AlumnoApoderado> {
    return this.http.get<AlumnoApoderado>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<AlumnoApoderado> {
    return this.http.put<AlumnoApoderado>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

  recuperarPorIdAlumno(id: number): Observable<AlumnoApoderado> {
    return this.http.get<AlumnoApoderado>(`${this.baseUrl}/recuperarPorIdAlumno/${id}`, cabecera);
  }

}