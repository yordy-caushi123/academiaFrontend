import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Idioma } from '../entidades/idioma';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class IdiomaService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/idioma';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(documento: Object): Observable<Idioma> {
    return this.http.post<Idioma>(`${this.baseUrl}/registrar`, documento, cabecera);
  }

  recuperar(id: number): Observable<Idioma> {
    return this.http.get<Idioma>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<Idioma>{
    return this.http.put<Idioma>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

}