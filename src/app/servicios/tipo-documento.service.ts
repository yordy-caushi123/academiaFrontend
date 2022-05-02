import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoDocumento } from '../entidades/tipo-documento';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class TipoDocumentoService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/tipoDocumento';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(documento: Object): Observable<TipoDocumento> {
    return this.http.post<TipoDocumento>(`${this.baseUrl}/registrar`, documento, cabecera);
  }

  recuperar(id: number): Observable<TipoDocumento> {
    return this.http.get<TipoDocumento>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<TipoDocumento> {
    return this.http.put<TipoDocumento>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

}