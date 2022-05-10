import { AppService } from '../../servicios/app.service';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/servicios/token.service';
import { Router } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  nombreUsuario: String = "";
  imagenUsuario: String = "";

  isLogin = false;
  roles: string[];
  authority: string;

  constructor(private appService: AppService, private tokenService: TokenService, private router: Router) { }
  isCollapsed = false;
  ngOnInit() {
    this.nombreUsuario = this.tokenService.getUserName();
    //this.imagenUsuario = "";
    if (this.tokenService.getToken()) {
      this.isLogin = true;
      this.roles = [];
      this.roles = this.tokenService.getAuthorities();
      this.roles.every(rol => {
        if (rol === 'ROLE_ADMINISTRADOR') {
          this.authority = 'administrador';
          return true;
        }
        if (rol === 'ROLE_COORDINADOR') {
          this.authority = 'coordinador';
          return true;
        }
        if (rol === 'ROLE_SECTOR') {
          this.authority = 'sector';
          return true;
        }
        if (rol === 'ROLE_OPERADOR') {
          this.authority = 'operador';
          return true;
        }
      });
    }
  }

  toggleSidebarPin() {
    this.appService.toggleSidebarPin();
  }
  toggleSidebar() {
    this.appService.toggleSidebar();
  }

  logOut(): void {
    this.tokenService.logOut();
    this.isLogin = false;
    this.router.navigate(['/inicio']);
    window.location.reload();
  }

}
