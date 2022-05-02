import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  realRol: string;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRol = route.data.expectedRol;
    const roles = this.tokenService.getAuthorities();
    roles.forEach(rol => {
      if (rol === 'ROLE_ADMINISTRADOR') {
        this.realRol = 'administrador';
      }
      if (rol === 'ROLE_COORDINADOR') {
        this.realRol = 'coordinador';
      }
      if (rol === 'ROLE_SECTOR') {
        this.realRol = 'sector';
      }
      if (rol === 'ROLE_OPERADOR') {
        this.realRol = 'operador';
      }
    });
    if (!this.tokenService.getToken() || expectedRol.indexOf(this.realRol) === -1) {
      this.router.navigate(['/inicio']);
      return false;
    }
    return true;
  }

  constructor(private tokenService: TokenService, private router: Router) { }
}