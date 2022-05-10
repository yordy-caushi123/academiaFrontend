import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ciclo } from '../entidades/ciclo';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class CicloService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/ciclo';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(objeto: Object): Observable<Ciclo> {
    return this.http.post<Ciclo>(`${this.baseUrl}/registrar`, objeto, cabecera);
  }

  recuperar(id: number): Observable<Ciclo> {
    return this.http.get<Ciclo>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<Ciclo> {
    return this.http.put<Ciclo>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

}