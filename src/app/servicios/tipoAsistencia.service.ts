import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoAsistencia } from '../entidades/tipoAsistencia';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class TipoAsistenciaService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/tipoasistencia';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(objeto: Object): Observable<TipoAsistencia> {
    return this.http.post<TipoAsistencia>(`${this.baseUrl}/registrar`, objeto, cabecera);
  }

  recuperar(id: number): Observable<TipoAsistencia> {
    return this.http.get<TipoAsistencia>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<TipoAsistencia> {
    return this.http.put<TipoAsistencia>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

}