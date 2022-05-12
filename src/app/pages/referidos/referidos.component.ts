import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";
import { Referido } from 'src/app/entidades/referido';
import { AppService } from 'src/app/servicios/app.service';
import { ReferidoService } from 'src/app/servicios/referido.service';

declare const $: any;

@Component({
  selector: 'app-referidos',
  templateUrl: './referidos.component.html',
  styleUrls: ['./referidos.component.scss']
})
export class ReferidosComponent implements OnInit {

  referidos: Referido[] = [] 
  referidosIniciales: Referido[] = [];
  referido: Referido = new Referido();

  //edicion
  editar: boolean = false;  
 
  //Configurador del paginador
  config: any;

  constructor(private appServicio: AppService, private referidoService: ReferidoService) { }

  ngOnInit() {
    this.listarTodos();
  }

  pageChange(event) {
    this.config.currentPage = event;
  }

  hayReferidos() {
    if (this.referidos.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  listarTodos(){
    this.referidoService.recuperarTodos().subscribe(n => {
      this.referidosIniciales = JSON.parse(JSON.stringify(n));
      this.referidosIniciales=this.referidosIniciales.filter((referido)=>referido.estado!=false);
      this.referidosIniciales=this.referidosIniciales.sort( (a, b) => a.nombres.localeCompare(b.nombres));
      this.referidos = JSON.parse(JSON.stringify(this.referidosIniciales));
      this.config = {
        id: "referidos",
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.referidos.length,
      };
    });
  }

  //FUNCIONES PARA INFORMACIÓN DE REFERIDOS
  abrirModalInformacionReferido(id: number){    
    if (id == -1) {
      this.referido = new Referido();
    } else {
      this.editar = true;
      this.referido = JSON.parse(JSON.stringify(this.referidos[id]));
    }
    $("#modalInformacionReferido").modal("show");
  }

  cerrarModalInformacionReferido(id: number){
    $("#modalInformacionReferido").modal("hide");
    this.editar = false;

    if (id != 0) {
      if(this.validarInformacionReferido()){
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
              this.referidoService.alta(this.referido).subscribe(n => {
                this.listarTodos();
                this.appServicio.mensajeSwal(1);
              }, error => {
                console.log(error);
              });
            }
            else{
              this.referidoService.modificacion(this.referido.id, this.referido).subscribe(n => {
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

  validarInformacionReferido() {
    let estado: boolean = false;
    if (    
      this.referido.nombres == ''  ||
      this.referido.apellidos==''   || 
      this.referido.dni==''
     
    ) {
      estado = true;
    }

    return estado;
  }

  eliminarReferido(id:number){      
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
          this.referido=JSON.parse(JSON.stringify(this.referidos[id]));                        
          this.referido.estado =false;
          this.referidoService.modificacion(this.referido.id, this.referido).subscribe(n => {
          this.listarTodos();             
          this.appServicio.mensajeSwal(5);
          }, error => {              
            this.appServicio.mensajeSwal(4);
            });        
          
        }
      });
    }
  }

  buscarReferido(e: any){
    let valor = e.target.value;
    if(valor != ''){
      this.referidos = this.referidosIniciales.filter(n => n.nombres.toUpperCase().includes(valor.toUpperCase()) || 
      n.nombres.toUpperCase().includes(valor.toUpperCase()) || n.dni.toUpperCase().includes(valor.toUpperCase()));
    }
    else{
      this.referidos = this.referidosIniciales;
    }
  }

}
