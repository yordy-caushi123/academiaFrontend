import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";
import { ConceptoEgreso } from 'src/app/entidades/conceptoEgreso';
import { AppService } from 'src/app/servicios/app.service';
import { ConceptoEgresoService } from 'src/app/servicios/conceptoEgreso.service';

declare const $: any;

@Component({
  selector: 'app-concepto-egreso',
  templateUrl: './concepto-egreso.component.html',
  styleUrls: ['./concepto-egreso.component.scss']
})
export class ConceptoEgresoComponent implements OnInit {

  conceptoegresos: ConceptoEgreso[] = [] 
  conceptoegresosIniciales: ConceptoEgreso[] = [];
  conceptoegreso: ConceptoEgreso = new ConceptoEgreso();

  //edicion
  editar: boolean = false;
  
 
  //Configurador del paginador
  config: any;


  constructor(private appServicio: AppService, private conceptoegresoService: ConceptoEgresoService) { }

  ngOnInit() {
    this.listarTodos();
  }

  pageChange(event) {
    this.config.currentPage = event;
  }

  hayConceptoEgresos() {
    if (this.conceptoegresos.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  listarTodos(){
    this.conceptoegresoService.recuperarTodos().subscribe(n => {
      this.conceptoegresosIniciales = JSON.parse(JSON.stringify(n));
      this.conceptoegresosIniciales=this.conceptoegresosIniciales.filter((conceptoegreso)=>conceptoegreso.estado!=false);
      this.conceptoegresosIniciales=this.conceptoegresosIniciales.sort( (a, b) => a.nombre.localeCompare(b.nombre));
      this.conceptoegresos = JSON.parse(JSON.stringify(this.conceptoegresosIniciales));
      this.config = {
        id: "conceptoegresos",
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.conceptoegresos.length,
      };
    });
  }

  //FUNCIONES PARA INFORMACIÓN DE CONCEPTOEGRESO
  abrirModalInformacionConceptoEgreso(id: number){    
    if (id == -1) {
      this.conceptoegreso = new ConceptoEgreso();
    } else {
      this.editar = true;
      this.conceptoegreso = JSON.parse(JSON.stringify(this.conceptoegresos[id]));
    }
    $("#modalInformacionConceptoEgreso").modal("show");
  }

  cerrarModalInformacionConceptoEgreso(id: number){
    $("#modalInformacionConceptoEgreso").modal("hide");
    this.editar = false;

    if (id != 0) {
      if(this.validarInformacionConceptoEgreso()){
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
              this.conceptoegresoService.alta(this.conceptoegreso).subscribe(n => {
                this.listarTodos();
                this.appServicio.mensajeSwal(1);
              }, error => {
                console.log(error);
              });
            }
            else{
              this.conceptoegresoService.modificacion(this.conceptoegreso.id, this.conceptoegreso).subscribe(n => {
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

  validarInformacionConceptoEgreso() {
    let estado: boolean = false;
    if (
      this.conceptoegreso.nombre == ''       
     
    ) {
      estado = true;
    }

    return estado;
  }

  eliminarConceptoEgreso(id:number){      
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
          this.conceptoegreso=JSON.parse(JSON.stringify(this.conceptoegresos[id]));                        
          this.conceptoegreso.estado =false;
          this.conceptoegresoService.modificacion(this.conceptoegreso.id, this.conceptoegreso).subscribe(n => {
          this.listarTodos();             
          this.appServicio.mensajeSwal(5);
          }, error => {              
            this.appServicio.mensajeSwal(4);
            });        
          
        }
      });
    }
  }

  buscarConceptoEgreso(e: any){
    let valor = e.target.value;
    if(valor != ''){
      this.conceptoegresos = this.conceptoegresosIniciales.filter(n => n.nombre.toUpperCase().includes(valor.toUpperCase()) || 
      n.nombre.toUpperCase().includes(valor.toUpperCase()) );
    }
    else{
      this.conceptoegresos = this.conceptoegresosIniciales;
    }
  }

}
