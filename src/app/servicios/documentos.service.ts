import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Documento } from '../entidades/documento';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class DocumentosService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/documento';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  recuperarTodosActivos(): Observable<any> {
      return this.http.get(`${this.baseUrl}/listarActivos`, cabecera);
  }

  recuperarCoincidencias(buscar: String): Observable<any> {
    return this.http.get(`${this.baseUrl}/listarCoincidencias/${buscar}`, cabecera);
  }

  alta(documento: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/registrar`, documento, cabecera);
  }

  recuperar(id: number): Observable<Documento> {
    return this.http.get<Documento>(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  recuperarPorCodigo(codigo: String): Observable<any> {
    return this.http.get(`${this.baseUrl}/recuperarPorCodigo/${codigo}`, cabecera);
  }

  recuperarPorReferenciaYTipo(codigo: String, tipo: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/recuperarPorReferenciaYTipo/${codigo}/${tipo}`, cabecera);
  }

  recuperarPorReferenciaYTipoUnico(codigo: String, tipo: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/recuperarPorReferenciaYTipoUnico/${codigo}/${tipo}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

  

  recuperarActivoPorFuncionario(codigo: String, tipo: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/recuperarActivoPorFuncionario/${codigo}/${tipo}`, cabecera);
  }

}