import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntidadBancaria } from '../entidades/entidadBancaria';
import { ConceptoEgreso } from '../entidades/conceptoEgreso';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class ConceptoEgresoService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/conceptoegreso';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(objeto: Object): Observable<ConceptoEgreso> {
    return this.http.post<ConceptoEgreso>(`${this.baseUrl}/registrar`, objeto, cabecera);
  }

  recuperar(id: number): Observable<ConceptoEgreso> {
    return this.http.get<ConceptoEgreso>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<ConceptoEgreso> {
    return this.http.put<ConceptoEgreso>(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

}