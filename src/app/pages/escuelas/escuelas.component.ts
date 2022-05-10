import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";
import { Escuela } from 'src/app/entidades/escuela';
import { AppService } from 'src/app/servicios/app.service';
import { EscuelaService } from 'src/app/servicios/escuela.service';


declare const $: any;

@Component({
  selector: 'app-escuelas',
  templateUrl: './escuelas.component.html',
  styleUrls: ['./escuelas.component.scss']
})
export class EscuelasComponent implements OnInit {

  escuelas: Escuela[] = [] 
  escuelasIniciales: Escuela[] = [];
  escuela: Escuela = new Escuela();

  //edicion
  editar: boolean = false;
  //eliminar
  eliminar:boolean=false;
 
  //Configurador del paginador
  config: any;


  constructor(private appServicio: AppService, private escuelaService: EscuelaService) { }

  ngOnInit() {
    this.listarTodos();
  }

  pageChange(event) {
    this.config.currentPage = event;
  }

  hayEscuelas() {
    if (this.escuelas.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  listarTodos(){
    this.escuelaService.recuperarTodos().subscribe(n => {
      this.escuelasIniciales = JSON.parse(JSON.stringify(n));
      this.escuelas = JSON.parse(JSON.stringify(this.escuelasIniciales));
      this.config = {
        id: "escuelas",
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.escuelas.length,
      };
    });
  }


  //FUNCIONES PARA INFORMACIÓN DE ESCUELAS
  abrirModalInformacionEscuela(id: number){
    if (id == -1) {
      this.escuela = new Escuela();
    } else {
      this.editar = true;
      this.escuela = this.escuelas[id];
    }
    $("#modalInformacionEscuela").modal("show");
  }


  cerrarModalInformacionEscuela(id: number){
    $("#modalInformacionEscuela").modal("hide");
    this.editar = false;

    if (id != 0) {
      if(this.validarInformacionEscuela()){
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
              this.escuelaService.alta(this.escuela).subscribe(n => {
                this.listarTodos();
                this.appServicio.mensajeSwal(1);
              }, error => {
                console.log(error);
              });
            }
            else{
              this.escuelaService.modificacion(this.escuela.id, this.escuela).subscribe(n => {
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

  validarInformacionEscuela() {
    let estado: boolean = false;
    if (
      this.escuela.nombre == '' 
     
    ) {
      estado = true;
    }

    return estado;
  }


  eliminarEscuela(id:number){

    this.eliminar = false;
    console.log(this.eliminar);
    
    if (id != 0) {
      
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
          if(!this.eliminar){
            this.escuela=this.escuelas[id];                    
            this.escuela.estado =false;
            this.escuelaService.modificacion(this.escuela.id, this.escuela).subscribe(n => {
              this.listarTodos();
              this.appServicio.mensajeSwal(1);
            }, error => {
              console.log(error);
            });
          }
          
        }
      });
    }

  }

  buscarEscuela(e: any){
    let valor = e.target.value;
    if(valor != ''){
      this.escuelas = this.escuelasIniciales.filter(n => n.nombre.includes(valor) || n.nombre.includes(valor) || n.sigla.includes(valor));
    }
    else{
      this.escuelas = this.escuelasIniciales;
    }
  }

}
