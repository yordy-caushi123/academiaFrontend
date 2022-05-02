import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Usuario } from 'src/app/entidades/usuario';
import { AppService } from 'src/app/servicios/app.service';

declare const $: any;

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.scss']
})
export class CambiarContrasenaComponent implements OnInit {

  id: number = 0;
  usuario: Usuario = new Usuario();

  nuevaContrasena: String = '';
  confirmarNuevaContrasena: String = '';
  nivelContrasena: number = 0;
  mensaje: String = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private tokenService: TokenService,
              private usuariosServicio: UsuariosService,
              private servicio: AppService) { }

  ngOnInit() {
    $(".modal").modal("hide");

    this.id = Number(this.tokenService.getId());
    this.usuariosServicio.recuperar(this.id).subscribe(data => {
      this.usuario = data;
    }, error => {
      swal.fire(
        'Error de conexión',
        'No se puede conectar con el servidor',
        'error'
      )
      this.gotoInicio();
      //console.log(error)
    });
  }

  gotoInicio() {
    this.router.navigate(['/inicio']);
  }

  cambiarContrasena(){
    if(this.nuevaContrasena=='' || this.confirmarNuevaContrasena==''){
      this.mensaje = 'Campos incorrectos o vacios';
      swal.fire(
        'Verificar',
        'Campos incorrectos o vacios',
        'error'
      )
    }
    else{
      if(this.nuevaContrasena != this.confirmarNuevaContrasena){
        this.mensaje = 'Las contraseñas no coinciden';
        swal.fire(
          'Verificar',
          'Las contraseñas no coinciden',
          'error'
        )
      }
      else{
        if(this.nuevaContrasena.length<8){
          this.mensaje = 'La nueva contraseña debe tener mínimo 8 caracteres';
          swal.fire(
            'Verificar',
            'La nueva contraseña debe tener mínimo 8 caracteres',
            'error'
          )
        }
        else{
          swal.fire({
            title: '¿Estás seguro de continuar?',
            text: "Deberá iniciar sesión con la nueva contraseña",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
          }).then((result) => {
            if (result.value) {
              this.usuario.contrasenaUsuario = this.nuevaContrasena;
              this.usuariosServicio.cambiarContrasena(this.id, this.usuario).subscribe( data => {
                swal.fire(
                  'Contraseña actualizada',
                  'Se deberá iniciar sesión con la nueva contraseña',
                  'success'
                )
                this.logOut();
              });
            }
          });
        }
      }
    }
  }

  modificarNivelContrasena(e: any){
    this.nuevaContrasena = e.target.value;
    this.nivelContrasena = this.servicio.nivelContrasena(this.nuevaContrasena);
  }

  confirmarNuevaContrasenaEvento(event: any){
    this.confirmarNuevaContrasena = event.target.value;
    if(this.nuevaContrasena=='' || this.confirmarNuevaContrasena==''){
      this.mensaje = 'Campos incorrectos o vacios';
    }
    else{
      if(this.nuevaContrasena != this.confirmarNuevaContrasena){
        this.mensaje = 'Las contraseñas no coinciden';
      }
      else{
        if(this.nuevaContrasena.length<8){
          this.mensaje = 'La nueva contraseña debe tener mínimo 8 caracteres';
        }
        else{
          this.mensaje = '';
        }
      }
    }
  }

  logOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }
}
