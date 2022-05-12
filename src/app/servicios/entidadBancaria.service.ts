import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntidadBancaria } from '../entidades/entidadBancaria';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class EntidadBancariaService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/entidadbancaria';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(objeto: Object): Observable<EntidadBancaria> {
    return this.http.post<EntidadBancaria>(`${this.baseUrl}/registrar`, objeto, cabecera);
  }

  recuperar(id: number): Observable<EntidadBancaria> {
    return this.http.get<EntidadBancaria>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<EntidadBancaria> {
    return this.http.put<EntidadBancaria>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

}