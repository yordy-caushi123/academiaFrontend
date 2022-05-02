import { Component, OnInit } from '@angular/core';
import { Bitacora } from 'src/app/entidades/bitacora';
import swal from 'sweetalert2'
import { BitacorasService } from 'src/app/servicios/bitacoras.service';
import { AppService } from 'src/app/servicios/app.service';

declare const $: any;

@Component({
  selector: 'app-listar-bitacoras',
  templateUrl: './listar-bitacoras.component.html',
  styleUrls: ['./listar-bitacoras.component.scss']
})
export class ListarBitacorasComponent implements OnInit {
  bitacoras: Array<Bitacora> = new Array();
  bitacora: Bitacora = new Bitacora();
  registrosIniciales: number = 0;

  //configurador de paginador
  config: any;

  buscar: String = '';
  accion: number = 0;
  fechaini: String = '';
  fechafin: String = '';

  constructor(private bitacorasServicio: BitacorasService, private servicio: AppService) { }

  ngOnInit() {
    $(".modal").modal("hide");
    this.recuperarTodos();
  }

  recuperarTodos() {
    this.bitacoras = null;
    this.bitacorasServicio.recuperarTodos().subscribe(response => {
      this.bitacoras = response;
      this.registrosIniciales = this.bitacoras.length;

      this.config = {
        id: 'bitacoras',
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.bitacoras.length
      };
    }, (error) => {
      this.bitacoras = new Array();
      this.registrosIniciales = 0;
      swal.fire(
        'Error de conexión',
        'No se puede conectar con el servidor',
        'error'
      )
    });

  }

  hayBitacoras(){
    if (this.bitacoras == null || this.bitacoras.length == 0) {
      return false;
    }
    else {
      return true;
    }
  }

  pageChange(event) {
    this.config.currentPage = event;
  }

  buscador(event: any, t: number){

    if(t == 1){
      this.buscar = event.target.value;
    }
    if(t == 2){
      this.accion = event.target.value;
    }
    if(t == 3){
      this.fechaini = event.target.value;
    }
    if(t == 4){
      this.fechafin = event.target.value;
    }

    if(this.buscar.length == 0){
      this.buscar = "$$vacio$$";
    }
    if(this.fechaini.length == 0){
      this.fechaini = null;
    }
    if(this.fechafin.length == 0){
      this.fechafin = null;
    }

    this.bitacorasServicio.recuperarPorFiltro(this.buscar, this.accion, this.fechaini, this.fechafin).subscribe(response => {
      if(this.buscar == "$$vacio$$"){
        this.buscar == '';
      }
      this.bitacoras = response;

      this.config = {
        id: 'bitacoras',
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.bitacoras.length
      };
    }, (error) => {
      this.bitacoras = new Array();
      this.registrosIniciales = 0;
      swal.fire(
        'Error de conexión',
        'No se puede conectar con el servidor',
        'error'
      )
    });

  }




}
