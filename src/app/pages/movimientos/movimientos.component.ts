import { Component, OnInit } from '@angular/core';
import { Ingreso } from 'src/app/entidades/ingreso';
import { Movimiento } from 'src/app/entidades/movimiento';
import { Egreso } from 'src/app/entidades/egreso';

declare const $: any;

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.scss']
})
export class MovimientosComponent implements OnInit {
  //Información de movimientos
  movimientos: Movimiento[] = [];
  movimiento: Movimiento = new Movimiento();
  ingreso: Ingreso = new Ingreso();
  egreso: Egreso = new Egreso();

  //edicion
  editar: boolean = false;

  //Configurador del paginador
  config: any;

  constructor() { }

  ngOnInit() {
    this.config = {
      id: "movimientos",
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.movimientos.length,
    };
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

  //FUNCIONES PARA INFORMACIÓN DE Movimientos
  abrirModalInformacionMovimiento(id: number){
    if (id == -1) {
      this.ingreso = new Ingreso();
      this.egreso = new Egreso();
    } else {
      this.editar = true;
      this.movimiento = this.movimientos[id];
    }
    $("#modalInformacionMovimiento").modal("show");
  }

}
