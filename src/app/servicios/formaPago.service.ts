import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormaPago } from '../entidades/formaPago';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class FormaPagoService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/formapago';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(objeto: Object): Observable<FormaPago> {
    return this.http.post<FormaPago>(`${this.baseUrl}/registrar`, objeto, cabecera);
  }

  recuperar(id: number): Observable<FormaPago> {
    return this.http.get<FormaPago>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<FormaPago> {
    return this.http.put<FormaPago>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

}