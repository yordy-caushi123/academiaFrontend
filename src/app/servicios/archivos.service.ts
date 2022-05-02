import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {

  private baseUrl = 'https://academiabe.herokuapp.com/api/archivo';

  constructor(private http: HttpClient) { }

  recuperarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`, cabecera);
  }

  alta(archivo: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/registrar`, archivo, cabecera);
  }

  recuperar(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/recuperar/${id}`, cabecera);
  }

  pushFileToStorage(file: File, nroCorre: String, clasificacion: String): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    data.append('file', file);
    data.append('nroCorre', nroCorre.toString());
    data.append('clasificacion', clasificacion.toString());
    const newRequest = new HttpRequest('POST', `${this.baseUrl}/guardarArchivo`, data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(newRequest);
  }
}
