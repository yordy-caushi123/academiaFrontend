import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asistencia } from '../entidades/asistencia';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class AsistenciaService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/asistencia';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(objeto: Object): Observable<Asistencia> {
    return this.http.post<Asistencia>(`${this.baseUrl}/registrar`, objeto, cabecera);
  }

  recuperar(id: number): Observable<Asistencia> {
    return this.http.get<Asistencia>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<Asistencia> {
    return this.http.put<Asistencia>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

} 