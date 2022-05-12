import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";
import { Ciclo } from 'src/app/entidades/ciclo';
import { AppService } from 'src/app/servicios/app.service';
import { CicloService } from 'src/app/servicios/ciclo.service';

declare const $: any;

@Component({
  selector: 'app-ciclos',
  templateUrl: './ciclos.component.html',
  styleUrls: ['./ciclos.component.scss']
})
export class CiclosComponent implements OnInit {

  ciclos: Ciclo[] = [] 
  ciclosIniciales: Ciclo[] = [];
  ciclo: Ciclo = new Ciclo();

  //edicion
  editar: boolean = false;  
 
  //Configurador del paginador
  config: any;

  constructor(private appServicio: AppService, private cicloService: CicloService) { }

  ngOnInit() {
    this.listarTodos();
  }

  pageChange(event) {
    this.config.currentPage = event;
  }

  hayCiclos() {
    if (this.ciclos.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  listarTodos(){
    this.cicloService.recuperarTodos().subscribe(n => {
      this.ciclosIniciales = JSON.parse(JSON.stringify(n));
      this.ciclosIniciales=this.ciclosIniciales.filter((ciclo)=>ciclo.estado!=false);
      this.ciclosIniciales=this.ciclosIniciales.sort( (a, b) => a.nombre.localeCompare(b.nombre));
      this.ciclos = JSON.parse(JSON.stringify(this.ciclosIniciales));
      this.config = {
        id: "ciclos",
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.ciclos.length,
      };
    });
  }

  //FUNCIONES PARA INFORMACIÓN DE CICLOS
  abrirModalInformacionCiclo(id: number){    
    if (id == -1) {
      this.ciclo = new Ciclo();
    } else {
      this.editar = true;
      this.ciclo = JSON.parse(JSON.stringify(this.ciclos[id]));
    }
    $("#modalInformacionCiclo").modal("show");
  }

  cerrarModalInformacionCiclo(id: number){
    $("#modalInformacionCiclo").modal("hide");
    this.editar = false;

    if (id != 0) {
      if(this.validarInformacionCiclo()){
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
              this.cicloService.alta(this.ciclo).subscribe(n => {
                this.listarTodos();
                this.appServicio.mensajeSwal(1);
              }, error => {
                console.log(error);
              });
            }
            else{
              this.cicloService.modificacion(this.ciclo.id, this.ciclo).subscribe(n => {
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

  validarInformacionCiclo() {
    let estado: boolean = false;
    if (
      this.ciclo.nombre == ''       
     
    ) {
      estado = true;
    }

    return estado;
  }

  eliminarCiclo(id:number){      
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
          this.ciclo=JSON.parse(JSON.stringify(this.ciclos[id]));                        
          this.ciclo.estado =false;
          this.cicloService.modificacion(this.ciclo.id, this.ciclo).subscribe(n => {
          this.listarTodos();             
          this.appServicio.mensajeSwal(5);
          }, error => {              
            this.appServicio.mensajeSwal(4);
            });        
          
        }
      });
    }
  }

  buscarCiclo(e: any){
    let valor = e.target.value;
    if(valor != ''){
      this.ciclos = this.ciclosIniciales.filter(n => n.nombre.toUpperCase().includes(valor.toUpperCase()) || 
      n.nombre.toUpperCase().includes(valor.toUpperCase()) );
    }
    else{
      this.ciclos = this.ciclosIniciales;
    }
  }

}
