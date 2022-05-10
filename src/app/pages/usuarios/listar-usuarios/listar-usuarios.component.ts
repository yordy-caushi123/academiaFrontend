import { Component, OnInit, NgZone } from '@angular/core';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2'
import { Observable } from "rxjs";
import { Usuario } from "../../../entidades/usuario";
import { Router } from '@angular/router';
import { AppService } from 'src/app/servicios/app.service';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';
import { TokenService } from 'src/app/servicios/token.service';

declare const $: any;

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.scss']
})
export class ListarUsuariosComponent implements OnInit {

  usuarios: Array<Usuario> = new Array();
  idEncriptadas: Array<String> = new Array();
  usuario = new Usuario();

  buscar: String = '';

  tipoSeleccionado: number = 0;
  registrosIniciales: number = 0;

  //configurador de paginador
  config: any;

  //Opcion del reporte
  campoNombre: boolean = true;
  campoUsuario: boolean = true;
  campoDni: boolean = true;
  campoTipo: boolean = true;
  campoEntidad: boolean = true;
  campo: boolean = true;
  campoFijo: boolean = true;
  campoAnexo: boolean = true;
  campoMovil1: boolean = true;
  campoMovil2: boolean = true;
  campoCorreo: boolean = true;
  nombreReporte: String = '';

  constructor(private usuariosServicio: UsuariosService,
              private router: Router,
              private servicio: AppService,
              public toastr: ToastrService,
              private tokenService: TokenService) { }

  ngOnInit() {
    $(".modal").modal("hide");

    this.recuperarTodos();
  }

  recuperarTodos() {
    this.usuarios=null;
    this.usuariosServicio.recuperarTodosActivos().subscribe(response => {
      this.usuarios = response;
      this.registrosIniciales = this.usuarios.length;

      this.config = {
        id: 'usuarios',
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.usuarios.length
      };

      this.idEncriptadas = [];
      for(let i=0; i<this.usuarios.length; i++){
        this.idEncriptadas.push(btoa(CryptoJS.AES.encrypt(this.usuarios[i].idUsuario.toString(), this.servicio.getLlaveEncriptado().toString()).toString()));
      }
    }, (error) => {
      this.usuarios = new Array();
      this.registrosIniciales = 0;
      swal.fire(
        'Error de conexión',
        'No se puede conectar con el servidor',
        'error'
      )
    });

  }

