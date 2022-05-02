import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../entidades/usuario';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})

export class UsuariosService{

  private baseUrl = 'https://academiabe.herokuapp.com/api/usuario';

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

  recuperarPorTipo(tipo: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/listarPorTipo/${tipo}`, cabecera);
  }

  recuperarCoincidenciasPorTipo(buscar: String, tipo: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/listarCoincidenciasPorTipo/${buscar}/${tipo}`, cabecera);
  }

  recuperarCoincidenciasNombreUsuario(buscar: String): Observable<any> {
    return this.http.get(`${this.baseUrl}/listarCoincidenciasNombreUsuario/${buscar}`, cabecera);
  }
  
  alta(usuario: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/registrar`, usuario, cabecera);
  }

  recuperar(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  recuperarPorNombreUsuario(username: String): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/recuperarPorNombreUsuario/${username}`, cabecera);
  }

  recuperarPorCodigoFuncionario(codigo: String): Observable<any> {
    return this.http.get(`${this.baseUrl}/recuperarPorCodigoFuncionario/${codigo}`, cabecera);
  }

  modificacion(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/actualizar/${id}`, value, cabecera);
  }

  cambiarContrasena(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/cambiarContrasena/${id}`, value, cabecera);
  }

  reporteGeneral(reporte: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/reporteGeneral`, reporte, {responseType: "text"});
  }

  reporteParticular(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/reporteParticular/${id}`, {responseType: "text"});
  }

  actualizarBitacoras(nombreNuevo: String, nombreInicial: String) {
    return this.http.post(`${this.baseUrl}/actualizarBitacoras/${nombreNuevo}`, nombreInicial, cabecera);
  }

}