import { Component, OnInit } from '@angular/core';
import { Ingreso } from 'src/app/entidades/ingreso';
import { Movimiento } from 'src/app/entidades/movimiento';
import { Egreso } from 'src/app/entidades/egreso';
import { IngresoService } from 'src/app/servicios/ingreso.service';
import { EgresoService } from 'src/app/servicios/egreso.service';
import { AppService } from 'src/app/servicios/app.service';
import swal from "sweetalert2";
import { AlumnoService } from 'src/app/servicios/alumno.service';
import { Alumno } from 'src/app/entidades/alumno';

declare const $: any;

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.scss']
})
export class MovimientosComponent implements OnInit {
  //Información de movimientos
  movimientos: Movimiento[] = [];
  movimientosIniciales: Movimiento[] = [];
  movimiento: Movimiento = new Movimiento();
  ingresos: Ingreso[] = [];
  ingresosIniciales: Ingreso[] = [];
  egresos: Egreso[] = [];
  egresosIniciales: Egreso[] = [];
  ingreso: Ingreso = new Ingreso();
  egreso: Egreso = new Egreso();

  alumnos: Alumno[] = [];

  //edicion
  editar: boolean = false;

  //Configurador del paginador
  config: any;

  //Llegada de datos
  datos: number = 0;

  //fecha
  fecha: string = '';

  constructor(private appServicio: AppService, private ingresoService: IngresoService, private egresoService: EgresoService,
    private alumnoService: AlumnoService) { }

  ngOnInit() {
    let f = new Date();
    this.fecha = f.getFullYear() + "";
    if(f.getMonth()<10){
      this.fecha = this.fecha+"-0"+f.getMonth();
    }
    else{
      this.fecha = this.fecha+"-"+f.getMonth();
    }
    if(f.getDate()<10){
      this.fecha = this.fecha+"-0"+f.getDate();
    }
    else{
      this.fecha = this.fecha+"-"+f.getDate();
    }
    this.listarTodos();
    this.listarAlumnos();
  }

  pageChange(event) {
    this.config.currentPage = event;
  }

  hayMovimientos() {
    if (this.movimientos.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  listarTodos(){
    this.listarEgresos();
    this.listarIngresos();
  }

  listarIngresos(){
    this.ingresoService.recuperarTodos().subscribe(n => {
      this.ingresosIniciales = JSON.parse(JSON.stringify(n));
      this.ingresos = JSON.parse(JSON.stringify(this.ingresosIniciales));
      this.datos = this.datos + 1;
      if(this.datos == 2){
        this.unirMovimientos();
      }
    });
  }

  listarEgresos(){
    this.egresoService.recuperarTodos().subscribe(n => {
      this.egresosIniciales = JSON.parse(JSON.stringify(n));
      this.egresos = JSON.parse(JSON.stringify(this.egresosIniciales));
      this.datos = this.datos + 1;
      if(this.datos == 2){
        this.unirMovimientos();
      }
    });
  }

  unirMovimientos(){
    this.movimientos = [];

    for(let i = 0; i < this.ingresos.length; i++){
      this.movimiento = new Movimiento();
      this.movimiento.numeroOperacion = this.ingresos[i].numeroOperacion;
      this.movimiento.fechaPago = this.ingresos[i].fechaPago;
      this.movimiento.tipoMovimiento = 1;
      this.movimiento.total = this.ingresos[i].total;
      this.movimiento.cuenta = this.ingresos[i].cuenta;
      this.movimientos.push(this.movimiento);
    }

    for(let i = 0; i < this.egresos.length; i++){
      this.movimiento = new Movimiento();
      this.movimiento.numeroOperacion = this.egresos[i].numeroOperacion;
      this.movimiento.fechaPago = this.egresos[i].fechaPago;
      this.movimiento.tipoMovimiento = 2;
      this.movimiento.total = this.egresos[i].total;
      this.movimiento.cuenta = 0;
      this.movimientos.push(this.movimiento);
    }

    this.movimientosIniciales = JSON.parse(JSON.stringify(this.movimientos));
    this.config = {
      id: "movimientos",
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.movimientos.length,
    };

    this.datos = 0;
    this.movimiento = new Movimiento();
  }

  listarAlumnos(){
    this.alumnoService.recuperarTodos().subscribe(n => {
      this.alumnos = JSON.parse(JSON.stringify(n));
    });
  }

  //FUNCIONES PARA INFORMACIÓN DE Movimientos
  abrirModalInformacionMovimiento(id: number){
    if (id == -1) {
      this.ingreso = new Ingreso();
      this.egreso = new Egreso();
      this.ingreso.fechaPago = this.fecha;
      this.egreso.fechaPago = this.fecha;
    } else {
      this.editar = true;
      this.movimiento = JSON.parse(JSON.stringify(this.movimientos[id]));
      if(this.movimiento.tipoMovimiento == 1){
        this.ingreso = JSON.parse(JSON.stringify(this.ingresos.find(n => n.numeroOperacion == this.movimiento.numeroOperacion)));
      }
      if(this.movimiento.tipoMovimiento == 2){
        this.egreso = JSON.parse(JSON.stringify(this.egresos.find(n => n.numeroOperacion == this.movimiento.numeroOperacion)));
      }
    }
    $("#modalInformacionMovimiento").modal("show");
  }

  cerrarModalInformacionMovimiento(id: number){
    $("#modalInformacionMovimiento").modal("hide");
    this.editar = false;

    if (id != 0) {
      if(this.validarInformacionMovimiento()){
        this.appServicio.mensajeSwal(3);
      }
      else{
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
            if(!this.editar){
              if(this.movimiento.tipoMovimiento == 1){
                this.ingreso.numeroOperacion = this.movimiento.numeroOperacion;
                this.ingresoService.alta(this.ingreso).subscribe(n => {
                  this.listarTodos();
                  this.appServicio.mensajeSwal(1);
                }, error => {
                  this.appServicio.mensajeSwal(4);
                });
              }
              if(this.movimiento.tipoMovimiento == 2){
                this.egreso.numeroOperacion = this.movimiento.numeroOperacion;
                this.egresoService.alta(this.egreso).subscribe(n => {
                  this.listarTodos();
                  this.appServicio.mensajeSwal(1);
                }, error => {
                  this.appServicio.mensajeSwal(4);
                });
              }
            }
            else{
              if(this.movimiento.tipoMovimiento == 1){
                this.ingreso.numeroOperacion = this.movimiento.numeroOperacion;
                this.ingresoService.modificacion(this.ingreso.id, this.ingreso).subscribe(n => {
                  this.listarTodos();
                  this.appServicio.mensajeSwal(2);
                }, error => {
                  this.appServicio.mensajeSwal(4);
                });
              }
              if(this.movimiento.tipoMovimiento == 2){
                this.egreso.numeroOperacion = this.movimiento.numeroOperacion;
                this.egresoService.modificacion(this.egreso.id, this.egreso).subscribe(n => {
                  this.listarTodos();
                  this.appServicio.mensajeSwal(2);
                }, error => {
                  this.appServicio.mensajeSwal(4);
                });
              }
            }
          }
        });
      }
    }
  }

  validarInformacionMovimiento() {
    let estado: boolean = false;
    /*if (
      this.alumno.nombres == '' ||
      this.alumno.apellidos == '' ||
      this.alumno.dni == '' ||
      this.alumno.fechaNacimiento == '' ||
      this.alumno.telefono == ''
    ) {
      estado = true;
    }*/

    return estado;
  }

}
