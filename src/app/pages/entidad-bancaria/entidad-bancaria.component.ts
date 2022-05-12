import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";
import { EntidadBancaria } from 'src/app/entidades/entidadBancaria';
import { AppService } from 'src/app/servicios/app.service';
import { EntidadBancariaService } from 'src/app/servicios/entidadBancaria.service';

declare const $: any;

@Component({
  selector: 'app-entidad-bancaria',
  templateUrl: './entidad-bancaria.component.html',
  styleUrls: ['./entidad-bancaria.component.scss']
})
export class EntidadBancariaComponent implements OnInit {

  entidadbancarias: EntidadBancaria[] = [] 
  entidadbancariasIniciales: EntidadBancaria[] = [];
  entidadbancaria: EntidadBancaria = new EntidadBancaria();

  //edicion
  editar: boolean = false;
  
 
  //Configurador del paginador
  config: any;

  constructor(private appServicio: AppService, private entidadbancariaService: EntidadBancariaService) { }

  ngOnInit() {
    this.listarTodos();
  }

  pageChange(event) {
    this.config.currentPage = event;
  }

  hayEntidadBancarias() {
    if (this.entidadbancarias.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  listarTodos(){
    this.entidadbancariaService.recuperarTodos().subscribe(n => {
      this.entidadbancariasIniciales = JSON.parse(JSON.stringify(n));
      this.entidadbancariasIniciales=this.entidadbancariasIniciales.filter((entidadbancaria)=>entidadbancaria.estado!=false);
      this.entidadbancariasIniciales=this.entidadbancariasIniciales.sort( (a, b) => a.nombre.localeCompare(b.nombre));
      this.entidadbancarias = JSON.parse(JSON.stringify(this.entidadbancariasIniciales));
      this.config = {
        id: "entidadbancarias",
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.entidadbancarias.length,
      };
    });
  }

  //FUNCIONES PARA INFORMACIÓN DE ENTIDADBANCARIA
  abrirModalInformacionEntidadBancaria(id: number){    
    if (id == -1) {
      this.entidadbancaria = new EntidadBancaria();
    } else {
      this.editar = true;
      this.entidadbancaria = JSON.parse(JSON.stringify(this.entidadbancarias[id]));
    }
    $("#modalInformacionEntidadBancaria").modal("show");
  }

  cerrarModalInformacionEntidadBancaria(id: number){
    $("#modalInformacionEntidadBancaria").modal("hide");
    this.editar = false;

    if (id != 0) {
      if(this.validarInformacionEntidadBancaria()){
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
              this.entidadbancariaService.alta(this.entidadbancaria).subscribe(n => {
                this.listarTodos();
                this.appServicio.mensajeSwal(1);
              }, error => {
                console.log(error);
              });
            }
            else{
              this.entidadbancariaService.modificacion(this.entidadbancaria.id, this.entidadbancaria).subscribe(n => {
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

  validarInformacionEntidadBancaria() {
    let estado: boolean = false;
    if (
      this.entidadbancaria.nombre == ''       
     
    ) {
      estado = true;
    }

    return estado;
  }

  eliminarEntidadBancaria(id:number){      
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
          this.entidadbancaria=JSON.parse(JSON.stringify(this.entidadbancarias[id]));                        
          this.entidadbancaria.estado =false;
          this.entidadbancariaService.modificacion(this.entidadbancaria.id, this.entidadbancaria).subscribe(n => {
          this.listarTodos();             
          this.appServicio.mensajeSwal(5);
          }, error => {              
            this.appServicio.mensajeSwal(4);
            });        
          
        }
      });
    }
  }

  buscarEntidadBancaria(e: any){
    let valor = e.target.value;
    if(valor != ''){
      this.entidadbancarias = this.entidadbancariasIniciales.filter(n => n.nombre.toUpperCase().includes(valor.toUpperCase()) || 
      n.nombre.toUpperCase().includes(valor.toUpperCase()) );
    }
    else{
      this.entidadbancarias = this.entidadbancariasIniciales;
    }
  }


}
