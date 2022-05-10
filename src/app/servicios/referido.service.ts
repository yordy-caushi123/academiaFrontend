import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Referido } from '../entidades/referido';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class ReferidoService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/referido';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(objeto: Object): Observable<Referido> {
    return this.http.post<Referido>(`${this.baseUrl}/registrar`, objeto, cabecera);
  }

  recuperar(id: number): Observable<Referido> {
    return this.http.get<Referido>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<Referido> {
    return this.http.put<Referido>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

}