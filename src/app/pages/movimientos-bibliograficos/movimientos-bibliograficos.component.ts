import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movimientos-bibliograficos',
  templateUrl: './movimientos-bibliograficos.component.html',
  styleUrls: ['./movimientos-bibliograficos.component.scss']
})
export class MovimientosBibliograficosComponent implements OnInit {
  movimientosBibliograficos: any = [];

  //Configurador del paginador
  config: any;

  constructor() { }

  ngOnInit() {
    this.movimientosBibliograficos = [
      {
        titulo: "Texto de Oratoria",
        ejemplar: 1,
        fechaPrestamo: "10-10-2020",
        fechaRegreso: "15-10-2020",
        estado: "Prestado"
      },
      {
        titulo: "Texto de Oratoria",
        ejemplar: 1,
        fechaPrestamo: "10-10-2020",
        fechaRegreso: "15-10-2020",
        estado: "Disponible"
      },
      {
        titulo: "Texto de Oratoria",
        ejemplar: 1,
        fechaPrestamo: "10-10-2020",
        fechaRegreso: "15-10-2020",
        estado: "Prestado"
      },
      {
        titulo: "Texto de Oratoria",
        ejemplar: 1,
        fechaPrestamo: "10-10-2020",
        fechaRegreso: "15-10-2020",
        estado: "Disponible"
      },
      {
        titulo: "Texto de Oratoria",
        ejemplar: 1,
        fechaPrestamo: "10-10-2020",
        fechaRegreso: "15-10-2020",
        estado: "Prestado"
      },
      {
        titulo: "Texto de Oratoria",
        ejemplar: 1,
        fechaPrestamo: "10-10-2020",
        fechaRegreso: "15-10-2020",
        estado: "Prestado"
      },
      {
        titulo: "Texto de Oratoria",
        ejemplar: 1,
        fechaPrestamo: "10-10-2020",
        fechaRegreso: "15-10-2020",
        estado: "Prestado"
      },
      {
        titulo: "Texto de Oratoria",
        ejemplar: 1,
        fechaPrestamo: "10-10-2020",
        fechaRegreso: "15-10-2020",
        estado: "Prestado"
      },
      {
        titulo: "Texto de Oratoria",
        ejemplar: 1,
        fechaPrestamo: "10-10-2020",
        fechaRegreso: "15-10-2020",
        estado: "Prestado"
      },
      {
        titulo: "Texto de Oratoria",
        ejemplar: 1,
        fechaPrestamo: "10-10-2020",
        fechaRegreso: "15-10-2020",
        estado: "Disponible"
      },
      {
        titulo: "Texto de Oratoria",
        ejemplar: 1,
        fechaPrestamo: "10-10-2020",
        fechaRegreso: "15-10-2020",
        estado: "Prestado"
      },
      {
        titulo: "Texto de Oratoria",
        ejemplar: 1,
        fechaPrestamo: "10-10-2020",
        fechaRegreso: "15-10-2020",
        estado: "Prestado"
      },
      {
        titulo: "Texto de Oratoria",
        ejemplar: 1,
        fechaPrestamo: "10-10-2020",
        fechaRegreso: "15-10-2020",
        estado: "Prestado"
      },
      {
        titulo: "Texto de Oratoria",
        ejemplar: 1,
        fechaPrestamo: "10-10-2020",
        fechaRegreso: "15-10-2020",
        estado: "Prestado"
      },{
        titulo: "Texto de Oratoria",
        ejemplar: 1,
        fechaPrestamo: "10-10-2020",
        fechaRegreso: "15-10-2020",
        estado: "Prestado"
      },
      {
        titulo: "Texto de Oratoria",
        ejemplar: 1,
        fechaPrestamo: "10-10-2020",
        fechaRegreso: "15-10-2020",
        estado: "Prestado"
      },
      {
        titulo: "Texto de Oratoria",
        ejemplar: 1,
        fechaPrestamo: "10-10-2020",
        fechaRegreso: "15-10-2020",
        estado: "Prestado"
      },
      {
        titulo: "Texto de Oratoria",
        ejemplar: 1,
        fechaPrestamo: "10-10-2020",
        fechaRegreso: "15-10-2020",
        estado: "Prestado"
      }
    ];

    this.config = {
      id: 'movimientosBibliograficos',
      itemsPerPage: 15,
      currentPage: 1,
      totalItems: this.movimientosBibliograficos.length
    };
  }

  pageChange(event) {
    this.config.currentPage = event;
  }

  hayMovimientosBibliograficos(){
    if(this.movimientosBibliograficos.length==0){
      return false;
    }
    else{
      return true;
    }
  }


}
