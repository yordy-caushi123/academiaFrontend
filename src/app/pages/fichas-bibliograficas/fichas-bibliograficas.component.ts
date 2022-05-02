import { Component, OnInit } from "@angular/core";
import { Biblioteca } from "src/app/entidades/biblioteca";
import { Ejemplar } from "src/app/entidades/ejemplar";
import { BibliotecaService } from "src/app/servicios/biblioteca.service";
import { EjemplarService } from "src/app/servicios/ejemplar.service";
import swal from "sweetalert2";
import { ToastrService } from 'ngx-toastr';
import { BiblioImagService } from 'src/app/servicios/biblio-imag.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AppService } from 'src/app/servicios/app.service';
import { AreaService } from "src/app/servicios/area.service";
import { TipoDocumentoService } from "src/app/servicios/tipo-documento.service";
import { PeriodoService } from "src/app/servicios/periodo.service";
import { UbicacionService } from "src/app/servicios/ubicacion.service";
import { ClasificacionService } from "src/app/servicios/clasificacion.service";
import { TipoDocumento } from "src/app/entidades/tipo-documento";
import { Area } from "src/app/entidades/area";
import { Clasificacion } from "src/app/entidades/clasificacion";
import { Ubicacion } from "src/app/entidades/ubicacion";
import { Periodo } from "src/app/entidades/periodo";
import { Bitacora } from "src/app/entidades/bitacora";
import { BitacorasService } from "src/app/servicios/bitacoras.service";
import { image } from "html2canvas/dist/types/css/types/image";
import { BiblioDocumentoService } from "src/app/servicios/ejem-documento.service";
import { EstadoEjemplarService } from "src/app/servicios/estado-ejemplar.service";
import { IdiomaService } from "src/app/servicios/idioma.service";
import { PaisService } from "src/app/servicios/pais.service";
import { CiudadService } from "src/app/servicios/ciudad.service";
import { EditorialService } from "src/app/servicios/editorial.service";
import { CaracteristicaService } from "src/app/servicios/caracteristica.service";
import { VersionService } from "src/app/servicios/version.service";
import { ModoIngresoService } from "src/app/servicios/modo-ingreso.service";
import { TipoMonedaService } from "src/app/servicios/tipo-moneda.service";
import { EstadoEjemplar } from "src/app/entidades/estado-ejemplar";
import { Idioma } from "src/app/entidades/idioma";
import { Editorial } from "src/app/entidades/editorial";
import { Caracteristica } from "src/app/entidades/caracteristica";
import { Version } from "src/app/entidades/version";
import { ModoIngreso } from "src/app/entidades/modo-ingreso";
import { TipoMoneda } from "src/app/entidades/tipo-moneda";
import { Ciudad } from "src/app/entidades/ciudad";

declare const $: any;

@Component({
  selector: "app-fichas-bibliograficas",
  templateUrl: "./fichas-bibliograficas.component.html",
  styleUrls: ["./fichas-bibliograficas.component.scss"],
})
export class FichasBibliograficasComponent implements OnInit {
  //Listas desplegables y objetos de las listas
  tiposDocumentos = [];
  clasificaciones = [];
  areas = [];
  ubicaciones = [];
  periodos = [];
  tipoDocumento = new TipoDocumento();
  area = new Area();
  clasificacion = new Clasificacion();
  ubicacion = new Ubicacion();
  periodo = new Periodo();

  //Datos de fichas bibliograficas y ejemplares
  biblioteca: Biblioteca = new Biblioteca();
  ejemplar: Ejemplar = new Ejemplar();
  fichasBibliograficas: Array<Biblioteca> = [];
  ejemplaresFichaBibliografica: Array<Ejemplar> = [];
  fichaBibliograficaSeleccionada: boolean;

  //Listas desplegables de ejemplares
  estadosEjemplares = [];
  idiomas = [];
  paises = [];
  ciudades = [];
  ciudadesIniciales = [];
  editoriales = [];
  caracteristicas = [];
  versiones = [];
  modosIngreso = [];
  tiposMoneda = [];
  estadoEjemplar = new EstadoEjemplar();
  idioma = new Idioma();
  editorial = new Editorial();
  caracteristica = new Caracteristica();
  version = new Version();
  modoIngreso = new ModoIngreso();
  tipoMoneda = new TipoMoneda();
  ciudad = new Ciudad();

  //Configurador del paginador
  config: any;

  //Información de Ficha Bibliográfica
  datos: boolean;
  ejemplares: boolean;

  //Datos para agregar Ficha Bibliográfica
  tipo: number = 0;
  imagen: File;
  documento: File;
  porcentajeArchivoDocumento: number = 0;
  porcentajeArchivoImagen: number = 0;

