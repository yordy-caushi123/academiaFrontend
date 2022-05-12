import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";
import { TipoIngreso } from 'src/app/entidades/tipoIngreso';
import { AppService } from 'src/app/servicios/app.service';
import { TipoIngresoService } from 'src/app/servicios/tipoIngreso.service';

declare const $: any;

@Component({
  selector: 'app-tipo-ingreso',
  templateUrl: './tipo-ingreso.component.html',
  styleUrls: ['./tipo-ingreso.component.scss']
})
export class TipoIngresoComponent implements OnInit {

  tipoingresos: TipoIngreso[] = [] 
  tipoingresosIniciales: TipoIngreso[] = [];
  tipoingreso: TipoIngreso = new TipoIngreso();

  //edicion
  editar: boolean = false;
  
 
  //Configurador del paginador
  config: any;

  constructor(private appServicio: AppService, private tipoingresoService: TipoIngresoService) { }

  ngOnInit() {
    this.listarTodos();
  }

  pageChange(event) {
    this.config.currentPage = event;
  }

  hayTipoIngresos() {
    if (this.tipoingresos.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  listarTodos(){
    this.tipoingresoService.recuperarTodos().subscribe(n => {
      this.tipoingresosIniciales = JSON.parse(JSON.stringify(n));
      this.tipoingresosIniciales=this.tipoingresosIniciales.filter((tipoingreso)=>tipoingreso.estado!=false);
      this.tipoingresosIniciales=this.tipoingresosIniciales.sort( (a, b) => a.nombre.localeCompare(b.nombre));
      this.tipoingresos = JSON.parse(JSON.stringify(this.tipoingresosIniciales));
      this.config = {
        id: "tipoingresos",
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.tipoingresos.length,
      };
    });
  }

  //FUNCIONES PARA INFORMACIÓN DE TIPOINGRESOS
  abrirModalInformacionTipoIngreso(id: number){    
    if (id == -1) {
      this.tipoingreso = new TipoIngreso();
    } else {
      this.editar = true;
      this.tipoingreso = JSON.parse(JSON.stringify(this.tipoingresos[id]));
    }
    $("#modalInformacionTipoIngreso").modal("show");
  }

  cerrarModalInformacionTipoIngreso(id: number){
    $("#modalInformacionTipoIngreso").modal("hide");
    this.editar = false;

    if (id != 0) {
      if(this.validarInformacionTipoIngreso()){
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
              this.tipoingresoService.alta(this.tipoingreso).subscribe(n => {
                this.listarTodos();
                this.appServicio.mensajeSwal(1);
              }, error => {
                console.log(error);
              });
            }
            else{
              this.tipoingresoService.modificacion(this.tipoingreso.id, this.tipoingreso).subscribe(n => {
                this.listarTodos();
                this.appServicio.mensajeSwal(2);
              }, error => {
                console.log(error);
              });
            }
          }
        });
      }
    }
  }

  validarInformacionTipoIngreso() {
    let estado: boolean = false;
    if (
      this.tipoingreso.nombre == ''       
     
    ) {
      estado = true;
    }

    return estado;
  }

  eliminarTipoIngreso(id:number){      
    if (id >= 0) {      
      swal.fire({
        title: '¿Está seguro de continuar?',
        text: "Los datos quedarán eliminados del sistema",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {   
          this.tipoingreso=JSON.parse(JSON.stringify(this.tipoingresos[id]));                        
          this.tipoingreso.estado =false;
          this.tipoingresoService.modificacion(this.tipoingreso.id, this.tipoingreso).subscribe(n => {
          this.listarTodos();             
          this.appServicio.mensajeSwal(5);
          }, error => {              
            this.appServicio.mensajeSwal(4);
            });        
          
        }
      });
    }
  }

  buscarTipoIngreso(e: any){
    let valor = e.target.value;
    if(valor != ''){
      this.tipoingresos = this.tipoingresosIniciales.filter(n => n.nombre.toUpperCase().includes(valor.toUpperCase()) || 
      n.nombre.toUpperCase().includes(valor.toUpperCase()) );
    }
    else{
      this.tipoingresos = this.tipoingresosIniciales;
    }
  }

}
