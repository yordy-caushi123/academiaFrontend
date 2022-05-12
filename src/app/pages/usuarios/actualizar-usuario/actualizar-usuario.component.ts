import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../../entidades/usuario';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { AppService } from 'src/app/servicios/app.service';
import { Observable } from "rxjs";
import swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { TokenService } from 'src/app/servicios/token.service';

declare const $: any;
declare const getBase64Simple: any;
declare const convertToBase64Simple: any;

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrls: ['./actualizar-usuario.component.scss']
})
export class ActualizarUsuarioComponent implements OnInit {

  id = 0;
  adicional: number = 0;
  posicion: number = 0;
  usuario: Usuario = new Usuario();
  idUsuFun = 0;
  usuarios: Observable<Usuario[]> = null;

  dni: String = '';
  nombres: String = '';
  paterno: String = '';
  materno: String = '';
  tipo: number = 0;
  movil: String = '';
  movil2: String = '';
  fijo: String = '';
  anexo: String = '';
  fechaAlta: String = '';
  fechaBaja: String = '';
  correo: String = '';
  estado: number = 1;
  username: String = '';
  procedencia: String = '';
  sectorSeleccionado: number = 0;
  operadorSeleccionado: number = 0;
  contrasena: String = '';
  registrar: boolean = false;
  visualizar: boolean = true;
  actualizar: boolean = false;
  eliminar: boolean = false;
  mostrarImagen: boolean = false;
  imagen: String = '';


  tipoInicial: number = 0;
  movilInicial: String = '';
  movil2Inicial: String = '';
  fijoInicial: String = '';
  anexoInicial: String = '';
  fechaAltaInicial: String = '';
  fechaBajaInicial: String = '';
  correoInicial: String = '';
  imagenInicial: String = '';

  mostrarLocal: boolean = true;
  mostrarSectores: boolean = false;
  mostrarOperadores: boolean = false;
  mostrarCampos: boolean = false;
  mostrarPersonales: boolean = false;

  procedenciaInicial: String;

