import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/modelos/login-usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { AppService } from 'src/app/servicios/app.service';

declare const $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any = {};
  usuario: LoginUsuario;
  isLogged = false;
  isLoginFail = false;
  roles: string[] = [];
  errorMsg = '';

  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private router: Router,
              public toastr: ToastrService,

              private usuariosService: UsuariosService,
              private servicio: AppService) { }

  ngOnInit() {
    $(".modal").modal("hide");
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {

    /*this.servicio.recuperarIp().subscribe(ip => {
      sessionStorage.setItem("LOCAL_IP", ip);
    });*/

    this.usuario = new LoginUsuario(this.form.nombreUsuario, this.form.password);

    this.authService.login(this.usuario).subscribe(data => {

      this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.nombreUsuario);
      this.tokenService.setAuthorities(data.authorities);

      this.usuariosService.recuperarPorNombreUsuario(data.nombreUsuario).subscribe(usu => {
        if(usu.estadoUsuario == 1){
          this.isLogged = true;
            this.isLoginFail = false;
            this.roles = this.tokenService.getAuthorities();
            this.toastr.success('Bienvenido a SISBIBENI', data.nombreUsuario);

            window.location.reload();
        }
        else{
          this.isLogged = false;
          this.isLoginFail = true;
          this.errorMsg = "Usuario inhabilitado"
          this.tokenService.logOut();
          this.toastr.error(this.errorMsg, 'No se pudo iniciar sesión');
        }
      }, errorUsuario => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.errorMsg = "Problemas con el servidor"
        this.tokenService.logOut();
        this.toastr.error(this.errorMsg, 'No se pudo iniciar sesión');
      });
    },
      (err: any) => {
        this.isLogged = false;
        this.isLoginFail = true;
        //this.errorMsg = err.error.message;
        this.errorMsg = "Credenciales erróneas";
        this.tokenService.logOut();
        this.toastr.error(this.errorMsg, 'No se pudo iniciar sesión');
      }
    );
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
