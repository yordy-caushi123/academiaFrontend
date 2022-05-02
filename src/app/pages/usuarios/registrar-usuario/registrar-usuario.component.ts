import { Component, OnInit, NgZone } from '@angular/core';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { Usuario } from '../../../entidades/usuario';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { AppService } from 'src/app/servicios/app.service';
import swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';
import { Documento } from 'src/app/entidades/documento';
import { DocumentosService } from 'src/app/servicios/documentos.service';;
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ArchivosService } from 'src/app/servicios/archivos.service';
import { NuevoUsuario } from 'src/app/modelos/nuevo-usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { Bitacora } from 'src/app/entidades/bitacora';
import { BitacorasService } from 'src/app/servicios/bitacoras.service';
import { TokenService } from 'src/app/servicios/token.service';

declare const $: any;
declare const getBase64Simple: any;
declare const convertToBase64Simple: any;

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.scss']
})
export class RegistrarUsuarioComponent implements OnInit {

  usuario = new Usuario();
  usuario2 = new NuevoUsuario();
  usuarios: Observable<Usuario[]>;

  dni: String = '';
  nombres: String = '';
  paterno: String = '';
  materno: String = '';
  tipo: number = 0;
  fijo: String = '';
  anexo: String = '';
  movil: String = '';
  movil2: String = '';
  correo: String = '';
  estado: number = 1;
  username: String = '';
  procedencia: String = '';
  sectorSeleccionado: number = 0;
  operadorSeleccionado: number = 0;
  fechaAlta: String = '';
  fechaBaja: String = '';
  contrasena: String = '';

  //documento es la imagen del usuario
  imagen: String = '';
  mostrarImagen: boolean = false;

  mostrarLocal: boolean = true;
  mostrarSectores: boolean = false;
  mostrarOperadores: boolean = false;
  mostrarCampos: boolean = false;
  mostrarPersonales: boolean = false;

  documentos: Documento[] = [];
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

  constructor(private usuariosServicio: UsuariosService,
    private router: Router,
    public servicio: AppService,
    public toastr: ToastrService,
    private documentosServicio: DocumentosService,
    private archivosService: ArchivosService,
    private authServicio: AuthService,
    private tokenService: TokenService,
    private bitacorasServicio: BitacorasService) { }

  ngOnInit() {
    $(".modal").modal("hide");
  }

  sacaPaterno(event: any) {
    this.username = '';
    if (this.nombres.length == 0) {
      this.username = event.target.value;
      this.username = this.username.toUpperCase();
      this.username = this.username.replace(/ /g, "");
      this.username = this.username.replace(/Á/g, "A");
      this.username = this.username.replace(/É/g, "E");
      this.username = this.username.replace(/Í/g, "I");
      this.username = this.username.replace(/Ó/g, "O");
      this.username = this.username.replace(/Ú/g, "U");
    }
    else {
      this.username = this.nombres[0] + event.target.value;
      this.username = this.username.toUpperCase();
      this.username = this.username.replace(/ /g, "");
      this.username = this.username.replace(/Á/g, "A");
      this.username = this.username.replace(/É/g, "E");
      this.username = this.username.replace(/Í/g, "I");
      this.username = this.username.replace(/Ó/g, "O");
      this.username = this.username.replace(/Ú/g, "U");

      this.usuariosServicio.recuperarCoincidenciasNombreUsuario(this.username).subscribe(usus => {
        if (usus.length != 0) {
          this.username = this.username + usus.length;
          this.username = this.username.toUpperCase();
          this.username = this.username.replace(/ /g, "");
          this.username = this.username.replace(/Á/g, "A");
          this.username = this.username.replace(/É/g, "E");
          this.username = this.username.replace(/Í/g, "I");
          this.username = this.username.replace(/Ó/g, "O");
          this.username = this.username.replace(/Ú/g, "U");
        }
      });
    }
  }

