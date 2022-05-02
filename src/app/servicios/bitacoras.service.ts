import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class BitacorasService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/bitacora';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  recuperarPorFiltro(buscar: String, accion: number, fechaini: String, fechafin: String): Observable<any> {
    return this.http.get(`${this.baseUrl}/listarPorFiltro/${buscar}/${accion}/${fechaini}/${fechafin}`, cabecera);
  }

  alta(bitacora: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/registrar`, bitacora, cabecera);
  }

  recuperar(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

}
