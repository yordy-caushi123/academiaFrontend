import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/servicios/token.service';
import { Router } from '@angular/router';
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
  escuelaActivoMenu: boolean;
  sedeActivoMenu: boolean;
  cicloActivoMenu: boolean;
  turnoActivoMenu: boolean;
  modalidadActivoMenu: boolean;
  procedenciaActivoMenu: boolean;
  referidoActivoMenu: boolean;

  vistaAdminCordi: boolean = false;

  isLogin = false;
  roles: string[];
  user: number = 0;

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    this.inicioActivoMenu = true;
    this.alumnoActivoMenu = false;
    this.matriculaActivoMenu = false;
    this.movimientoActivoMenu = false;
    this.escuelaActivoMenu= false;
    this.sedeActivoMenu= false;
    this.cicloActivoMenu= false;
    this.turnoActivoMenu= false;
    this.modalidadActivoMenu= false;
    this.procedenciaActivoMenu= false;
    this.referidoActivoMenu= false;

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
    this.escuelaActivoMenu= false;
    this.sedeActivoMenu= false;
    this.cicloActivoMenu= false;
    this.turnoActivoMenu= false;
    this.modalidadActivoMenu= false;
    this.procedenciaActivoMenu= false;
    this.referidoActivoMenu= false;
    

  }

  validarAlumnoMenu(){
    this.inicioActivoMenu = false;
    this.alumnoActivoMenu = true;
    this.matriculaActivoMenu = false;
    this.movimientoActivoMenu = false;
    this.escuelaActivoMenu= false;
    this.sedeActivoMenu= false;
    this.cicloActivoMenu= false;
    this.turnoActivoMenu= false;
    this.modalidadActivoMenu= false;
    this.procedenciaActivoMenu= false;
    this.referidoActivoMenu= false;

  }

  validarMatriculaMenu(){
    this.inicioActivoMenu = false;
    this.alumnoActivoMenu = false;
    this.matriculaActivoMenu = true;
    this.movimientoActivoMenu = false;
    this.escuelaActivoMenu= false;
    this.sedeActivoMenu= false;
    this.cicloActivoMenu= false;
    this.turnoActivoMenu= false;
    this.modalidadActivoMenu= false;
    this.procedenciaActivoMenu= false;
    this.referidoActivoMenu= false;

  }

  validarMovimientoMenu(){
    this.inicioActivoMenu = false;
    this.alumnoActivoMenu = false;
    this.matriculaActivoMenu = false;
    this.movimientoActivoMenu = true;
    this.escuelaActivoMenu= false;
    this.sedeActivoMenu= false;
    this.cicloActivoMenu= false;
    this.turnoActivoMenu= false;
    this.modalidadActivoMenu= false;
    this.procedenciaActivoMenu= false;
    this.referidoActivoMenu= false;
  }

  validarEscuelaMenu(){
    this.inicioActivoMenu = false;
    this.alumnoActivoMenu = false;
    this.matriculaActivoMenu = false;
    this.movimientoActivoMenu = false;
    this.escuelaActivoMenu= true;
    this.sedeActivoMenu= false;
    this.cicloActivoMenu= false;
    this.turnoActivoMenu= false;
    this.modalidadActivoMenu= false;
    this.procedenciaActivoMenu= false;
    this.referidoActivoMenu= false;
  }

  validarSedeMenu(){
    this.inicioActivoMenu = false;
    this.alumnoActivoMenu = false;
    this.matriculaActivoMenu = false;
    this.movimientoActivoMenu = false;
    this.escuelaActivoMenu= false;
    this.sedeActivoMenu= true;
    this.cicloActivoMenu= false;
    this.turnoActivoMenu= false;
    this.modalidadActivoMenu= false;
    this.procedenciaActivoMenu= false;
    this.referidoActivoMenu= false;
  }

  validarCicloMenu(){
    this.inicioActivoMenu = false;
    this.alumnoActivoMenu = false;
    this.matriculaActivoMenu = false;
    this.movimientoActivoMenu = false;
    this.escuelaActivoMenu= false;
    this.sedeActivoMenu= false;
    this.cicloActivoMenu= true;
    this.turnoActivoMenu= false;
    this.modalidadActivoMenu= false;
    this.procedenciaActivoMenu= false;
    this.referidoActivoMenu= false;
  }

  validarTurnoMenu(){
    this.inicioActivoMenu = false;
    this.alumnoActivoMenu = false;
    this.matriculaActivoMenu = false;
    this.movimientoActivoMenu = false;
    this.escuelaActivoMenu= false;
    this.sedeActivoMenu= false;
    this.cicloActivoMenu= false;
    this.turnoActivoMenu= true;
    this.modalidadActivoMenu= false;
    this.procedenciaActivoMenu= false;
    this.referidoActivoMenu= false;
  }

  validarModalidadMenu(){
    this.inicioActivoMenu = false;
    this.alumnoActivoMenu = false;
    this.matriculaActivoMenu = false;
    this.movimientoActivoMenu = false;
    this.escuelaActivoMenu= false;
    this.sedeActivoMenu= false;
    this.cicloActivoMenu= false;
    this.turnoActivoMenu= false;
    this.modalidadActivoMenu= true;
    this.procedenciaActivoMenu= false;
    this.referidoActivoMenu= false;
  }

  validarProcedenciaMenu(){
    this.inicioActivoMenu = false;
    this.alumnoActivoMenu = false;
    this.matriculaActivoMenu = false;
    this.movimientoActivoMenu = false;
    this.escuelaActivoMenu= false;
    this.sedeActivoMenu= false;
    this.cicloActivoMenu= false;
    this.turnoActivoMenu= false;
    this.modalidadActivoMenu= false;
    this.procedenciaActivoMenu= true;
    this.referidoActivoMenu= false;
  }

  validarReferidoMenu(){
    this.inicioActivoMenu = false;
    this.alumnoActivoMenu = false;
    this.matriculaActivoMenu = false;
    this.movimientoActivoMenu = false;
    this.escuelaActivoMenu= false;
    this.sedeActivoMenu= false;
    this.cicloActivoMenu= false;
    this.turnoActivoMenu= false;
    this.modalidadActivoMenu= false;
    this.procedenciaActivoMenu= false;
    this.referidoActivoMenu= true;
  }

  logOut(): void {
    this.tokenService.logOut();
    this.isLogin = false;
    this.user = 0;
    this.router.navigate(['/inicio']);
    window.location.reload();window.location.reload();
  }

}