  /*alta() {

    if((!this.servicio.caracteresEspacio(this.nombres) || this.nombres.length==0) ||
      (!this.servicio.caracteresEspacio(this.paterno) || this.paterno.length==0) ||
      (!this.servicio.caracteresEspacio(this.materno) || this.materno.length==0) ||
      this.tipo==0 ||
      (this.servicio.esEmail(this.correo) || this.correo.length==0) ||
      ((this.fijo.length!=0 && this.fijo.length!=7 && this.fijo.length!=8 && this.fijo.length!=9) || !this.servicio.soloNumeros(this.fijo)) ||
      ((this.anexo.length!=0  && this.anexo.length!=1 && this.anexo.length!=2 && this.anexo.length!=3 && this.anexo.length!=4) || !this.servicio.soloNumeros(this.anexo)) ||
      (!this.servicio.soloNumeros(this.movil) || this.movil.length!=9) ||
      ((this.movil2.length!=0 && this.movil2.length!=9) || !this.servicio.soloNumeros(this.movil2)) ||
      this.fechaAlta.length==0 ||
      (this.procedencia.length==0 && this.sectorSeleccionado==0 && this.operadorSeleccionado==0))
    {
      swal.fire(
        'Verificar',
        'Campos incorrectos o vacios',
        'error'
      )
    }
    else{
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

          this.usuarioFuncionario.procedencia_usuario_persona = this.procedencia;
          this.usuarioFuncionario.movil_usuario_persona = this.movil;
          this.usuarioFuncionario.correo_usuario_persona = this.correo;
          this.usuarioFuncionario.movil2_usuario_persona = this.movil2;
          this.usuarioFuncionario.fijo_usuario_persona = this.fijo;
          this.usuarioFuncionario.anexo_usuario_persona = this.anexo;
          this.usuarioFuncionario.fecha_alta_usuario_persona = this.fechaAlta;
          this.usuarioFuncionario.fecha_baja_usuario_persona = this.fechaBaja;
          this.usuarioFuncionario.id_usuario_creacion = Number(sessionStorage.getItem('IdKey'));
          this.usuarioFuncionario.ip_creacion = sessionStorage.getItem("LOCAL_IP");
          this.usuarioFuncionario.id_usuario_creacion = null;
          this.usuarioFuncionario.ip_creacion = null;

          if (this.usuario == null) {
            this.usuario2 = new NuevoUsuario();

            let numero = this.codigo.usuarios;
            let numero2 = this.codigo.funcionarios;
            let numero3 = this.codigo.documentos;

            this.usuario2.codigo_usuario = this.servicio.generarCodigo(numero + 1, "USU");
            this.usuario2.tipo_usuario = this.tipo;
            this.usuario2.estado_usuario = 1;
            this.usuario2.nombre_usuario = this.username;
            this.usuario2.contrasena_usuario = this.username;
            this.usuario2.roles = [];
            if (this.usuario2.tipo_usuario == 1) {
              this.usuario2.roles.push("administrador");
            }
            if (this.usuario2.tipo_usuario == 2) {
              this.usuario2.roles.push("coordinador");
            }
            if (this.usuario2.tipo_usuario == 3) {
              this.usuario2.roles.push("sector");
            }
            if (this.usuario2.tipo_usuario == 4) {
              this.usuario2.roles.push("operador");
            }
            this.usuario2.id_usuario_creacion = Number(sessionStorage.getItem('IdKey'));
            this.usuario2.ip_creacion = sessionStorage.getItem("LOCAL_IP");
            this.usuario2.id_usuario_modificacion = null;
            this.usuario2.ip_modificacion = null;

            if (this.funcionario == null) {
              this.funcionario = new Persona();
              this.funcionario.codigo_persona = this.servicio.generarCodigo(numero2 + 1, "FUN");
              this.funcionario.dni_persona = this.dni;
              this.funcionario.nombres_persona = this.nombres;
              this.funcionario.paterno_persona = this.paterno;
              this.funcionario.materno_persona = this.materno;
              this.funcionario.imagen_persona = this.imagen;
              this.funcionario.id_usuario_creacion = Number(sessionStorage.getItem('IdKey'));
              this.funcionario.ip_creacion = sessionStorage.getItem("LOCAL_IP");
              this.funcionario.id_usuario_modificacion = null;
              this.funcionario.ip_modificacion = null;
              this.funcionariosServicio.alta(this.funcionario).subscribe( f=>{

                this.codigo.funcionarios = numero2 + 1;
                this.servicio.modificacionCodigo(1, this.codigo).subscribe();

                let bitacora: Bitacora = new Bitacora();
                bitacora.nombreUsuario = this.tokenService.getName();
                bitacora.codigo_usuario = this.tokenService.getCodigo();
                bitacora.id_usuario = Number(this.tokenService.getId());
                bitacora.accion = 2;
                bitacora.tipoAccion = 3;
                bitacora.descripcion = "Registró al funcionario "+f.dni_persona+"-"+ f.nombres_persona+" "+f.paterno_persona+" "+f.materno_persona;
                bitacora.contenidoInicial = JSON.stringify(f);
                bitacora.contenidoModificado = "";
                bitacora.ip = sessionStorage.getItem("LOCAL_IP");
                this.bitacorasServicio.alta(bitacora).subscribe();

                this.usuario2.codigo_persona = f.codigo_persona;
                this.usuario2.id_persona = f.id_persona;

                this.authServicio.registro(this.usuario2).subscribe(data => {

                  let bitacora: Bitacora = new Bitacora();
                  bitacora.nombreUsuario = this.tokenService.getName();
                  bitacora.codigo_usuario = this.tokenService.getCodigo();
                  bitacora.id_usuario = Number(this.tokenService.getId());
                  bitacora.accion = 2;
                  bitacora.tipoAccion = 4;
                  bitacora.descripcion = "Registró al usuario "+data.codigo_usuario+"-"+ data.nombreUsuario;
                  bitacora.contenidoInicial = JSON.stringify(data);
                  bitacora.contenidoModificado = "";
                  bitacora.ip = sessionStorage.getItem("LOCAL_IP");
                  this.bitacorasServicio.alta(bitacora).subscribe();

                  this.codigo.usuarios = numero + 1;
                  this.servicio.modificacionCodigo(1, this.codigo).subscribe();

                  this.usuarioFuncionario.id_usuario_persona = null;
                  this.usuarioFuncionario.codigo_usuario = data.codigo_usuario;
                  this.usuarioFuncionario.id_usuario = data.id_usuario;
                  this.usuarioFuncionario.estado_usuario_persona = 1;
                  this.usuariosFuncionariosServicio.alta(this.usuarioFuncionario).subscribe( usuFun => {

                    let bitacora: Bitacora = new Bitacora();
                    bitacora.nombreUsuario = this.tokenService.getName();
                    bitacora.codigo_usuario = this.tokenService.getCodigo();
                    bitacora.id_usuario = Number(this.tokenService.getId());
                    bitacora.accion = 2;
                    bitacora.tipoAccion = 5;
                    bitacora.descripcion = "Registró los datos del usuario: "+data.codigo_usuario+"-"+data.nombreUsuario;
                    bitacora.contenidoInicial = JSON.stringify(usuFun);
                    bitacora.contenidoModificado = "";
                    bitacora.ip = sessionStorage.getItem("LOCAL_IP");
                    this.bitacorasServicio.alta(bitacora).subscribe();

                    if (this.totalArchivos == 0) {
                      this.gotoList();
                      swal.fire(
                        'Usuario Registrado',
                        'Los datos fueron registrados con éxito',
                        'success'
                      )
                    }
                  });

                  this.totalArchivos = this.archivos.length;
                  if (this.totalArchivos > 0) {
                    this.abrirModalBarraProgreso();

                    for (let i = 0; i < this.archivos.length; i++) {
                      let documento = new Documento();
                      documento.codigo_documento = this.servicio.generarCodigo(numero3 + 1, "DOC");
                      documento.codigo_referencia = this.usuario2.codigo_usuario;
                      documento.nombre_documento = this.archivos[i].name;
                      documento.fecha_documento = this.fechas[i];
                      let url= this.fileServer.dir_file_server+"usuarios/" + this.usuario2.codigo_usuario;
                      documento.dir_documento = this.fileServer.dir_file_server+"usuarios/" + this.usuario2.codigo_usuario+"/"+documento.codigo_documento+"_"+this.archivos[i].name;
                      documento.url_documento = this.fileServer.url_file_server+"usuarios/" + this.usuario2.codigo_usuario+"/"+documento.codigo_documento+"_"+this.archivos[i].name;
                      documento.estado_documento = 1;
                      documento.tipo_documento = 5;

                      documento.id_usuario_creacion = Number(sessionStorage.getItem('IdKey'));
                      documento.ip_creacion = sessionStorage.getItem("LOCAL_IP");
                      documento.id_usuario_modificacion = null;
                      documento.ip_modificacion = null;

                      this.documentosServicio.alta(documento).subscribe();
                      numero3 = numero3 + 1;
                      this.codigo.documentos = numero3;
                      this.servicio.modificacionCodigo(1, this.codigo).subscribe();

                      let bitacora: Bitacora = new Bitacora();
                      bitacora.nombreUsuario = this.tokenService.getName();
                      bitacora.codigo_usuario = this.tokenService.getCodigo();
                      bitacora.id_usuario = Number(this.tokenService.getId());
                      bitacora.accion = 2;
                      bitacora.tipoAccion = 6;
                      bitacora.descripcion = "Almacenó "+documento.dir_documento;
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
                    'Los datos no fueron registrados ',
                    'error'
                  )

                });
              });

            }
            else{
              this.usuario2.codigo_persona = this.funcionario.codigo_persona;
              this.usuario2.id_persona = this.funcionario.id_persona;

              this.authServicio.registro(this.usuario2).subscribe(data => {
                this.codigo.usuarios = numero + 1;
                this.servicio.modificacionCodigo(1, this.codigo).subscribe();

                let bitacora: Bitacora = new Bitacora();
                bitacora.nombreUsuario = this.tokenService.getName();
                bitacora.codigo_usuario = this.tokenService.getCodigo();
                bitacora.id_usuario = Number(this.tokenService.getId());
                bitacora.accion = 2;
                bitacora.tipoAccion = 4;
                bitacora.descripcion = "Registró al usuario "+data.codigo_usuario+"-"+ data.nombreUsuario;
                bitacora.contenidoInicial = JSON.stringify(data);
                bitacora.contenidoModificado = "";
                bitacora.ip = sessionStorage.getItem("LOCAL_IP");
                this.bitacorasServicio.alta(bitacora).subscribe();

                this.usuarioFuncionario.id_usuario_persona = null;
                this.usuarioFuncionario.codigo_usuario = data.codigo_usuario;
                this.usuarioFuncionario.id_usuario = data.id_usuario;
                this.usuarioFuncionario.estado_usuario_persona = 1;
                this.usuariosFuncionariosServicio.alta(this.usuarioFuncionario).subscribe( usuFun => {

                  let bitacora: Bitacora = new Bitacora();
                  bitacora.nombreUsuario = this.tokenService.getName();
                  bitacora.codigo_usuario = this.tokenService.getCodigo();
                  bitacora.id_usuario = Number(this.tokenService.getId());
                  bitacora.accion = 2;
                  bitacora.tipoAccion = 5;
                  bitacora.descripcion = "Registró los datos del usuario: " + data.codigo_usuario + "-" + data.nombreUsuario;
                  bitacora.contenidoInicial = JSON.stringify(usuFun);
                  bitacora.contenidoModificado = "";
                  bitacora.ip = sessionStorage.getItem("LOCAL_IP");
                  this.bitacorasServicio.alta(bitacora).subscribe();

                  if (this.totalArchivos == 0) {
                    this.gotoList();
                    swal.fire(
                      'Usuario Registrado',
                      'Los datos fueron registrados con éxito',
                      'success'
                    )
                  }
                });

                this.totalArchivos = this.archivos.length;
                if (this.totalArchivos > 0) {
                  this.abrirModalBarraProgreso();

                  for (let i = 0; i < this.archivos.length; i++) {
                    let documento = new Documento();
                    documento.codigo_documento = this.servicio.generarCodigo(numero3 + 1, "DOC");
                    documento.codigo_referencia = this.usuario2.codigo_usuario;
                    documento.nombre_documento = this.archivos[i].name;
                    documento.fecha_documento = this.fechas[i];
                    let url= this.fileServer.dir_file_server+"usuarios/" + this.usuario2.codigo_usuario;
                    documento.dir_documento = this.fileServer.dir_file_server+"usuarios/" + this.usuario2.codigo_usuario+"/"+documento.codigo_documento+"_"+this.archivos[i].name;
                    documento.url_documento = this.fileServer.url_file_server+"usuarios/" + this.usuario2.codigo_usuario+"/"+documento.codigo_documento+"_"+this.archivos[i].name;
                    documento.estado_documento = 1;
                    documento.tipo_documento = 5;

                    documento.id_usuario_creacion = Number(sessionStorage.getItem('IdKey'));
                    documento.ip_creacion = sessionStorage.getItem("LOCAL_IP");
                    documento.id_usuario_modificacion = null;
                    documento.ip_modificacion = null;

                    this.documentosServicio.alta(documento).subscribe();
                    numero3 = numero3 + 1;
                    this.codigo.documentos = numero3;
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
                  'Los datos no fueron registrados ',
                  'error'
                )

              });
            }
          }
          else {
            //como ya existe este usuario y se cargo los datos, solo se establecen los que se ha ingresado desde teclado
            this.usuario.tipo_usuario = this.tipo
            this.usuario.nombreUsuario = this.username;
            this.usuario.contrasena_usuario = this.contrasena;
            this.usuario.estado_usuario = 1;
            this.usuario.conexion_usuario = 0;
            this.usuario.roles = [];
            if (this.usuario.tipo_usuario == 1) {
              this.usuario.roles.push("administrador");
            }
            if (this.usuario.tipo_usuario == 2) {
              this.usuario.roles.push("coordinador");
            }
            if (this.usuario.tipo_usuario == 3) {
              this.usuario.roles.push("sector");
            }
            if (this.usuario.tipo_usuario == 4) {
              this.usuario.roles.push("operador");
            }

            this.usuarioFuncionario.id_usuario_persona = null;
            this.usuarioFuncionario.codigo_usuario = this.usuario.codigo_usuario;
            this.usuarioFuncionario.id_usuario = this.usuario.id_usuario;
            this.usuarioFuncionario.estado_usuario_persona = 1;
            this.usuariosFuncionariosServicio.alta(this.usuarioFuncionario).subscribe(usuFun => {

              let bitacora: Bitacora = new Bitacora();
              bitacora.nombreUsuario = this.tokenService.getName();
              bitacora.codigo_usuario = this.tokenService.getCodigo();
              bitacora.id_usuario = Number(this.tokenService.getId());
              bitacora.accion = 2;
              bitacora.tipoAccion = 5;
              bitacora.descripcion = "Registró los datos del usuario: " + usuFun.codigo_usuario + "-" + this.usuario.nombreUsuario;
              bitacora.contenidoInicial = JSON.stringify(usuFun);
              bitacora.contenidoModificado = "";
              bitacora.ip = sessionStorage.getItem("LOCAL_IP");
              this.bitacorasServicio.alta(bitacora).subscribe();

              if (this.totalArchivos == 0) {
                this.gotoList();
                swal.fire(
                  'Usuario Registrado',
                  'Los datos fueron registrados con éxito',
                  'success'
                )
              }
            });

            let numero2 = this.codigo.funcionarios;
            let numero3 = this.codigo.documentos;

            this.totalArchivos = this.archivos.length;
            if (this.totalArchivos > 0) {
              this.abrirModalBarraProgreso();

              for (let i = 0; i < this.archivos.length; i++) {
                let documento = new Documento();
                documento.codigo_documento = this.servicio.generarCodigo(numero3 + 1, "DOC");
                documento.codigo_referencia = this.usuario.codigo_usuario;
                documento.nombre_documento = this.archivos[i].name;
                documento.fecha_documento = this.fechas[i];
                let url= this.fileServer.dir_file_server+"usuarios/" + this.usuario.codigo_usuario;
                documento.dir_documento = this.fileServer.dir_file_server+"usuarios/" + this.usuario.codigo_usuario+"/"+documento.codigo_documento+"_"+this.archivos[i].name;
                documento.url_documento = this.fileServer.url_file_server+"usuarios/" + this.usuario.codigo_usuario+"/"+documento.codigo_documento+"_"+this.archivos[i].name;
                documento.estado_documento = 1;
                documento.tipo_documento = 5;

                documento.id_usuario_creacion = Number(sessionStorage.getItem('IdKey'));
                documento.ip_creacion = sessionStorage.getItem("LOCAL_IP");
                documento.id_usuario_modificacion = null;
                documento.ip_modificacion = null;

                this.documentosServicio.alta(documento).subscribe();
                numero3 = numero3 + 1;
                this.codigo.documentos = numero3;
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

            if (this.totalArchivos == 0) {
              this.gotoList();
              swal.fire(
                'Usuario Registrado',
                'Los datos fueron registrados con éxito',
                'success'
              )
            }

          }
        }
      })
    }
  }

  cambioTipo(event: any) {
    this.tipo = event.target.value;
    if (this.tipo == 0) {
      this.procedencia = "";
      this.mostrarLocal = true;
      this.mostrarSectores = false;
      this.mostrarOperadores = false;
      this.sectorSeleccionado = 0;
      this.operadorSeleccionado = 0;
    }
    if (this.tipo == 1) {
      this.procedencia = "Dirección Nacional de Inteligencia";
      this.mostrarLocal = true;
      this.mostrarSectores = false;
      this.mostrarOperadores = false;
      this.sectorSeleccionado = 0;
      this.operadorSeleccionado = 0;
    }
    if (this.tipo == 2) {
      this.procedencia = "Equipo de Trabajo de Activos Críticos Nacionales - DICI";
      this.mostrarLocal = true;
      this.mostrarSectores = false;
      this.mostrarOperadores = false;
      this.sectorSeleccionado = 0;
      this.operadorSeleccionado = 0;
    }
    if (this.tipo == 3 || this.tipo == 4) {
      this.procedencia = "";
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

  gotoList() {
    this.router.navigate(['/listarUsuarios']);
  }

  gotoInicio() {
    this.router.navigate(['/inicio']);
  }

  comprobarExtension() {
    for (let i = 0; i < this.archivos.length; i++) {
      let nombre = this.archivos[i].name;
      let extension = nombre.split('.').pop();
      if (extension == "pdf" ||
          extension == "jpg" ||
          extension == "png" ||
          extension == "doc" ||
          extension == "docx"||
          extension == "xlsx" ||
          extension == "xls" ||
          extension == "ppt" ||
          extension == "pptx" ||
          extension == "txt" ||
          extension == "mp4")
      {
        if (this.archivos[i].size > 1048576 * 1000) {
          this.toastr.error('El documento excede los 20MB', nombre + ' eliminado');
          this.archivos.splice(i, 1);
        }
      }
      else {
        this.toastr.error('Tipo no permitido', nombre + ' eliminado');
        this.archivos.splice(i, 1);
      }
    }
  }

  abrirModalAgregarDocumento() {
    $("#asignarDocumento").modal("show");
  }

  cerrarModalAgregarDocumento() {
    $("#asignarDocumento").modal("hide");
    this.obtenerFechas();
  }

  cerrarModalAgregarDocumento2() {
    $("#asignarDocumento").modal("hide");
    this.fechas = [];
    this.archivos = [];
  }

  onSelectDocumentos(event) {
    this.archivos.push(...event.addedFiles);
    this.comprobarExtension();

    let diferencia = this.archivos.length-this.fechas.length;
    for(let i=0; i<diferencia; i++){
      this.fechas.push("");
    }
  }

  obtenerFechas(){
    this.fechas = [];
    for(let i=0; i<this.archivos.length; i++){
      this.fechas.push($("#fecha"+(i+1)).val());
    }
  }

  onRemoveDocumentos(event: any, k: number) {
    this.fechas.splice(k,1);
    this.archivos.splice(this.archivos.indexOf(event), 1);
  }

  abrirModalBarraProgreso() {
    $("#barraProgreso").modal("show");
  }

  cerrarModalBarraProgreso() {
    $("#barraProgreso").modal("hide");
    this.gotoList();
    swal.fire(
      'Usuario Registrado',
      'Los datos fueron registrados con éxito',
      'success'
    )
  }




  /*abrirModalEditarPersona() {
    this.funcionario2 = JSON.parse(JSON.stringify(this.funcionario));
    $("#editarPersona").modal("show");
  }

  cerrarModalEditarPersona(){
    $("#editarPersona").modal("hide");
  }

  cerrarModalEditarPersona2(){
    if((!this.servicio.caracteresEspacio(this.funcionario2.nombres_persona) || this.funcionario2.nombres_persona.length==0) ||
      (!this.servicio.caracteresEspacio(this.funcionario2.paterno_persona) || this.funcionario2.paterno_persona.length==0) ||
      (!this.servicio.caracteresEspacio(this.funcionario2.materno_persona) || this.funcionario2.materno_persona.length==0) ||
      (this.funcionario2.dni_persona.length!=8 || !this.servicio.soloNumeros(this.funcionario2.dni_persona)))
    {
      swal.fire(
        'Verificar',
        'Campos incorrectos o vacios',
        'error'
      )
    }
    else{
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

          if(this.funcionario.dni_persona == this.funcionario2.dni_persona &&
             this.funcionario.nombres_persona == this.funcionario2.nombres_persona &&
             this.funcionario.paterno_persona == this.funcionario2.paterno_persona &&
             this.funcionario.materno_persona == this.funcionario2.materno_persona)
          {
            swal.fire(
              'Error',
              'No hay datos para actualizar',
              'error'
            );
          }
          else{
            this.funcionariosServicio.recuperarCoincidenciasDni(this.funcionario2.dni_persona, this.funcionario2.id_persona).subscribe( funcis => {
              if(funcis.length==0){
                this.funcionario2.imagen_persona = "";
                this.funcionario2.ip_modificacion = "";

                let nombre =this.funcionario2.paterno_persona+" "+this.funcionario2.materno_persona+", "+this.funcionario2.nombres_persona;
                let nombreInicial = this.funcionario.paterno_persona+" "+this.funcionario.materno_persona+", "+this.funcionario.nombres_persona;
                if (nombre != nombreInicial) {
                  this.usuariosServicio.actualizarBitacoras(nombre, nombreInicial).subscribe();
                }

                this.funcionariosServicio.modificacion(this.funcionario2.id_persona, this.funcionario2).subscribe( data => {

                  let bitacora: Bitacora = new Bitacora();
                  bitacora.nombreUsuario = this.tokenService.getName();
                  if(bitacora.nombreUsuario == nombreInicial){
                    bitacora.nombreUsuario = nombre;
                  }
                  bitacora.codigo_usuario = this.tokenService.getCodigo();
                  bitacora.id_usuario = Number(this.tokenService.getId());
                  bitacora.accion = 3;
                  bitacora.tipoAccion = 3;
                  bitacora.descripcion = "Actualizó los datos del funcionario: "+data.dni_persona+"-"+data.nombres_persona+" "+data.paterno_persona+" "+data.materno_persona;
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
              else{
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