  //Datos para reservar Ejemplar
  fichaBibliograficaReservada: number = 0;
  empleadoReserva: number = 0;
  fechaSolicitud: String = "";
  fechaRecojo: String = "";

  //edicion
  editar: boolean = false;
  ejemplarEdicion = new Ejemplar();

  constructor(
    private bibliotecaServicio: BibliotecaService,
    private ejemplarServicio: EjemplarService,
    public toastr: ToastrService,
    private biblioImagServicio: BiblioImagService,
    private servicio: AppService,
    private areaServicio: AreaService,
    private tipoDocumentoServicio: TipoDocumentoService,
    private periodoServicio: PeriodoService,
    private ubicacionServicio: UbicacionService,
    private clasificacionServicio: ClasificacionService,
    private bitacorasServicio: BitacorasService,
    private biblioDocumentoServicio: BiblioDocumentoService,
    private estadoEjemplarServicio: EstadoEjemplarService,
    private idiomaServicio: IdiomaService,
    private paisServicio: PaisService,
    private ciudadServicio: CiudadService,
    private editorialServicio: EditorialService,
    private caracteristicaServicio: CaracteristicaService,
    private versionServicio: VersionService,
    private modoIngresoServicio: ModoIngresoService,
    private tipoMonedaServicio: TipoMonedaService
  ) { }

  ngOnInit() {
    this.listarFichasBibliograficas();
    this.traerDatosListasDesplegables();
    this.traerDatosDesplegablesEjemplares();
  }

  listarFichasBibliograficas() {
    this.bibliotecaServicio.listar().subscribe((b) => {
      this.fichasBibliograficas = b;

      this.config = {
        id: "fichasBibliograficas",
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.fichasBibliograficas.length,
      };

      this.datos = true;
      this.ejemplares = false;

      this.fichaBibliograficaSeleccionada = false;
    });
  }

  traerDatosListasDesplegables() {
    this.areaServicio.recuperarTodos().subscribe(a => {
      this.areas = JSON.parse(JSON.stringify(a));
    });

    this.tipoDocumentoServicio.recuperarTodos().subscribe(t => {
      this.tiposDocumentos = JSON.parse(JSON.stringify(t));
    });

    this.clasificacionServicio.recuperarTodos().subscribe(c => {
      this.clasificaciones = JSON.parse(JSON.stringify(c));
    });

    this.ubicacionServicio.recuperarTodos().subscribe(u => {
      this.ubicaciones = JSON.parse(JSON.stringify(u));
    });

    this.periodoServicio.recuperarTodos().subscribe(p => {
      this.periodos = JSON.parse(JSON.stringify(p));
    });
  }

  traerDatosDesplegablesEjemplares(){
    this.estadoEjemplarServicio.recuperarTodos().subscribe(ee => {
      this.estadosEjemplares = JSON.parse(JSON.stringify(ee));
    });

    this.idiomaServicio.recuperarTodos().subscribe(id => {
      this.idiomas = JSON.parse(JSON.stringify(id));
    });

    this.paisServicio.recuperarTodos().subscribe(p => {
      this.paises = JSON.parse(JSON.stringify(p));
    });

    this.ciudadServicio.recuperarTodos().subscribe(c => {
      this.ciudades = JSON.parse(JSON.stringify(c));
      this.ciudadesIniciales = JSON.parse(JSON.stringify(c));
    });

    this.editorialServicio.recuperarTodos().subscribe(ed => {
      this.editoriales = JSON.parse(JSON.stringify(ed));
    });

    this.caracteristicaServicio.recuperarTodos().subscribe(cars => {
      this.caracteristicas = JSON.parse(JSON.stringify(cars));
    });

    this.versionServicio.recuperarTodos().subscribe(v => {
      this.versiones = JSON.parse(JSON.stringify(v));
    });

    this.modoIngresoServicio.recuperarTodos().subscribe(mods => {
      this.modosIngreso = JSON.parse(JSON.stringify(mods));
    });

    this.tipoMonedaServicio.recuperarTodos().subscribe(tips => {
      this.tiposMoneda = JSON.parse(JSON.stringify(tips));
    });
  }

  listarEjemplares(nroCorre: String) {
    this.ejemplarServicio.listar(nroCorre).subscribe((e) => {
      this.ejemplaresFichaBibliografica = e;
    });
  }

  pageChange(event) {
    this.config.currentPage = event;
  }

