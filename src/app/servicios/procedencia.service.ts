import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Procedencia } from '../entidades/procedencia';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class ProcedenciaService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/procedencia';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(objeto: Object): Observable<Procedencia> {
    return this.http.post<Procedencia>(`${this.baseUrl}/registrar`, objeto, cabecera);
  }

  recuperar(id: number): Observable<Procedencia> {
    return this.http.get<Procedencia>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<Procedencia> {
    return this.http.put<Procedencia>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

}