  baja(codigo) {

    swal.fire({
      title: '¿Está seguro de continuar?',
      text: "Se deshabilitará al Usuario seleccionado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.usuariosServicio.recuperar(codigo).subscribe(data => {
          this.usuario = data;
          this.usuario.estadoUsuario=0;
          //this.usuario.idUsuario_modificacion=Number(sessionStorage.getItem('IdKey'));
          //this.usuario.ip_modificacion=sessionStorage.getItem("LOCAL_IP").toString();
          this.usuariosServicio.modificacion(codigo, this.usuario).subscribe(data => {

            swal.fire(
              'Procesado',
              'Se deshabilitó al Usuario seleccionado',
              'success'
            )
            this.recuperarTodos();

          }, error => {
            swal.fire(
              'Error',
              'No se pudo realizar la operación solicitada',
              'success'
            )

          });
          this.usuario = new Usuario();
        }, error => {
          swal.fire(
            'Error de conexión',
            'No se puede conectar con el servidor',
            'success'
          )
        });
      }
    })
  }

  gotoList() {
    this.router.navigate(['/listarUsuarios']);
  }

  hayUsuarios() {
    if(this.usuarios==null || this.usuarios.length==0){
      return false;
    }
    else{
      return true;
    }
  }

  buscador(event:any){
    this.buscar =  event.target.value;
    if(this.buscar == ''){
      if(this.tipoSeleccionado == 0){
        this.usuariosServicio.recuperarTodosActivos().subscribe( data => {
          this.usuarios = data;

          this.config = {
            id: 'usuarios',
            itemsPerPage: 10,
            currentPage: 1,
            totalItems: this.usuarios.length
          };
          this.idEncriptadas = [];
          for(let i=0; i<this.usuarios.length; i++){
            this.idEncriptadas.push(btoa(CryptoJS.AES.encrypt(this.usuarios[i].idUsuario.toString(), this.servicio.getLlaveEncriptado().toString()).toString()));
          }
        });
      }
      else{
        this.usuariosServicio.recuperarPorTipo(this.tipoSeleccionado).subscribe( data => {
          this.usuarios = data;

          this.config = {
            id: 'usuarios',
            itemsPerPage: 10,
            currentPage: 1,
            totalItems: this.usuarios.length
          };
          this.idEncriptadas = [];
          for(let i=0; i<this.usuarios.length; i++){
            this.idEncriptadas.push(btoa(CryptoJS.AES.encrypt(this.usuarios[i].idUsuario.toString(), this.servicio.getLlaveEncriptado().toString()).toString()));
          }
        });
      }

    }else{
      if(this.tipoSeleccionado == 0){
        this.usuariosServicio.recuperarCoincidencias(this.buscar).subscribe( data => {
          this.usuarios = data;

          this.config = {
            id: 'usuarios',
            itemsPerPage: 10,
            currentPage: 1,
            totalItems: this.usuarios.length
          };
          this.idEncriptadas = [];
          for(let i=0; i<this.usuarios.length; i++){
            this.idEncriptadas.push(btoa(CryptoJS.AES.encrypt(this.usuarios[i].idUsuario.toString(), this.servicio.getLlaveEncriptado().toString()).toString()));
          }
        });
      }
      else{
        this.usuariosServicio.recuperarCoincidenciasPorTipo(this.buscar, this.tipoSeleccionado).subscribe( data => {
          this.usuarios = data;

          this.config = {
            id: 'usuarios',
            itemsPerPage: 10,
            currentPage: 1,
            totalItems: this.usuarios.length
          };
          this.idEncriptadas = [];
          for(let i=0; i<this.usuarios.length; i++){
            this.idEncriptadas.push(btoa(CryptoJS.AES.encrypt(this.usuarios[i].idUsuario.toString(), this.servicio.getLlaveEncriptado().toString()).toString()));
          }
        });
      }

    }
  }

  cambioTipo(event: any){
    this.tipoSeleccionado = event.target.value;
    if(this.tipoSeleccionado == 0){
      if(this.buscar.length == 0){
        this.usuariosServicio.recuperarTodosActivos().subscribe( data => {
          this.usuarios = data;

          this.config = {
            id: 'usuarios',
            itemsPerPage: 10,
            currentPage: 1,
            totalItems: this.usuarios.length
          };
          this.idEncriptadas = [];
          for(let i=0; i<this.usuarios.length; i++){
            this.idEncriptadas.push(btoa(CryptoJS.AES.encrypt(this.usuarios[i].idUsuario.toString(), this.servicio.getLlaveEncriptado().toString()).toString()));
          }
        });
      }
      else{
        this.usuariosServicio.recuperarCoincidencias(this.buscar).subscribe( data => {
          this.usuarios = data;

          this.config = {
            id: 'usuarios',
            itemsPerPage: 10,
            currentPage: 1,
            totalItems: this.usuarios.length
          };
          this.idEncriptadas = [];
          for(let i=0; i<this.usuarios.length; i++){
            this.idEncriptadas.push(btoa(CryptoJS.AES.encrypt(this.usuarios[i].idUsuario.toString(), this.servicio.getLlaveEncriptado().toString()).toString()));
          }
        });
      }
    }
    else{
      if(this.buscar.length == 0){
        this.usuariosServicio.recuperarPorTipo(this.tipoSeleccionado).subscribe( data => {
          this.usuarios = data;

          this.config = {
            id: 'usuarios',
            itemsPerPage: 10,
            currentPage: 1,
            totalItems: this.usuarios.length
          };
          this.idEncriptadas = [];
          for(let i=0; i<this.usuarios.length; i++){
            this.idEncriptadas.push(btoa(CryptoJS.AES.encrypt(this.usuarios[i].idUsuario.toString(), this.servicio.getLlaveEncriptado().toString()).toString()));
          }
        });
      }
      else{
        this.usuariosServicio.recuperarCoincidenciasPorTipo(this.buscar,this.tipoSeleccionado).subscribe( data => {
          this.usuarios = data;

          this.config = {
            id: 'usuarios',
            itemsPerPage: 10,
            currentPage: 1,
            totalItems: this.usuarios.length
          };
          this.idEncriptadas = [];
          for(let i=0; i<this.usuarios.length; i++){
            this.idEncriptadas.push(btoa(CryptoJS.AES.encrypt(this.usuarios[i].idUsuario.toString(), this.servicio.getLlaveEncriptado().toString()).toString()));
          }
        });
      }
    }
  }

  obtenerFechaCreacion(i: number){
    //let cad = this.usuarios[i].fechaCreacion.substr(0,10);
    //return cad[8]+cad[9]+"-"+cad[5]+cad[6]+"-"+cad[0]+cad[1]+cad[2]+cad[3];
  }

  obtenerFechaModificacion(i: number){
    //let cad = this.usuarios[i].fecha_modificacion.substring(0,10);
    //return cad[8]+cad[9]+"-"+cad[5]+cad[6]+"-"+cad[0]+cad[1]+cad[2]+cad[3];
  }

  pageChange(event) {
    this.config.currentPage = event;
  }
















  cambioCampoNombre(event: any) {
    this.campoNombre = event.target.checked;
  }

  cambioCampoDni(event: any) {
    this.campoDni = event.target.checked;
  }

  cambioCampoUsuario(event: any) {
    this.campoUsuario = event.target.checked;
  }

  cambioCampoTipo(event: any) {
    this.campoTipo = event.target.checked;
  }

  cambioCampoEntidad(event: any) {
    this.campoEntidad = event.target.checked;
  }

  cambioCampoFijo(event: any) {
    this.campoFijo = event.target.checked;
  }

  cambioCampoAnexo(event: any) {
    this.campoAnexo = event.target.checked;
  }

  cambioCampoMovil1(event: any) {
    this.campoMovil1 = event.target.checked;
  }

  cambioCampoMovil2(event: any) {
    this.campoMovil2 = event.target.checked;
  }

  cambioCampoCorreo(event: any) {
    this.campoCorreo = event.target.checked;
  }

  abrirModalExportarExcel() {
    $("#exportarExcel").modal("show");
  }

  cerrarModalExportarExcel() {
    $("#exportarExcel").modal("hide");
    this.campoNombre = true;
    this.campoUsuario = true;
    this.campoTipo = true;
    this.campoEntidad = true;
    this.campoFijo = true;
    this.campoAnexo = true;
    this.campoMovil1 = true;
    this.campoMovil2 = true;
    this.campoDni = true;
    this.campoCorreo = true;
  }

  cerrarModalExportarExcel2() {
    $("#exportarExcel").modal("hide");
    let campos: Array<any> = new Array();
    campos.push(this.campoNombre);
    campos.push(this.campoDni);
    campos.push(this.campoUsuario);
    campos.push(this.campoTipo);
    campos.push(this.campoEntidad);
    campos.push(this.campoFijo);
    campos.push(this.campoAnexo);
    campos.push(this.campoMovil1);
    campos.push(this.campoMovil2);
    campos.push(this.campoCorreo);
    campos.push(this.tipoSeleccionado);
    campos.push(this.buscar);

    this.campoNombre = true;
    this.campoUsuario = true;
    this.campoTipo = true;
    this.campoEntidad = true;
    this.campoFijo = true;
    this.campoAnexo = true;
    this.campoMovil1 = true;
    this.campoMovil2 = true;
    this.campoDni = true;
    this.campoCorreo = true;
    this.nombreReporte = 'Reporte de Usuarios';

    this.usuariosServicio.reporteGeneral(campos).subscribe(data => {
      if(data.length!=0){
        $("#imprime").empty()
        var obj = document.getElementById("imprime");
        var link = document.createElement('a');
        link.innerHTML = "Descarga aquí";
        link.download = "Reporte de Usuarios" + '.xlsx';
        link.href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + data;
        obj.appendChild(link);
        $("#descargarExcel").modal("show");
      }
      else{
        this.toastr.error("No se pudo obtener el reporte solicitado","Error");
        $("#descargarExcel").modal("hide");
      }
    });
  }

  cerrarModalDescargarExcel() {
    $("#descargarExcel").modal("hide");
  }

  exportarExcelParticular(i: number){

    this.nombreReporte = 'Reporte de Usuario';

    this.usuariosServicio.reporteParticular(i).subscribe(data => {
      if(data.length!=0){
        $("#imprime").empty()
        var obj = document.getElementById("imprime");
        var link = document.createElement('a');
        link.innerHTML = "Descargar aquí";
        link.download = "Reporte de Usuario" + '.xlsx';
        link.href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + data;
        obj.appendChild(link);
        $("#descargarExcel").modal("show");

      }
      else{
        this.toastr.error("No se pudo obtener el reporte solicitado","Error");
        $("#descargarExcel").modal("hide");
      }

    });

  }
}