  hayFichasBibliograficas() {
    if (this.fichasBibliograficas.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  hayEjemplares() {
    if (this.ejemplaresFichaBibliografica.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  cambioInformacionFichaBibliografica(n: number) {
    if (n == 1) {
      this.datos = true;
      this.ejemplares = false;
    }
    if (n == 2) {
      this.datos = false;
      this.ejemplares = true;
    }
  }

  editarEjemplar(n: number) {
    console.log(n);
  }

  abrirModalRegistrarFichaBibliografica(i: number) {
    if (i == 0) {
      this.biblioteca = new Biblioteca();
    } else {
      this.editar = true;
    }
    $("#registrarFichaBibliografica").modal("show");
  }

  cerrarModalRegistrarFichaBibliografica() {
    $("#registrarFichaBibliografica").modal("hide");
    this.editar = false;
  }

  cerrarModalRegistrarFichaBibliografica2() {
    if (this.validarFichaBibliografica()) {
      swal.fire("Error", "Complete todos los campos solicitados", "error");
    } else {
      if (this.editar) {
        this.bibliotecaServicio
          .modificar(this.biblioteca.id, this.biblioteca)
          .subscribe(
            (f) => {
              this.cerrarModalRegistrarFichaBibliografica();
              this.listarFichasBibliograficas();
              swal.fire(
                "Ficha Bibliográfica Actualizada",
                "Los datos se actualizaron con éxito",
                "success"
              );
            },
            (error) => {
              swal.fire(
                "Error",
                "Problemas de conexión con la Base de datos",
                "error"
              );
            }
          );
      } else {
        this.biblioteca.estado = true;
        this.biblioteca.codigo =
          "FICH_BIB_" + (this.fichasBibliograficas.length + 1);
        this.biblioteca.nroCorre =
          "FB" + (this.fichasBibliograficas.length + 1);
        this.bibliotecaServicio.registrar(this.biblioteca).subscribe(
          (f) => {
            this.biblioteca = new Biblioteca();

            if (this.imagen != null || this.imagen != undefined) {
              this.registrarBiblioImag(this.imagen, f.nroCorre, f.clasificacionCodClasif);
            }
            else {
              this.cerrarModalRegistrarFichaBibliografica();
              this.listarFichasBibliograficas();
              swal.fire(
                "Ficha Bibliográfica Registrada",
                "Los datos se guardaron con éxito",
                "success"
              );
            }
          },
          (error) => {
            swal.fire(
              "Error",
              "Problemas de conexión",
              "error"
            );
          }
        );
      }
    }
  }

  registrarBiblioImag(file: File, nroCorre: String, clasificacion: String) {
    this.biblioImagServicio.registrar(file, nroCorre, clasificacion).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.porcentajeArchivoImagen = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.imagen = null;

        this.cerrarModalRegistrarFichaBibliografica();
        this.listarFichasBibliograficas();
        swal.fire(
          "Ficha Bibliográfica Registrada",
          "Los datos se guardaron con éxito",
          "success"
        );

      }
    });
  }

  registrarEjemplarDocumento(file: File, nroCorre: String, ejemNro: String) {
    this.biblioDocumentoServicio.registrar(file, nroCorre, ejemNro).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.porcentajeArchivoDocumento = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.documento = null;
        if(this.imagen == null && this.documento == null){
          $("#registrarEjemplar").modal("hide");
          $("#informacionFichaBibliografica").modal("show");
          swal.fire(
            "Ficha Bibliográfica Registrada",
            "Los datos se guardaron con éxito",
            "success"
          );
        }
      }
    });
  }

  validarFichaBibliografica() {
    let estado: boolean = false;
    if (
      this.biblioteca.titulo.length == 0 ||
      this.biblioteca.tipoDocumentoCodTipodoc == 0 ||
      this.biblioteca.clasificacionCodClasif.length == 0 ||
      this.biblioteca.areaCodArea == 0 ||
      this.biblioteca.ubicacionCodUbi.length == 0 ||
      this.biblioteca.autorPer.length == 0 ||
      this.biblioteca.autorInst.length == 0 ||
      this.biblioteca.descriptor.length == 0 ||
      this.biblioteca.comenta.length == 0 ||
      this.biblioteca.isbn.length == 0 ||
      this.biblioteca.nroRev.length == 0 ||
      this.biblioteca.periodoCodPeriodo == 0 ||
      this.biblioteca.tamano.length == 0 ||
      this.imagen == null ||
      this.imagen == undefined
    ) {
      estado = true;
    }

    return estado;
  }

  abrirModalInformacionFichaBibliografica(i: number){
    $("#informacionFichaBibliografica").modal("show");
    this.biblioteca = JSON.parse(JSON.stringify(this.fichasBibliograficas[i]));
    this.recuperarImagen(this.biblioteca.nroCorre);
    this.listarEjemplares(this.biblioteca.nroCorre);
  }

  cerrarModalInformacionFichaBibliografica(i: number){
    $("#informacionFichaBibliografica").modal("hide");
    this.biblioteca = new Biblioteca();
    this.ejemplaresFichaBibliografica = [];
  }

  recuperarImagen(nro: String) {
    let app = this.servicio.tipoAplicacion("jpg");
    this.biblioImagServicio.recuperar(nro).subscribe(async response => {
      let blob: any = new Blob([response], { type: app });
      const url = window.URL.createObjectURL(blob);
      $("#imagen").attr("src", url);
    }, async error => {
      $("#imagen").attr("src", "../../../assets/img/portada.jpg");
    });
  }

  abrirModalRegistrarEjemplar(i: number) {
    $("#informacionFichaBibliografica").modal("hide");
    $("#registrarEjemplar").modal("show");

    if(i != -1){
      this.ejemplar = JSON.parse(JSON.stringify(this.ejemplaresFichaBibliografica[i]));
      this.ejemplarEdicion = JSON.parse(JSON.stringify(this.ejemplaresFichaBibliografica[i]));
      this.editar = true;
    }
    else{
      this.ejemplar = new Ejemplar();
    }
  }

  cerrarModalRegistrarEjemplar() {
    $("#registrarEjemplar").modal("hide");
    $("#informacionFichaBibliografica").modal("show");
    this.editar = false;
    this.ejemplar = new Ejemplar();
  }

  cerrarModalRegistrarEjemplar2() {
    swal.fire({
      title: '¿Está seguro de continuar?',
      text: "Los datos quedarán guardados en el sistema",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        if (this.validarEjemplar()) {
          swal.fire("Error", "Complete todos los campos solicitados", "error");
        } 
        else {
          if(this.editar){
            if(JSON.stringify(this.ejemplar) == JSON.stringify(this.ejemplarEdicion)){
              swal.fire("Sin cambios", "No se ha cambiado ningún campo", "info");
            }
            else{
              this.ejemplarEdicion.estado = false;
              this.ejemplarServicio.modificar(this.ejemplarEdicion.id, this.ejemplarEdicion).subscribe(m => {
                this.ejemplar.id = null;
                this.ejemplarServicio.registrar(this.ejemplar).subscribe(r => {
                  $("#registrarEjemplar").modal("hide");
                  $("#informacionFichaBibliografica").modal("show");
                  swal.fire(
                    "Ejemplar Registrado",
                    "Los datos se registraron con éxito",
                    "success"
                  );
                  this.listarEjemplares(this.biblioteca.nroCorre);
                });
              });
            }
          }
          else{
            this.ejemplar.ejempNro = "E" + (this.ejemplaresFichaBibliografica.length + 1).toString();
            this.ejemplar.bibliotecaNroCorre = this.biblioteca.nroCorre;
            this.ejemplar.estado = true;
            this.ejemplarServicio.registrar(this.ejemplar).subscribe((f) => {
                this.ejemplar = new Ejemplar();
      
                if (this.documento != null || this.documento != undefined) {
                  this.registrarEjemplarDocumento(this.documento, f.bibliotecaNroCorre, f.ejempNro);
                }
                else {
                  $("#registrarEjemplar").modal("hide");
                  $("#informacionFichaBibliografica").modal("show");
                  swal.fire(
                    "Ejemplar Registrado",
                    "Los datos se registraron con éxito",
                    "success"
                  );
                }
                this.listarEjemplares(this.biblioteca.nroCorre);
              },
              (error) => {
                swal.fire(
                  "Error",
                  "Problemas de conexión con la Base de datos",
                  "error"
                );
              }
            );
          }
        }
      }
    });
  }

  validarEjemplar() {
    let estado: boolean = false;
    if (
      this.ejemplar.stsEjemp == 0 ||
      this.ejemplar.aaPublic == "" ||
      this.ejemplar.idiomaCodIdioma == 0 ||
      this.ejemplar.paisCodPais.length == 0 ||
      this.ejemplar.ciudadCodCiudad == 0 ||
      this.ejemplar.editorialCodEditorial == 0 ||
      this.ejemplar.edicion.length == 0 ||
      this.ejemplar.caracteristicaCodCaract == 0 ||
      this.ejemplar.versionCodVersion == 0 ||
      this.ejemplar.totpag.length == 0 ||
      this.ejemplar.modoIngresoCodModIng == 0 ||
      this.ejemplar.tipoMonedaCodTipMon == 0 ||
      this.ejemplar.precio == 0 ||
      this.ejemplar.observa.length == 0
    ) {
      estado = true;
    }

    return estado;
  }

  abrirModalReservarEjemplar() {
    $("#reservarEjemplar").modal("show");
  }

  cerrarModalReservarEjemplar() {
    $("#reservarEjemplar").modal("hide");
  }

  cambioImagen(e: any) {
    this.imagen = e.target.files[0];
    this.comprobarExtensionImagen();
  }

  cambioDocumento(e: any) {
    this.documento = e.target.files[0];
    this.comprobarExtensionDocumento();
  }

  comprobarExtensionImagen() {
    let nombre = this.imagen.name;
    let extension = nombre.split(".").pop();
    if (extension != "png" && extension != "jpg") {
      this.imagen = null;
      this.toastr.error("Sólo JPG o PNG", "Formato no permitido");
    }
    else {
      this.toastr.success("Se cargó " + this.imagen.name, "Portada Cargada")
    }
  }

  comprobarExtensionDocumento() {
    let nombre = this.documento.name;
    let extension = nombre.split(".").pop();
    if (extension != "pdf") {
      this.documento = null;
      this.toastr.error("Sólo PDF", "Formato no permitido");
    }
    else {
      this.toastr.success("Se cargó " + this.documento.name, "Documento Cargado")
    }
  }

  cambioPais(e: any){
    if(e.target.value.length == 0){
      this.ejemplar.ciudadCodCiudad = 0;
      this.ciudades = [];
    }
    else{
      this.ciudades = JSON.parse(JSON.stringify(this.ciudadesIniciales.filter(c => c.paisCodPais == e.target.value)));
    }
  }

  //Métodos de información de Área
  abrirModalInfoArea() {
    $("#registrarFichaBibliografica").modal("hide")
    $("#infoArea").modal("show");
  }

  cerrarModalInfoArea() {
    $("#infoArea").modal("hide");
    $("#registrarFichaBibliografica").modal("show");
    this.area = new Area();
  }

  cerrarModalInfoArea2() {
    this.areaServicio.alta(this.area).subscribe(a => {
      $("#infoArea").modal("hide");
      $("#registrarFichaBibliografica").modal("show");
      this.area = new Area();
      this.traerDatosListasDesplegables();

      let bitacora: Bitacora = new Bitacora();
      bitacora.nombreUsuario = sessionStorage.getItem("LOCAL_IP");
      bitacora.accion = 2;
      bitacora.descripcion = "Registro de Área: " + a.area;
      bitacora.contenidoInicial = JSON.stringify(a);
      bitacora.ip = sessionStorage.getItem("LOCAL_IP");
      this.bitacorasServicio.alta(bitacora).subscribe();

      swal.fire(
        "Completado",
        "Los datos se registraron con éxito",
        "success"
      );
    });
  }
  //Fin metodos info Área

  //Métodos de información de Tipo documento
  abrirModalInfoTipoDocumento() {
    $("#registrarFichaBibliografica").modal("hide")
    $("#infoTipoDocumento").modal("show");
  }

  cerrarModalInfoTipoDocumento() {
    $("#infoTipoDocumento").modal("hide");
    $("#registrarFichaBibliografica").modal("show");
    this.tipoDocumento = new TipoDocumento();
  }

  cerrarModalInfoTipoDocumento2() {
    this.tipoDocumentoServicio.alta(this.tipoDocumento).subscribe(a => {
      $("#infoTipoDocumento").modal("hide");
      $("#registrarFichaBibliografica").modal("show");
      this.tipoDocumento = new TipoDocumento();
      this.traerDatosListasDesplegables();

      let bitacora: Bitacora = new Bitacora();
      bitacora.nombreUsuario = sessionStorage.getItem("LOCAL_IP");
      bitacora.accion = 2;
      bitacora.descripcion = "Registro de Tipo Documento: " + a.tipoDoc;
      bitacora.contenidoInicial = JSON.stringify(a);
      bitacora.ip = sessionStorage.getItem("LOCAL_IP");
      this.bitacorasServicio.alta(bitacora).subscribe();

      swal.fire(
        "Completado",
        "Los datos se registraron con éxito",
        "success"
      );
    });
  }
  //Fin metodos info tipo documento

  //Métodos de información de clasificacion
  abrirModalInfoClasificacion() {
    $("#registrarFichaBibliografica").modal("hide")
    $("#infoClasificacion").modal("show");
  }

  cerrarModalInfoClasificacion() {
    $("#infoClasificacion").modal("hide");
    $("#registrarFichaBibliografica").modal("show");
    this.clasificacion = new Clasificacion();
  }

  cerrarModalInfoClasificacion2() {
    this.clasificacion.codClasif = "CL" + (this.clasificaciones.length + 1);
    this.clasificacionServicio.alta(this.clasificacion).subscribe(a => {
      $("#infoClasificacion").modal("hide");
      $("#registrarFichaBibliografica").modal("show");
      this.clasificacion = new Clasificacion();
      this.traerDatosListasDesplegables();

      let bitacora: Bitacora = new Bitacora();
      bitacora.nombreUsuario = sessionStorage.getItem("LOCAL_IP");
      bitacora.accion = 2;
      bitacora.descripcion = "Registro de Clasificación: " + a.denClasi;
      bitacora.contenidoInicial = JSON.stringify(a);
      bitacora.ip = sessionStorage.getItem("LOCAL_IP");
      this.bitacorasServicio.alta(bitacora).subscribe();

      swal.fire(
        "Completado",
        "Los datos se registraron con éxito",
        "success"
      );
    });
  }
  //Fin metodos info Clasificación

  //Métodos de información de ubicacion
  abrirModalInfoUbicacion() {
    $("#registrarFichaBibliografica").modal("hide")
    $("#infoUbicacion").modal("show");
  }

  cerrarModalInfoUbicacion() {
    $("#infoUbicacion").modal("hide");
    $("#registrarFichaBibliografica").modal("show");
    this.ubicacion = new Ubicacion();
  }

  cerrarModalInfoUbicacion2() {
    this.ubicacion.codUbi = "UB" + (this.ubicaciones.length + 1);
    this.ubicacionServicio.alta(this.ubicacion).subscribe(a => {
      $("#infoUbicacion").modal("hide");
      $("#registrarFichaBibliografica").modal("show");
      this.ubicacion = new Ubicacion();
      this.traerDatosListasDesplegables();

      let bitacora: Bitacora = new Bitacora();
      bitacora.nombreUsuario = sessionStorage.getItem("LOCAL_IP");
      bitacora.accion = 2;
      bitacora.descripcion = "Registro de Ubicacion: " + a.denUbi;
      bitacora.contenidoInicial = JSON.stringify(a);
      bitacora.ip = sessionStorage.getItem("LOCAL_IP");
      this.bitacorasServicio.alta(bitacora).subscribe();

      swal.fire(
        "Completado",
        "Los datos se registraron con éxito",
        "success"
      );
    });
  }
  //Fin metodos info Ubicacion

  //Métodos de información de periodo
  abrirModalInfoPeriodo() {
    $("#registrarFichaBibliografica").modal("hide")
    $("#infoPeriodo").modal("show");
  }

  cerrarModalInfoPeriodo() {
    $("#infoPeriodo").modal("hide");
    $("#registrarFichaBibliografica").modal("show");
    this.periodo = new Periodo();
  }

  cerrarModalInfoPeriodo2() {
    this.periodoServicio.alta(this.periodo).subscribe(a => {
      $("#infoPeriodo").modal("hide");
      $("#registrarFichaBibliografica").modal("show");
      this.periodo = new Periodo();
      this.traerDatosListasDesplegables();

      let bitacora: Bitacora = new Bitacora();
      bitacora.nombreUsuario = sessionStorage.getItem("LOCAL_IP");
      bitacora.accion = 2;
      bitacora.descripcion = "Registro de Periodo: " + a.descPeriodo;
      bitacora.contenidoInicial = JSON.stringify(a);
      bitacora.ip = sessionStorage.getItem("LOCAL_IP");
      this.bitacorasServicio.alta(bitacora).subscribe();

      swal.fire(
        "Completado",
        "Los datos se registraron con éxito",
        "success"
      );
    });
  }
  //Fin metodos info Periodo








    //Métodos de información de Estado de ejemplar
    abrirModalInfoEstadoEjemplar() {
      $("#registrarEjemplar").modal("hide")
      $("#infoEstadoEjemplar").modal("show");
    }
  
    cerrarModalInfoEstadoEjemplar() {
      $("#infoEstadoEjemplar").modal("hide");
      $("#registrarEjemplar").modal("show");
      this.estadoEjemplar = new EstadoEjemplar();
    }
  
    cerrarModalInfoEstadoEjemplar2() {
      this.estadoEjemplarServicio.alta(this.estadoEjemplar).subscribe(a => {
        $("#infoEstadoEjemplar").modal("hide");
        $("#registrarEjemplar").modal("show");
        this.estadoEjemplar = new EstadoEjemplar();
        this.traerDatosDesplegablesEjemplares();
  
        let bitacora: Bitacora = new Bitacora();
        bitacora.nombreUsuario = sessionStorage.getItem("LOCAL_IP");
        bitacora.accion = 2;
        bitacora.descripcion = "Registro de Estado Ejemplar: " + a.descEstEjem;
        bitacora.contenidoInicial = JSON.stringify(a);
        bitacora.ip = sessionStorage.getItem("LOCAL_IP");
        this.bitacorasServicio.alta(bitacora).subscribe();
  
        swal.fire(
          "Completado",
          "Los datos se registraron con éxito",
          "success"
        );
      });
    }
    //Fin metodos info Estado Ejemplar

    //Métodos de información de Idioma
    abrirModalInfoIdioma() {
      $("#registrarEjemplar").modal("hide")
      $("#infoIdioma").modal("show");
    }
  
    cerrarModalInfoIdioma() {
      $("#infoIdioma").modal("hide");
      $("#registrarEjemplar").modal("show");
      this.idioma = new Idioma();
    }
  
    cerrarModalInfoIdioma2() {
      this.idiomaServicio.alta(this.idioma).subscribe(a => {
        $("#infoIdioma").modal("hide");
        $("#registrarEjemplar").modal("show");
        this.idioma = new Idioma();
        this.traerDatosDesplegablesEjemplares();
  
        let bitacora: Bitacora = new Bitacora();
        bitacora.nombreUsuario = sessionStorage.getItem("LOCAL_IP");
        bitacora.accion = 2;
        bitacora.descripcion = "Registro de Idioma: " + a.descIdioma;
        bitacora.contenidoInicial = JSON.stringify(a);
        bitacora.ip = sessionStorage.getItem("LOCAL_IP");
        this.bitacorasServicio.alta(bitacora).subscribe();
  
        swal.fire(
          "Completado",
          "Los datos se registraron con éxito",
          "success"
        );
      });
    }
    //Fin metodos info Idioma

    //Métodos de información de Editorial
    abrirModalInfoEditorial() {
      $("#registrarEjemplar").modal("hide")
      $("#infoEditorial").modal("show");
    }
  
    cerrarModalInfoEditorial() {
      $("#infoEditorial").modal("hide");
      $("#registrarEjemplar").modal("show");
      this.editorial = new Editorial();
    }
  
    cerrarModalInfoEditorial2() {
      this.editorialServicio.alta(this.editorial).subscribe(a => {
        $("#infoEditorial").modal("hide");
        $("#registrarEjemplar").modal("show");
        this.editorial = new Editorial();
        this.traerDatosDesplegablesEjemplares();
  
        let bitacora: Bitacora = new Bitacora();
        bitacora.nombreUsuario = sessionStorage.getItem("LOCAL_IP");
        bitacora.accion = 2;
        bitacora.descripcion = "Registro de Editorial: " + a.descEditorial;
        bitacora.contenidoInicial = JSON.stringify(a);
        bitacora.ip = sessionStorage.getItem("LOCAL_IP");
        this.bitacorasServicio.alta(bitacora).subscribe();
  
        swal.fire(
          "Completado",
          "Los datos se registraron con éxito",
          "success"
        );
      });
    }
    //Fin metodos info Editorial

    //Métodos de información de Caracteristica
    abrirModalInfoCaracteristica() {
      $("#registrarEjemplar").modal("hide")
      $("#infoCaracteristica").modal("show");
    }
  
    cerrarModalInfoCaracteristica() {
      $("#infoCaracteristica").modal("hide");
      $("#registrarEjemplar").modal("show");
      this.caracteristica = new Caracteristica();
    }
  
    cerrarModalInfoCaracteristica2() {
      this.caracteristicaServicio.alta(this.caracteristica).subscribe(a => {
        $("#infoCaracteristica").modal("hide");
        $("#registrarEjemplar").modal("show");
        this.caracteristica = new Caracteristica();
        this.traerDatosDesplegablesEjemplares();
  
        let bitacora: Bitacora = new Bitacora();
        bitacora.nombreUsuario = sessionStorage.getItem("LOCAL_IP");
        bitacora.accion = 2;
        bitacora.descripcion = "Registro de Editorial: " + a.descCaract;
        bitacora.contenidoInicial = JSON.stringify(a);
        bitacora.ip = sessionStorage.getItem("LOCAL_IP");
        this.bitacorasServicio.alta(bitacora).subscribe();
  
        swal.fire(
          "Completado",
          "Los datos se registraron con éxito",
          "success"
        );
      });
    }
    //Fin metodos info Caracteristica

    //Métodos de información de Version
    abrirModalInfoVersion() {
      $("#registrarEjemplar").modal("hide")
      $("#infoVersion").modal("show");
    }
  
    cerrarModalInfoVersion() {
      $("#infoVersion").modal("hide");
      $("#registrarEjemplar").modal("show");
      this.version = new Version();
    }
  
    cerrarModalInfoVersion2() {
      this.versionServicio.alta(this.version).subscribe(a => {
        $("#infoVersion").modal("hide");
        $("#registrarEjemplar").modal("show");
        this.version = new Version();
        this.traerDatosDesplegablesEjemplares();
  
        let bitacora: Bitacora = new Bitacora();
        bitacora.nombreUsuario = sessionStorage.getItem("LOCAL_IP");
        bitacora.accion = 2;
        bitacora.descripcion = "Registro de Versión: " + a.descVersion;
        bitacora.contenidoInicial = JSON.stringify(a);
        bitacora.ip = sessionStorage.getItem("LOCAL_IP");
        this.bitacorasServicio.alta(bitacora).subscribe();
  
        swal.fire(
          "Completado",
          "Los datos se registraron con éxito",
          "success"
        );
      });
    }
    //Fin metodos info Version

    //Métodos de información de Modo Ingreso
    abrirModalInfoModoIngreso() {
      $("#registrarEjemplar").modal("hide")
      $("#infoModoIngreso").modal("show");
    }
  
    cerrarModalInfoModoIngreso() {
      $("#infoModoIngreso").modal("hide");
      $("#registrarEjemplar").modal("show");
      this.modoIngreso = new ModoIngreso();
    }
  
    cerrarModalInfoModoIngreso2() {
      this.modoIngresoServicio.alta(this.modoIngreso).subscribe(a => {
        $("#infoModoIngreso").modal("hide");
        $("#registrarEjemplar").modal("show");
        this.modoIngreso = new ModoIngreso();
        this.traerDatosDesplegablesEjemplares();
  
        let bitacora: Bitacora = new Bitacora();
        bitacora.nombreUsuario = sessionStorage.getItem("LOCAL_IP");
        bitacora.accion = 2;
        bitacora.descripcion = "Registro de Versión: " + a.descModIng;
        bitacora.contenidoInicial = JSON.stringify(a);
        bitacora.ip = sessionStorage.getItem("LOCAL_IP");
        this.bitacorasServicio.alta(bitacora).subscribe();
  
        swal.fire(
          "Completado",
          "Los datos se registraron con éxito",
          "success"
        );
      });
    }
    //Fin metodos info Modo Ingreso

    //Métodos de información de Tipo Moneda
    abrirModalInfoTipoMoneda() {
      $("#registrarEjemplar").modal("hide")
      $("#infoTipoMoneda").modal("show");
    }
  
    cerrarModalInfoTipoMoneda() {
      $("#infoTipoMoneda").modal("hide");
      $("#registrarEjemplar").modal("show");
      this.tipoMoneda = new TipoMoneda();
    }
  
    cerrarModalInfoTipoMoneda2() {
      this.tipoMonedaServicio.alta(this.tipoMoneda).subscribe(a => {
        $("#infoTipoMoneda").modal("hide");
        $("#registrarEjemplar").modal("show");
        this.tipoMoneda = new TipoMoneda();
        this.traerDatosDesplegablesEjemplares();
  
        let bitacora: Bitacora = new Bitacora();
        bitacora.nombreUsuario = sessionStorage.getItem("LOCAL_IP");
        bitacora.accion = 2;
        bitacora.descripcion = "Registro de Versión: " + a.descTipMon;
        bitacora.contenidoInicial = JSON.stringify(a);
        bitacora.ip = sessionStorage.getItem("LOCAL_IP");
        this.bitacorasServicio.alta(bitacora).subscribe();
  
        swal.fire(
          "Completado",
          "Los datos se registraron con éxito",
          "success"
        );
      });
    }
    //Fin metodos info Tipo Moneda

    //Métodos de información de Ciudad
    abrirModalInfoCiudad() {
      $("#registrarEjemplar").modal("hide")
      $("#infoCiudad").modal("show");
    }
  
    cerrarModalInfoCiudad() {
      $("#infoCiudad").modal("hide");
      $("#registrarEjemplar").modal("show");
      this.ciudad = new Ciudad();
    }
  
    cerrarModalInfoCiudad2() {
      this.ciudadServicio.alta(this.ciudad).subscribe(a => {
        $("#infoCiudad").modal("hide");
        $("#registrarEjemplar").modal("show");
        this.ciudad = new Ciudad();
        this.traerDatosDesplegablesEjemplares();
  
        let bitacora: Bitacora = new Bitacora();
        bitacora.nombreUsuario = sessionStorage.getItem("LOCAL_IP");
        bitacora.accion = 2;
        bitacora.descripcion = "Registro de Ciudad: " + a.descCiudad;
        bitacora.contenidoInicial = JSON.stringify(a);
        bitacora.ip = sessionStorage.getItem("LOCAL_IP");
        this.bitacorasServicio.alta(bitacora).subscribe();
  
        swal.fire(
          "Completado",
          "Los datos se registraron con éxito",
          "success"
        );
      });
    }
    //Fin metodos info Tipo Moneda
}