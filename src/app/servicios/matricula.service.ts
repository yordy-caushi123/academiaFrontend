import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Matricula } from '../entidades/matricula';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class MatriculaService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/matricula';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(objeto: Object): Observable<Matricula> {
    return this.http.post<Matricula>(`${this.baseUrl}/registrar`, objeto, cabecera);
  }

  recuperar(id: number): Observable<Matricula> {
    return this.http.get<Matricula>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<Matricula> {
    return this.http.put<Matricula>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

}