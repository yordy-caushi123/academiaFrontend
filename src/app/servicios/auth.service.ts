import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtModel } from 'src/app/modelos/jwt-model';
import { LoginUsuario } from 'src/app/modelos/login-usuario';
import { NuevoUsuario } from 'src/app/modelos/nuevo-usuario';
import { Usuario } from '../entidades/usuario';


const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = 'https://academiabe.herokuapp.com/api/auth/';

  constructor(private httpClient: HttpClient) { }

  public login(usuario: LoginUsuario): Observable<JwtModel> {
    return this.httpClient.post<JwtModel>(this.authURL+'login', usuario, cabecera);
  }

  public registro(usuario: NuevoUsuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.authURL+'nuevo', usuario, cabecera);
  }
}