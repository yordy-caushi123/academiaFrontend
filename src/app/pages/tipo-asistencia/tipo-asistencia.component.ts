import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";
import { TipoAsistencia } from 'src/app/entidades/tipoAsistencia';
import { AppService } from 'src/app/servicios/app.service';
import { TipoAsistenciaService } from 'src/app/servicios/tipoAsistencia.service';

declare const $: any;

@Component({
  selector: 'app-tipo-asistencia',
  templateUrl: './tipo-asistencia.component.html',
  styleUrls: ['./tipo-asistencia.component.scss']
})
export class TipoAsistenciaComponent implements OnInit {

  tipoasistencias: TipoAsistencia[] = [] 
  tipoasistenciasIniciales: TipoAsistencia[] = [];
  tipoasistencia: TipoAsistencia = new TipoAsistencia();

  //edicion
  editar: boolean = false;
  
 
  //Configurador del paginador
  config: any;

  constructor(private appServicio: AppService, private tipoasistenciaService: TipoAsistenciaService) { }

  ngOnInit() {
    this.listarTodos();
  }

  pageChange(event) {
    this.config.currentPage = event;
  }

  hayTipoAsistencias() {
    if (this.tipoasistencias.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  listarTodos(){
    this.tipoasistenciaService.recuperarTodos().subscribe(n => {
      this.tipoasistenciasIniciales = JSON.parse(JSON.stringify(n));
      this.tipoasistenciasIniciales=this.tipoasistenciasIniciales.filter((tipoasistencia)=>tipoasistencia.estado!=false);
      this.tipoasistenciasIniciales=this.tipoasistenciasIniciales.sort( (a, b) => a.nombre.localeCompare(b.nombre));
      this.tipoasistencias = JSON.parse(JSON.stringify(this.tipoasistenciasIniciales));
      this.config = {
        id: "tipoasistencias",
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.tipoasistencias.length,
      };
    });
  }

  //FUNCIONES PARA INFORMACIÓN DE TIPOASISTENCIA
  abrirModalInformacionTipoAsistencia(id: number){    
    if (id == -1) {
      this.tipoasistencia = new TipoAsistencia();
    } else {
      this.editar = true;
      this.tipoasistencia = JSON.parse(JSON.stringify(this.tipoasistencias[id]));
    }
    $("#modalInformacionTipoAsistencia").modal("show");
  }

  cerrarModalInformacionTipoAsistencia(id: number){
    $("#modalInformacionTipoAsistencia").modal("hide");
    this.editar = false;

    if (id != 0) {
      if(this.validarInformacionTipoAsistencia()){
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
              this.tipoasistenciaService.alta(this.tipoasistencia).subscribe(n => {
                this.listarTodos();
                this.appServicio.mensajeSwal(1);
              }, error => {
                console.log(error);
              });
            }
            else{
              this.tipoasistenciaService.modificacion(this.tipoasistencia.id, this.tipoasistencia).subscribe(n => {
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

  validarInformacionTipoAsistencia() {
    let estado: boolean = false;
    if (
      this.tipoasistencia.nombre == ''       
     
    ) {
      estado = true;
    }

    return estado;
  }

  eliminarTipoAsistencia(id:number){      
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
          this.tipoasistencia=JSON.parse(JSON.stringify(this.tipoasistencias[id]));                        
          this.tipoasistencia.estado =false;
          this.tipoasistenciaService.modificacion(this.tipoasistencia.id, this.tipoasistencia).subscribe(n => {
          this.listarTodos();             
          this.appServicio.mensajeSwal(5);
          }, error => {              
            this.appServicio.mensajeSwal(4);
            });        
          
        }
      });
    }
  }

  buscarTipoAsistencia(e: any){
    let valor = e.target.value;
    if(valor != ''){
      this.tipoasistencias = this.tipoasistenciasIniciales.filter(n => n.nombre.toUpperCase().includes(valor.toUpperCase()) || 
      n.nombre.toUpperCase().includes(valor.toUpperCase()) );
    }
    else{
      this.tipoasistencias = this.tipoasistenciasIniciales;
    }
  }


}