  archivos: File[] = [];
  fechas: String[] = [];
  nombreArchivo: String = '';
  totalArchivos: number = 0;
  totalArchivosProcesados: number = 0;
  porcentajeArchivo: number = 0;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private usuariosServicio: UsuariosService,
    public servicio: AppService,
    public toastr: ToastrService,
    private tokenService: TokenService) { }

  ngOnInit() {
    $(".modal").modal("hide");

    /*let cadenaEncriptada: String = atob(this.route.snapshot.params["id"]);
    this.id = Number(CryptoJS.AES.decrypt(cadenaEncriptada.toString(), this.servicio.getLlaveEncriptado().toString().toString()).toString(CryptoJS.enc.Utf8));
    this.usuariosServicio.recuperar(this.id).subscribe(data => {
      this.usuario = data;

      this.tipo = this.usuario.tipo_usuario;
      this.estado = this.usuario.estado_usuario;
      this.username = this.usuario.nombreUsuario;
      this.contrasena = this.usuario.contrasena_usuario;
      if (this.imagen.length != 0) {
        this.mostrarImagen = true;
      }

      this.tipo = this.usuario.tipo_usuario;
      this.tipoInicial = this.usuario.tipo_usuario;

      this.usuariosFuncionariosService.recuperarPorUsuarioActivo(this.id).subscribe(usuFun => {
        this.usuarioFuncionario = JSON.parse(JSON.stringify(usuFun));
        this.usuarioFuncionarioAuxiliar = JSON.parse(JSON.stringify(usuFun));
        this.idUsuFun = this.usuarioFuncionarioAuxiliar.id_usuario_persona;

        this.procedencia = usuFun.procedencia_usuario_persona;
        this.correo = usuFun.correo_usuario_persona;
        this.movil = usuFun.movil_usuario_persona;
        this.movil2 = usuFun.movil2_usuario_persona;
        this.fijo = usuFun.fijo_usuario_persona;
        this.anexo = usuFun.anexo_usuario_persona;
        this.fechaAlta = usuFun.fecha_alta_usuario_persona.substring(0, 10);
        if (usuFun.fecha_baja_usuario_persona == null) {
          this.fechaBaja = '';
        }
        else {
          this.fechaBaja = usuFun.fecha_baja_usuario_persona.substring(0, 10);
        }

        //Valores iniciales que pueden ser modificados

        //this.imagenInicial = usuFun.imagen_usuario;
        this.procedenciaInicial = usuFun.procedencia_usuario_persona;
        this.correoInicial = usuFun.correo_usuario_persona;
        this.movilInicial = usuFun.movil_usuario_persona;
        this.movil2Inicial = usuFun.movil2_usuario_persona;
        this.fijoInicial = usuFun.fijo_usuario_persona;
        this.anexoInicial = usuFun.anexo_usuario_persona;
        this.fechaAltaInicial = usuFun.fecha_alta_usuario_persona.substring(0, 10);
        if (usuFun.fecha_baja_usuario_persona == null) {
          this.fechaBajaInicial = '';
        }
        else {
          this.fechaBajaInicial = usuFun.fecha_baja_usuario_persona.substring(0, 10);
        }
      });

      this.mostrarCampos = true;

      //recuperar datos del funcionario
      this.funcionariosServicio.recuperarPorCodigo(this.usuario.codigo_persona).subscribe(fun => {
        this.funcionario = fun;
        this.dni = this.funcionario.dni_persona;
        this.paterno = this.funcionario.paterno_persona;
        this.materno = this.funcionario.materno_persona;
        this.nombres = this.funcionario.nombres_persona;
        this.imagen = this.funcionario.imagen_persona;
        this.imagenInicial = this.funcionario.imagen_persona;
        if (this.imagen == null || this.imagen == undefined) {
          this.imagen = '';
          this.imagenInicial = '';
        }
      })

      //recuperar datos del funcionario
      this.documentosServicio.recuperarPorReferenciaYTipo(this.usuario.codigo_usuario, 5).subscribe(docs => {
        this.documentos = docs;
        this.posicion = this.documentos.length;
        for (let k = 0; k < this.documentos.length; k++) {
          if (this.documentos[k].fecha_documento == null) {
            this.documentos[k].fecha_documento = "Sin registro";
          }
          else {
            this.documentos[k].fecha_documento = this.documentos[k].fecha_documento.substr(8, 2) + "-" +
              this.documentos[k].fecha_documento.substr(5, 2) + "-" +
              this.documentos[k].fecha_documento.substr(0, 4);
          }
        }

      })

    }, error => {
      swal.fire(
        'Error de conexión',
        'No se puede conectar con el servidor',
        'error'
      )
      this.gotoList();
      //console.log(error)
    });*/
  }

  gotoList() {
    this.router.navigate(['/listarUsuarios']);
  }

  gotoInicio() {
    this.router.navigate(['/inicio']);
  }

  /*modificacion() {

    if ((!this.servicio.caracteresEspacio(this.nombres) || this.nombres.length == 0) ||
      (!this.servicio.caracteresEspacio(this.paterno) || this.paterno.length == 0) ||
      (!this.servicio.caracteresEspacio(this.materno) || this.materno.length == 0) ||
      this.tipo == 0 ||
      (this.servicio.esEmail(this.correo) || this.correo.length == 0) ||
      ((this.fijo.length != 0 && this.fijo.length != 7 && this.fijo.length != 8 && this.fijo.length != 9) || !this.servicio.soloNumeros(this.fijo)) ||
      ((this.anexo.length != 0 && this.anexo.length != 1 && this.anexo.length != 2 && this.anexo.length != 3 && this.anexo.length != 4) || !this.servicio.soloNumeros(this.anexo)) ||
      (!this.servicio.soloNumeros(this.movil) || this.movil.length != 9) ||
      ((this.movil2.length != 0 && this.movil2.length != 9) || !this.servicio.soloNumeros(this.movil2)) ||
      this.fechaAlta.length == 0 ||
      (this.procedencia.length == 0 && this.sectorSeleccionado == 0 && this.operadorSeleccionado == 0)) {
      swal.fire(
        'Verificar',
        'Campos incorrectos o vacios',
        'error'
      )
    }
    else {
      swal.fire({
        title: '¿Está seguro de continuar?',
        text: "Los datos quedarán actualizados en el sistema",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          let numero2 = this.codigo.documentos;

          //si hay cambio en alguno de los siguientes campos
          if (this.fijo != this.fijoInicial ||
            this.anexo != this.anexoInicial ||
            this.movil != this.movilInicial ||
            this.movil2 != this.movil2Inicial ||
            this.correo != this.correoInicial ||
            this.imagen != this.imagenInicial ||
            this.fechaAlta != this.fechaAltaInicial ||
            this.fechaBaja != this.fechaBajaInicial ||
            this.tipo != this.tipoInicial) {

            //setea los datos de auditoria de modificacion
            this.usuarioFuncionario.estado_usuario_persona = 0;

            //envia para modificar. Setea el estado en 0 para deshabilitar el registro existente
            this.usuariosFuncionariosService.modificacion(this.idUsuFun, this.usuarioFuncionario).subscribe(data => {

              this.usuarioFuncionario.id_usuario_persona = null;
              //this.usuarioFuncionario.tipo_usuario_persona = this.tipo;
              this.usuarioFuncionario.fecha_baja_usuario_persona = this.fechaBaja;
              this.usuarioFuncionario.fecha_alta_usuario_persona = this.fechaAlta;
              this.usuarioFuncionario.fijo_usuario_persona = this.fijo;
              this.usuarioFuncionario.anexo_usuario_persona = this.anexo;
              this.usuarioFuncionario.movil_usuario_persona = this.movil;
              this.usuarioFuncionario.movil2_usuario_persona = this.movil2;
              this.usuarioFuncionario.correo_usuario_persona = this.correo;
              this.usuarioFuncionario.estado_usuario_persona = 1;
              this.usuarioFuncionario.id_usuario_creacion = Number(sessionStorage.getItem('IdKey'));
              this.usuarioFuncionario.ip_creacion = sessionStorage.getItem("LOCAL_IP");
              this.usuarioFuncionario.id_usuario_modificacion = null;
              this.usuarioFuncionario.ip_modificacion = null;

              this.usuariosFuncionariosService.alta(this.usuarioFuncionario).subscribe(data => {

                let bitacora: Bitacora = new Bitacora();
                bitacora.nombreUsuario = this.tokenService.getName();
                bitacora.codigo_usuario = this.tokenService.getCodigo();
                bitacora.id_usuario = Number(this.tokenService.getId());
                bitacora.accion = 2;
                bitacora.tipoAccion = 5;
                bitacora.descripcion = "Actualizó los datos del usuario: " + data.codigo_usuario + "-" + this.usuario.nombreUsuario;
                bitacora.contenidoInicial = JSON.stringify(this.usuarioFuncionarioAuxiliar);
                bitacora.contenidoModificado = JSON.stringify(data);
                bitacora.ip = sessionStorage.getItem("LOCAL_IP");
                this.bitacorasServicio.alta(bitacora).subscribe();

                  this.gotoList();
                  swal.fire(
                    'Usuario Actualizado',
                    'Los datos fueron registrados con éxito',
                    'success'
                  )

              }, error => {
                this.usuariosFuncionariosService.modificacion(this.idUsuFun, this.usuarioFuncionarioAuxiliar).subscribe();
                swal.fire(
                  'Error',
                  'Los datos no fueron actualizados ',
                  'error'
                )

              });

            }, error => {
              swal.fire(
                'Error',
                'Los datos no fueron actualizados ',
                'error'
              )
            });
          }
          //si no hay cambio en los datos, ver si hay documentos por agregar
          else {

              swal.fire(
                'Información',
                'No hay datos para actualizar',
                'info'
              )
          }
        }
      })
    }

  }

  cambioTipo(event: any) {
    this.tipo = event.target.value;
    if (this.tipo == 0) {
      this.procedencia = "";
      this.registrar = false;
      this.visualizar = false;
      this.actualizar = false;
      this.eliminar = false;
      this.mostrarLocal = true;
      this.mostrarSectores = false;
      this.mostrarOperadores = false;
      this.sectorSeleccionado = 0;
      this.operadorSeleccionado = 0;
    }
    if (this.tipo == 1) {
      this.procedencia = "Dirección Nacional de Inteligencia";
      this.registrar = true;
      this.visualizar = true;
      this.actualizar = true;
      this.eliminar = true;
      this.mostrarLocal = true;
      this.mostrarSectores = false;
      this.mostrarOperadores = false;
      this.sectorSeleccionado = 0;
      this.operadorSeleccionado = 0;
    }
    if (this.tipo == 2) {
      this.procedencia = "Equipo de Trabajo de Activos Críticos Nacionales - DICI";
      this.registrar = true;
      this.visualizar = true;
      this.actualizar = true;
      this.eliminar = true;
      this.mostrarLocal = true;
      this.mostrarSectores = false;
      this.mostrarOperadores = false;
      this.sectorSeleccionado = 0;
      this.operadorSeleccionado = 0;
    }
    if (this.tipo == 3 || this.tipo == 4) {
      this.procedencia = "";
      this.registrar = true;
      this.visualizar = true;
      this.actualizar = false;
      this.eliminar = false;
      this.mostrarLocal = false;
      if (this.tipo == 3) {
        this.mostrarSectores = true;
        this.mostrarOperadores = false;
        this.operadorSeleccionado = 0;
      }
      else {
        this.mostrarSectores = false;
        this.mostrarOperadores = true;
        this.sectorSeleccionado = 0;
      }
    }
  }*/




  /*private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async cerrarModalAgregarDocumento2() {
    $("#asignarDocumento").modal("hide");
    this.documentoAnexo = new Documento();
    this.documentoAnexo.nombre_documento = this.nombreDocumento;
    this.documentoAnexo.url_documento = this.documento;

    this.documentos.push(this.documentoAnexo);

    //$("#asignarFuncionario").css("display", "none");
    swal.fire({
      title: 'Procesando',
      imageUrl: '../../../../assets/img/loading4.gif',
      imageWidth: 125,
      imageHeight: 125,
      imageAlt: 'Custom image',
      showConfirmButton: false,
      timer: 3000,
      allowOutsideClick: false
    })

    await this.delay(3000);

    if(this.documento.substring(0,28)=='data:application/pdf;base64,'){
      let cadena = this.documento.substring(28);
      var obj = document.getElementById('documento' + this.documentos.length);
      var link = document.createElement('a');
      link.innerHTML = this.nombreDocumento + '.pdf';
      link.download = this.nombreDocumento + '.pdf';
      link.href = 'data:application/octet-stream;base64,' + cadena;
      obj.appendChild(link);
    }

    if(this.documento.substring(0,23)=='data:image/jpeg;base64,'){
      let cadena = this.documento.substring(23);
      var obj = document.getElementById('documento' + this.documentos.length);
      var link = document.createElement('a');
      link.innerHTML = this.nombreDocumento + '.jpg';
      link.download = this.nombreDocumento + '.jpg';
      link.href = 'data:image/jpeg;base64,' + cadena;
      obj.appendChild(link);
    }

    if(this.documento.substring(0,84)=='data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,'){
      let cadena = this.documento.substring(84);
      var obj = document.getElementById('documento' + this.documentos.length);
      var link = document.createElement('a');
      link.innerHTML = this.nombreDocumento + '.docx';
      link.download = this.nombreDocumento + '.docx';
      link.href = 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,' + cadena;
      obj.appendChild(link);
    }

    if(this.documento.substring(0,78)=='data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,'){
      let cadena = this.documento.substring(78);
      var obj = document.getElementById('documento' + this.documentos.length);
      var link = document.createElement('a');
      link.innerHTML = this.nombreDocumento + '.xlsx';
      link.download = this.nombreDocumento + '.xlsx';
      link.href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + cadena;
      obj.appendChild(link);
    }

    this.documento = '';
    this.nombreDocumento = '';
    this.adicional = this.adicional + 1;

    $("#documentoAnexo").val("");
  }

  comprobarExtension() {
    var ext = $('#documentoAnexo').val().split('.').pop();
    if ($('#documentoAnexo').val() != '') {
      if (ext == "pdf" || ext == "jpg" || ext == "docx" || ext == "xlsx") {
        if ($('#documentoAnexo')[0].files[0].size > 1048576 * 20) {
          this.toastr.error('El documento excede los 20MB', 'Error de tamaño');
          $('#documentoAnexo').val('');
        } else {
          this.toastr.info('Documento válido', 'Procesando');
          convertToBase64Simple('documentoAnexo');
          swal.fire({
            title: 'Cargando archivo',
            imageUrl: '../../../../assets/img/loading4.gif',
            imageWidth: 125,
            imageHeight: 125,
            imageAlt: 'Custom image',
            showConfirmButton: false,
            timer: 3000,
            allowOutsideClick: false
          })

          await this.delay(3000);

          this.documento = getBase64Simple();
          console.log(this.documento);
          this.toastr.success('Documento listo', 'Procesado');
        }
      }
      else {
        this.documento = '';
        $('#documentoAnexo').val('');
        this.toastr.error('Sólo pdf, jpg, docx, xlsx', 'Error de formato');
      }
    }
  }*/

  //METODOS DEDICADOS A LOS DOCUMENTOS ADJUNTOS
  comprobarExtension() {
    for (let i = 0; i < this.archivos.length; i++) {
      let nombre = this.archivos[i].name;
      let extension = nombre.split('.').pop();
      if (extension == "pdf" ||
        extension == "jpg" ||
        extension == "png" ||
        extension == "doc" ||
        extension == "docx" ||
        extension == "xlsx" ||
        extension == "xls" ||
        extension == "ppt" ||
        extension == "pptx" ||
        extension == "txt" ||
        extension == "mp4") {
        if (this.archivos[i].size > 1048576 * 1000) {
          this.toastr.error('El documento excede los 20MB', nombre + ' eliminado');
          this.archivos.splice(i, 1);
        }
      }
      else {
        this.toastr.error('Formato no permitido', nombre + ' eliminado');
        this.archivos.splice(i, 1);
      }
    }
  }

  abrirModalAgregarDocumento() {
    $("#asignarDocumento").modal("show");
  }

  /*cerrarModalAgregarDocumento() {
    $("#asignarDocumento").modal("hide");

    if (this.archivos.length != 0) {

      swal.fire({
        title: '¿Estás seguro de continuar?',
        text: "Los documentos quedarán almacenados en el sistema",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          this.obtenerFechas();

          this.servicio.recuperarCodigo(1).subscribe(data => {
            this.codigo = data;
            let numero2 = this.codigo.documentos;

            this.totalArchivos = this.archivos.length;
            if (this.totalArchivos > 0) {
              this.abrirModalBarraProgreso();

              for (let i = 0; i < this.archivos.length; i++) {
                let documento = new Documento();
                documento.codigo_documento = this.servicio.generarCodigo(numero2 + 1, "DOC");
                documento.codigo_referencia = this.usuario.codigo_usuario;
                documento.nombre_documento = this.archivos[i].name;
                documento.fecha_documento = this.fechas[i];
                let url = this.fileServer.dir_file_server + "usuarios/" + this.usuario.codigo_usuario;
                documento.dir_documento = this.fileServer.dir_file_server + "usuarios/" + this.usuario.codigo_usuario + "/" + documento.codigo_documento + "_" + this.archivos[i].name;
                documento.url_documento = this.fileServer.url_file_server + "usuarios/" + this.usuario.codigo_usuario + "/" + documento.codigo_documento + "_" + this.archivos[i].name;
                documento.estado_documento = 1;
                documento.tipo_documento = 5;

                documento.id_usuario_creacion = Number(sessionStorage.getItem('IdKey'));
                documento.ip_creacion = sessionStorage.getItem("LOCAL_IP");
                documento.id_usuario_modificacion = null;
                documento.ip_modificacion = null;

                this.documentosServicio.alta(documento).subscribe();
                numero2 = numero2 + 1;
                this.codigo.documentos = numero2;
                this.servicio.modificacionCodigo(1, this.codigo).subscribe();

                let bitacora: Bitacora = new Bitacora();
                bitacora.nombreUsuario = this.tokenService.getName();
                bitacora.codigo_usuario = this.tokenService.getCodigo();
                bitacora.id_usuario = Number(this.tokenService.getId());
                bitacora.accion = 2;
                bitacora.tipoAccion = 6;
                bitacora.descripcion = "Almacenó " + documento.dir_documento;
                bitacora.contenidoInicial = JSON.stringify(documento);
                bitacora.contenidoModificado = "";
                bitacora.ip = sessionStorage.getItem("LOCAL_IP");
                this.bitacorasServicio.alta(bitacora).subscribe();

                this.currentFileUpload = this.archivos[i];
                this.nombreArchivo = this.archivos[i].name;
                this.porcentajeArchivo = 0;

                this.archivosService.pushFileToStorage(this.currentFileUpload, url, documento.dir_documento.toString()).subscribe(event => {
                  if (event.type === HttpEventType.UploadProgress) {
                    this.porcentajeArchivo = Math.round(100 * event.loaded / event.total);
                  } else if (event instanceof HttpResponse) {
                    this.toastr.success("Completado", String(event.body));
                    this.totalArchivosProcesados = this.totalArchivosProcesados + 1;
                  }
                });
              }

            }

          }, error => {
            swal.fire(
              'Error',
              'No se pudo realizar la operación solicitada',
              'error'
            )
          });
        }
        else{
          $("#asignarDocumento").modal("show");
        }
      });

    }

  }

  cerrarModalAgregarDocumento2() {
    $("#asignarDocumento").modal("hide");
    this.fechas = [];
    this.archivos = [];
  }

  obtenerFechas() {
    this.fechas = [];
    for (let i = 0; i < this.archivos.length; i++) {
      this.fechas.push($("#fecha" + (i + 1)).val());
    }
  }

  onSelectDocumentos(event) {
    this.archivos.push(...event.addedFiles);
    this.comprobarExtension();

    let diferencia = this.archivos.length - this.fechas.length;
    for (let i = 0; i < diferencia; i++) {
      this.fechas.push("");
    }
  }

  onRemoveDocumentos(event: any, k: number) {
    this.fechas.splice(k, 1);
    this.archivos.splice(this.archivos.indexOf(event), 1);
  }

  abrirModalBarraProgreso() {
    $("#barraProgreso").modal("show");
  }

  cerrarModalBarraProgreso() {
    $("#barraProgreso").modal("hide");

    this.archivos = [];
    this.fechas = [];

    this.documentosServicio.recuperarPorReferenciaYTipo(this.usuario.codigo_usuario, 5).subscribe(docs => {
      this.documentos = docs;
      this.posicion = this.documentos.length;
      for (let k = 0; k < this.documentos.length; k++) {
        if (this.documentos[k].fecha_documento == null) {
          this.documentos[k].fecha_documento = "Sin registro";
        }
        else {
          this.documentos[k].fecha_documento = this.documentos[k].fecha_documento.substr(8, 2) + "-" +
            this.documentos[k].fecha_documento.substr(5, 2) + "-" +
            this.documentos[k].fecha_documento.substr(0, 4);
        }
      }

    })
  }

  editarFechaDocumento(index: number) {
    $("#mostrarDocumentos").modal("hide");
    $("#editarFechaDocumento").modal("show");
    this.documento = this.documentos[index];
  }

  cerrarModalEditarFechaDocumento() {
    $("#editarFechaDocumento").modal("hide");
    $("#mostrarDocumentos").modal("show");
    this.documento = new Documento();
  }

  cerrarModalEditarFechaDocumento2() {

    swal.fire({
      title: '¿Estás seguro de continuar?',
      text: "La fecha quedará actualizada en el sistema",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {

        let bitacora: Bitacora = new Bitacora();
        bitacora.nombreUsuario = this.tokenService.getName();
        bitacora.codigo_usuario = this.tokenService.getCodigo();
        bitacora.id_usuario = Number(this.tokenService.getId());
        bitacora.accion = 3;
        bitacora.tipoAccion = 6;
        bitacora.descripcion = "Actualizó la fecha del documento " + this.documento.dir_documento;
        bitacora.contenidoInicial = JSON.stringify(this.documento);
        bitacora.ip = sessionStorage.getItem("LOCAL_IP");

        this.documento.fecha_documento = $("#fechaNueva").val();


        this.documentosServicio.modificacion(this.documento.id_documento, this.documento).subscribe(data => {

          bitacora.contenidoModificado = JSON.stringify(data);
          this.bitacorasServicio.alta(bitacora).subscribe();

          this.documentosServicio.recuperarPorReferenciaYTipo(this.usuario.codigo_usuario, 5).subscribe(docs => {
            this.documentos = docs;
            this.posicion = this.documentos.length;
            for (let k = 0; k < this.documentos.length; k++) {
              if (this.documentos[k].fecha_documento == null) {
                this.documentos[k].fecha_documento = "Sin registro";
              }
              else {
                this.documentos[k].fecha_documento = this.documentos[k].fecha_documento.substr(8, 2) + "-" +
                  this.documentos[k].fecha_documento.substr(5, 2) + "-" +
                  this.documentos[k].fecha_documento.substr(0, 4);
              }
            }

          })

          swal.fire(
            'Fecha Actualizada',
            'Los datos fueron actualizados con éxito',
            'success'
          );

          this.documento = new Documento();
          $("#editarFechaDocumento").modal("hide");
          $("#mostrarDocumentos").modal("show");
        });
      }
    });
  }

  eliminarDocumento(index: number) {
    this.documento = this.documentos[index];
    swal.fire({
      title: '¿Estás seguro de continuar?',
      text: "Se eliminará el documento seleccionado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {

        this.documentosServicio.recuperar(this.documento.id_documento).subscribe(doc => {

          let documentoRecuperado: Documento = doc;

          let bitacora: Bitacora = new Bitacora();
          bitacora.nombreUsuario = this.tokenService.getName();
          bitacora.codigo_usuario = this.tokenService.getCodigo();
          bitacora.id_usuario = Number(this.tokenService.getId());
          bitacora.accion = 4;
          bitacora.tipoAccion = 6;
          bitacora.descripcion = "Deshabilitó el documento " + this.documento.dir_documento;
          bitacora.contenidoInicial = JSON.stringify(documentoRecuperado);
          bitacora.ip = sessionStorage.getItem("LOCAL_IP");

          documentoRecuperado.estado_documento = 0;
          documentoRecuperado.id_usuario_modificacion = Number(sessionStorage.getItem('IdKey'));
          documentoRecuperado.ip_modificacion = sessionStorage.getItem("LOCAL_IP");

          this.documentosServicio.modificacion(this.documento.id_documento, documentoRecuperado).subscribe(data => {

            bitacora.contenidoModificado = JSON.stringify(data);
            this.bitacorasServicio.alta(bitacora).subscribe();

            this.documentosServicio.recuperarPorReferenciaYTipo(this.usuario.codigo_usuario, 5).subscribe(docs => {
              this.documentos = docs;
              this.posicion = this.documentos.length;
              for (let k = 0; k < this.documentos.length; k++) {
                if (this.documentos[k].fecha_documento == null) {
                  this.documentos[k].fecha_documento = "Sin registro";
                }
                else {
                  this.documentos[k].fecha_documento = this.documentos[k].fecha_documento.substr(8, 2) + "-" +
                    this.documentos[k].fecha_documento.substr(5, 2) + "-" +
                    this.documentos[k].fecha_documento.substr(0, 4);
                }
              }

            })

            this.documento = new Documento();

            swal.fire(
              'Documento Eliminado',
              'El Documento fue eliminado con éxito',
              'success'
            );
          });
        });
      }
    });
  }
  //FIN DE MÉTODOS DEDICAS A ADJUNTAR DOCUMENTOS NUEVOS


  //MÉTODOS DEDICADOS A MOSTRAR LOS DOCUMENTOS YA ALMACENADOS PARA EL OBJ. NACIONAL
  abrirModalMostrarDocumentos() {
    $("#mostrarDocumentos").modal("show");
  }

  cerrarModalMostrarDocumentos() {
    $("#mostrarDocumentos").modal("hide");
  }
  //FIN DE METODOS PARA EL MOSTRADO DE DOCUMENTOS

  descargarArchivo(i: number) {
    let nombre = this.documentos[i].nombre_documento;

    var element = document.createElement('a');
    element.setAttribute('target', '_blank');
    element.setAttribute('href', this.documentos[i].url_documento.toString());
    element.setAttribute('download', nombre.toString());
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }


  abrirModalEditarPersona() {
    this.funcionario2 = JSON.parse(JSON.stringify(this.funcionario));
    $("#editarPersona").modal("show");
  }

  cerrarModalEditarPersona() {
    $("#editarPersona").modal("hide");
  }

  cerrarModalEditarPersona2() {
    if ((!this.servicio.caracteresEspacio(this.funcionario2.nombres_persona) || this.funcionario2.nombres_persona.length == 0) ||
      (!this.servicio.caracteresEspacio(this.funcionario2.paterno_persona) || this.funcionario2.paterno_persona.length == 0) ||
      (!this.servicio.caracteresEspacio(this.funcionario2.materno_persona) || this.funcionario2.materno_persona.length == 0) ||
      (this.funcionario2.dni_persona.length != 8 || !this.servicio.soloNumeros(this.funcionario2.dni_persona))) {
      swal.fire(
        'Verificar',
        'Campos incorrectos o vacios',
        'error'
      )
    }
    else {
      swal.fire({
        title: '¿Está seguro de continuar?',
        text: "Los datos quedarán registrados en el sistema",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {

          if (this.funcionario.dni_persona == this.funcionario2.dni_persona &&
            this.funcionario.nombres_persona == this.funcionario2.nombres_persona &&
            this.funcionario.paterno_persona == this.funcionario2.paterno_persona &&
            this.funcionario.materno_persona == this.funcionario2.materno_persona) {
            swal.fire(
              'Información',
              'No hay datos para actualizar',
              'info'
            );
          }
          else {
            this.funcionariosServicio.recuperarCoincidenciasDni(this.funcionario2.dni_persona, this.funcionario2.id_persona).subscribe(funcis => {
              if (funcis.length == 0) {
                this.funcionario2.imagen_persona = "";
                this.funcionario2.ip_modificacion = "";

                let nombre =this.funcionario2.paterno_persona+" "+this.funcionario2.materno_persona+", "+this.funcionario2.nombres_persona;
                let nombreInicial = this.funcionario.paterno_persona+" "+this.funcionario.materno_persona+", "+this.funcionario.nombres_persona;
                if (nombre != nombreInicial) {
                  this.usuariosServicio.actualizarBitacoras(nombre, nombreInicial).subscribe();
                }

                this.funcionariosServicio.modificacion(this.funcionario2.id_persona, this.funcionario2).subscribe(data => {


                  let bitacora: Bitacora = new Bitacora();
                  bitacora.nombreUsuario = this.tokenService.getName();
                  if(bitacora.nombreUsuario == nombreInicial){
                    bitacora.nombreUsuario = nombre;
                  }
                  bitacora.codigo_usuario = this.tokenService.getCodigo();
                  bitacora.id_usuario = Number(this.tokenService.getId());
                  bitacora.accion = 3;
                  bitacora.tipoAccion = 3;
                  bitacora.descripcion = "Actualizó los datos del funcionario: " + data.dni_persona + "-" + data.nombres_persona + " " + data.paterno_persona + " " + data.materno_persona;
                  bitacora.contenidoInicial = JSON.stringify(this.funcionario);
                  bitacora.contenidoModificado = JSON.stringify(data);
                  bitacora.ip = sessionStorage.getItem("LOCAL_IP");
                  this.bitacorasServicio.alta(bitacora).subscribe();

                  this.funcionario = data;
                  this.dni = this.funcionario.dni_persona;
                  this.nombres = this.funcionario.nombres_persona;
                  this.materno = this.funcionario.paterno_persona;
                  this.paterno = this.funcionario.paterno_persona;

                  $("#editarPersona").modal("hide");

                  swal.fire(
                    'Persona Actualizada',
                    'Los datos de la persona se actualizaron con éxito',
                    'success'
                  );
                });
              }
              else {
                swal.fire(
                  'Error',
                  'Ya hay otra persona con este DNI',
                  'error'
                );
              }
            });
          }

        }
      });
    }
  }*/
}
