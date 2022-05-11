import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";
import { Modalidad } from 'src/app/entidades/modalidad';
import { AppService } from 'src/app/servicios/app.service';
import { ModalidadService } from 'src/app/servicios/modalidad.service';


declare const $: any;

@Component({
  selector: 'app-modalidades',
  templateUrl: './modalidades.component.html',
  styleUrls: ['./modalidades.component.scss']
})
export class ModalidadesComponent implements OnInit {

  
  modalidades: Modalidad[] = [] 
  modalidadesIniciales: Modalidad[] = [];
  modalidad: Modalidad = new Modalidad();

  //edicion
  editar: boolean = false;  
 
  //Configurador del paginador
  config: any;


  constructor(private appServicio: AppService, private modalidadService: ModalidadService) { }

  ngOnInit() {
    this.listarTodos();
  }

  pageChange(event) {
    this.config.currentPage = event;
  }

  hayModalidades() {
    if (this.modalidades.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  listarTodos(){
    this.modalidadService.recuperarTodos().subscribe(n => {
      this.modalidadesIniciales = JSON.parse(JSON.stringify(n));
      this.modalidadesIniciales=this.modalidadesIniciales.filter((modalidad)=>modalidad.estado!=false);
      this.modalidadesIniciales=this.modalidadesIniciales.sort( (a, b) => a.nombre.localeCompare(b.nombre));
      this.modalidades = JSON.parse(JSON.stringify(this.modalidadesIniciales));
      this.config = {
        id: "modalidades",
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.modalidades.length,
      };
    });
  }

  //FUNCIONES PARA INFORMACIÓN DE MODALIDADES
  abrirModalInformacionModalidad(id: number){    
    if (id == -1) {
      this.modalidad = new Modalidad();
    } else {
      this.editar = true;
      this.modalidad = JSON.parse(JSON.stringify(this.modalidades[id]));
    }
    $("#modalInformacionModalidad").modal("show");
  }

  cerrarModalInformacionModalidad(id: number){
    $("#modalInformacionModalidad").modal("hide");
    this.editar = false;

    if (id != 0) {
      if(this.validarInformacionModalidad()){
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
              this.modalidadService.alta(this.modalidad).subscribe(n => {
                this.listarTodos();
                this.appServicio.mensajeSwal(1);
              }, error => {
                console.log(error);
              });
            }
            else{
              this.modalidadService.modificacion(this.modalidad.id, this.modalidad).subscribe(n => {
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

  validarInformacionModalidad() {
    let estado: boolean = false;
    if (
      this.modalidad.nombre == ''       
     
    ) {
      estado = true;
    }

    return estado;
  }

  eliminarModalidad(id:number){      
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
          this.modalidad=JSON.parse(JSON.stringify(this.modalidades[id]));                        
          this.modalidad.estado =false;
          this.modalidadService.modificacion(this.modalidad.id, this.modalidad).subscribe(n => {
          this.listarTodos();             
          this.appServicio.mensajeSwal(5);
          }, error => {              
            this.appServicio.mensajeSwal(4);
            });        
          
        }
      });
    }
  }

  buscarModalidad(e: any){
    let valor = e.target.value;
    if(valor != ''){
      this.modalidades = this.modalidadesIniciales.filter(n => n.nombre.toUpperCase().includes(valor.toUpperCase()) || 
      n.nombre.toUpperCase().includes(valor.toUpperCase()) );
    }
    else{
      this.modalidades = this.modalidadesIniciales;
    }
  }


}
