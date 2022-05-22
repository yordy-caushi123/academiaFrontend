import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";
import { Asistencia } from 'src/app/entidades/asistencia';
import { Matricula } from 'src/app/entidades/matricula';
import { TipoAsistencia } from 'src/app/entidades/tipoAsistencia';
import { AppService } from 'src/app/servicios/app.service';
import { AsistenciaService } from 'src/app/servicios/asistencia.service';
import { MatriculaService } from 'src/app/servicios/matricula.service';
import { TipoAsistenciaService } from 'src/app/servicios/tipoAsistencia.service';

declare const $: any;

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.scss']
})
export class AsistenciasComponent implements OnInit {

  asistencias: Asistencia[] = [] 
  asistenciasIniciales: Asistencia[] = [];
  matriculas: Matricula[] = []
  tipoasistencias: TipoAsistencia[] = [] 
  asistencia: Asistencia = new Asistencia();

  //edicion
  editar: boolean = false;
  
 
  //Configurador del paginador
  config: any;

  constructor(private appServicio: AppService, private asistenciaService: AsistenciaService, private matriculaService: MatriculaService, private tipoasistenciaService: TipoAsistenciaService ) { }

  ngOnInit() {
    this.listarTodos();
    this.listarMatriculas();
    this.listarTipoAsistencias();
  }

  pageChange(event) {
    this.config.currentPage = event;
  }

  hayAsistencias() {
    if (this.asistencias.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  listarTodos(){
    this.asistenciaService.recuperarTodos().subscribe(n => {
      this.asistenciasIniciales = JSON.parse(JSON.stringify(n));
      this.asistenciasIniciales=this.asistenciasIniciales.filter((asistencia)=>asistencia.estado!=false);
      this.asistencias = JSON.parse(JSON.stringify(this.asistenciasIniciales));     
      this.config = {
        id: "asistencias",
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.asistencias.length,
      };
    });
  }

  listarMatriculas(){
    this.matriculaService.recuperarTodos().subscribe(n => {
      this.matriculas = JSON.parse(JSON.stringify(n)); 
      this.matriculas=this.matriculas.filter((matricula)=>matricula.estado!=false);
      sessionStorage.setItem("matriculas", JSON.stringify(this.matriculas));   
    });
  }

  listarTipoAsistencias(){
    this.tipoasistenciaService.recuperarTodos().subscribe(n => {
      this.tipoasistencias = JSON.parse(JSON.stringify(n));
      this.tipoasistencias=this.tipoasistencias.filter((tipoasistencia)=>tipoasistencia.estado!=false);
      sessionStorage.setItem("tipoasistencias", JSON.stringify(this.tipoasistencias)); 
    });
  }

  //FUNCIONES PARA INFORMACIÓN DE ASISTENCIAS
  abrirModalInformacionAsistencia(id: number){
    if (id == -1) {
      this.asistencia = new Asistencia();
    } else {
      this.editar = true;
      this.asistencia = JSON.parse(JSON.stringify(this.asistencias[id]));
    }
    $("#modalInformacionAsistencia").modal("show");
  }

  cerrarModalInformacionAsistencia(id: number){
    $("#modalInformacionAsistencia").modal("hide");
    this.editar = false;

    if (id != 0) {
      if(this.validarInformacionAsistencia()){
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
              this.asistenciaService.alta(this.asistencia).subscribe(n => {
                this.listarTodos();
                this.appServicio.mensajeSwal(1);
              }, error => {
                console.log(error);
              });
            }
            else{
              this.asistenciaService.modificacion(this.asistencia.id, this.asistencia).subscribe(n => {
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

  validarInformacionAsistencia() {
    let estado: boolean = false;
    if (
      this.asistencia.fecha == '' ||
      this.asistencia.idMatricula == 0 ||
      this.asistencia.idTipoAsistencia == 0 ||  
      this.asistencia.asistencia == ''
      
    ) {
      estado = true;
    }

    return estado;
  }

  eliminarAsistencia(id:number){   
    
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
          this.asistencia=JSON.parse(JSON.stringify(this.matriculas[id]));                      
          this.asistencia.estado =false;
          this.matriculaService.modificacion(this.asistencia.id, this.asistencia).subscribe(n => {
          this.listarTodos();
          this.appServicio.mensajeSwal(5);
          }, error => {
              this.appServicio.mensajeSwal(4);
            });
        }        
        
      });
    }

  }


}
