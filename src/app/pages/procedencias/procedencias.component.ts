import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";
import { Procedencia } from 'src/app/entidades/procedencia';
import { AppService } from 'src/app/servicios/app.service';
import { ProcedenciaService } from 'src/app/servicios/procedencia.service';

declare const $: any;

@Component({
  selector: 'app-procedencias',
  templateUrl: './procedencias.component.html',
  styleUrls: ['./procedencias.component.scss']
})
export class ProcedenciasComponent implements OnInit {

  procedencias: Procedencia[] = [] 
  procedenciasIniciales: Procedencia[] = [];
  procedencia: Procedencia = new Procedencia();

  //edicion
  editar: boolean = false;  
 
  //Configurador del paginador
  config: any;

  constructor(private appServicio: AppService, private procedenciaService: ProcedenciaService) { }

  ngOnInit() {
    this.listarTodos();
  }

  pageChange(event) {
    this.config.currentPage = event;
  }

  hayProcedencias() {
    if (this.procedencias.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  listarTodos(){
    this.procedenciaService.recuperarTodos().subscribe(n => {
      this.procedenciasIniciales = JSON.parse(JSON.stringify(n));
      this.procedenciasIniciales=this.procedenciasIniciales.filter((procedencia)=>procedencia.estado!=false);
      this.procedenciasIniciales=this.procedenciasIniciales.sort( (a, b) => a.nombre.localeCompare(b.nombre));
      this.procedencias = JSON.parse(JSON.stringify(this.procedenciasIniciales));
      this.config = {
        id: "procedencias",
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.procedencias.length,
      };
    });
  }

  //FUNCIONES PARA INFORMACIÓN DE PROCEDENCIAS
  abrirModalInformacionProcedencia(id: number){    
    if (id == -1) {
      this.procedencia = new Procedencia();
    } else {
      this.editar = true;
      this.procedencia = JSON.parse(JSON.stringify(this.procedencias[id]));
    }
    $("#modalInformacionProcedencia").modal("show");
  }

  cerrarModalInformacionProcedencia(id: number){
    $("#modalInformacionProcedencia").modal("hide");
    this.editar = false;

    if (id != 0) {
      if(this.validarInformacionProcedencia()){
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
              this.procedenciaService.alta(this.procedencia).subscribe(n => {
                this.listarTodos();
                this.appServicio.mensajeSwal(1);
              }, error => {
                console.log(error);
              });
            }
            else{
              this.procedenciaService.modificacion(this.procedencia.id, this.procedencia).subscribe(n => {
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

  validarInformacionProcedencia() {
    let estado: boolean = false;
    if (
      this.procedencia.nombre == ''       
     
    ) {
      estado = true;
    }

    return estado;
  }

  eliminarProcedencia(id:number){      
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
          this.procedencia=JSON.parse(JSON.stringify(this.procedencias[id]));                        
          this.procedencia.estado =false;
          this.procedenciaService.modificacion(this.procedencia.id, this.procedencia).subscribe(n => {
          this.listarTodos();             
          this.appServicio.mensajeSwal(5);
          }, error => {              
            this.appServicio.mensajeSwal(4);
            });        
          
        }
      });
    }
  }

  buscarProcedencia(e: any){
    let valor = e.target.value;
    if(valor != ''){
      this.procedencias = this.procedenciasIniciales.filter(n => n.nombre.toUpperCase().includes(valor.toUpperCase()) || 
      n.nombre.toUpperCase().includes(valor.toUpperCase()) );
    }
    else{
      this.procedencias = this.procedenciasIniciales;
    }
  }

}
