import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";
import { Sede } from 'src/app/entidades/sede';
import { AppService } from 'src/app/servicios/app.service';
import { SedeService } from 'src/app/servicios/sede.service';

declare const $: any;

@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.scss']
})
export class SedesComponent implements OnInit {

  sedes: Sede[] = [] 
  sedesIniciales: Sede[] = [];
  sede: Sede = new Sede();

  //edicion
  editar: boolean = false;
  
 
  //Configurador del paginador
  config: any;

  constructor(private appServicio: AppService, private sedeService: SedeService) { }

  ngOnInit() {
    this.listarTodos();
  }

  pageChange(event) {
    this.config.currentPage = event;
  }

  haySedes() {
    if (this.sedes.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  listarTodos(){
    this.sedeService.recuperarTodos().subscribe(n => {
      this.sedesIniciales = JSON.parse(JSON.stringify(n));
      this.sedesIniciales=this.sedesIniciales.filter((sede)=>sede.estado!=false);
      this.sedesIniciales=this.sedesIniciales.sort( (a, b) => a.nombre.localeCompare(b.nombre));
      this.sedes = JSON.parse(JSON.stringify(this.sedesIniciales));
      this.config = {
        id: "sedes",
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.sedes.length,
      };
    });
  }

  //FUNCIONES PARA INFORMACIÓN DE SEDES
  abrirModalInformacionSede(id: number){    
    if (id == -1) {
      this.sede = new Sede();
    } else {
      this.editar = true;
      this.sede = JSON.parse(JSON.stringify(this.sedes[id]));
    }
    $("#modalInformacionSede").modal("show");
  }

  cerrarModalInformacionSede(id: number){
    $("#modalInformacionSede").modal("hide");
    this.editar = false;

    if (id != 0) {
      if(this.validarInformacionSede()){
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
              this.sedeService.alta(this.sede).subscribe(n => {
                this.listarTodos();
                this.appServicio.mensajeSwal(1);
              }, error => {
                console.log(error);
              });
            }
            else{
              this.sedeService.modificacion(this.sede.id, this.sede).subscribe(n => {
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

  validarInformacionSede() {
    let estado: boolean = false;
    if (
      this.sede.nombre == ''       
     
    ) {
      estado = true;
    }

    return estado;
  }

  eliminarSede(id:number){      
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
          this.sede=JSON.parse(JSON.stringify(this.sedes[id]));                        
          this.sede.estado =false;
          this.sedeService.modificacion(this.sede.id, this.sede).subscribe(n => {
          this.listarTodos();             
          this.appServicio.mensajeSwal(5);
          }, error => {              
            this.appServicio.mensajeSwal(4);
            });        
          
        }
      });
    }
  }

  buscarSede(e: any){
    let valor = e.target.value;
    if(valor != ''){
      this.sedes = this.sedesIniciales.filter(n => n.nombre.toUpperCase().includes(valor.toUpperCase()) || 
      n.nombre.toUpperCase().includes(valor.toUpperCase()) );
    }
    else{
      this.sedes = this.sedesIniciales;
    }
  }

}
