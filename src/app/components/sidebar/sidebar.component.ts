import { Component, OnInit } from '@angular/core';
//import { ServicioService } from 'src/app/Conexion/servicio.service';
import { Services } from '@angular/core/src/view';
import { TokenService } from 'src/app/servicios/token.service';
import { Router } from '@angular/router';
import { Bitacora } from 'src/app/entidades/bitacora';
import { BitacorasService } from 'src/app/servicios/bitacoras.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  inicioActivoMenu: boolean;
  alumnoActivoMenu: boolean;
  matriculaActivoMenu: boolean;
  movimientoActivoMenu: boolean;

  vistaAdminCordi: boolean = false;

  isLogin = false;
  roles: string[];
  user: number = 0;

  constructor(private tokenService: TokenService, private router: Router,
              private bitacorasServicio: BitacorasService) { }

  ngOnInit() {
    this.inicioActivoMenu = true;
    this.alumnoActivoMenu = false;
    this.matriculaActivoMenu = false;
    this.movimientoActivoMenu = false;

    if (this.tokenService.getToken()) {
      this.isLogin = true;
      this.roles = [];
      this.roles = this.tokenService.getAuthorities();
      this.roles.every(rol => {
        if (rol === 'ROLE_ADMINISTRADOR') {
          this.user = 1;
          return true;
        }
        if (rol === 'ROLE_COORDINADOR') {
          this.user = 2;
          return true;
        }
        if (rol === 'ROLE_SECTOR') {
          this.user = 3;
          return true;
        }
        if (rol === 'ROLE_OPERADOR') {
          this.user = 4;
          return true;
        }
      });
    }
  }

  validarInicioMenu(){
    this.inicioActivoMenu = true;
    this.alumnoActivoMenu = false;
    this.matriculaActivoMenu = false;
    this.movimientoActivoMenu = false;
  }

  validarAlumnoMenu(){
    this.inicioActivoMenu = false;
    this.alumnoActivoMenu = true;
    this.matriculaActivoMenu = false;
    this.movimientoActivoMenu = false;
  }

  validarMatriculaMenu(){
    this.inicioActivoMenu = false;
    this.alumnoActivoMenu = false;
    this.matriculaActivoMenu = true;
    this.movimientoActivoMenu = false;
  }

  validarMovimientoMenu(){
    this.inicioActivoMenu = false;
    this.alumnoActivoMenu = false;
    this.matriculaActivoMenu = false;
    this.movimientoActivoMenu = true;
  }

  logOut(): void {
    let bitacora: Bitacora = new Bitacora();
    bitacora.nombreUsuario= this.tokenService.getUserName();
    bitacora.accion = 1;
    bitacora.descripcion = "Cierre de sesión exitoso";
    bitacora.ip = sessionStorage.getItem("LOCAL_IP");
    this.bitacorasServicio.alta(bitacora).subscribe();

    this.tokenService.logOut();
    this.isLogin = false;
    this.user = 0;
    this.router.navigate(['/inicio']);
    window.location.reload();window.location.reload();
  }

}
