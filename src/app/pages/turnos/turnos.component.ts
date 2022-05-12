import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";
import { Turno } from 'src/app/entidades/turno';
import { AppService } from 'src/app/servicios/app.service';
import { TurnoService } from 'src/app/servicios/turno.service';

declare const $: any;

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.scss']
})
export class TurnosComponent implements OnInit {

  turnos: Turno[] = [] 
  turnosIniciales: Turno[] = [];
  turno: Turno = new Turno();

  //edicion
  editar: boolean = false;  
 
  //Configurador del paginador
  config: any;

  constructor(private appServicio: AppService, private turnoService: TurnoService) { }

  ngOnInit() {
    this.listarTodos();
  }

  pageChange(event) {
    this.config.currentPage = event;
  }

  hayTurnos() {
    if (this.turnos.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  listarTodos(){
    this.turnoService.recuperarTodos().subscribe(n => {
      this.turnosIniciales = JSON.parse(JSON.stringify(n));
      this.turnosIniciales=this.turnosIniciales.filter((turno)=>turno.estado!=false);
      this.turnosIniciales=this.turnosIniciales.sort( (a, b) => a.nombre.localeCompare(b.nombre));
      this.turnos = JSON.parse(JSON.stringify(this.turnosIniciales));
      this.config = {
        id: "turnos",
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.turnos.length,
      };
    });
  }

  //FUNCIONES PARA INFORMACIÓN DE TURNOS
  abrirModalInformacionTurno(id: number){    
    if (id == -1) {
      this.turno = new Turno();
    } else {
      this.editar = true;
      this.turno = JSON.parse(JSON.stringify(this.turnos[id]));
    }
    $("#modalInformacionTurno").modal("show");
  }

  cerrarModalInformacionTurno(id: number){
    $("#modalInformacionTurno").modal("hide");
    this.editar = false;

    if (id != 0) {
      if(this.validarInformacionTurno()){
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
              this.turnoService.alta(this.turno).subscribe(n => {
                this.listarTodos();
                this.appServicio.mensajeSwal(1);
              }, error => {
                console.log(error);
              });
            }
            else{
              this.turnoService.modificacion(this.turno.id, this.turno).subscribe(n => {
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

  validarInformacionTurno() {
    let estado: boolean = false;
    if (
      this.turno.nombre == ''       
     
    ) {
      estado = true;
    }

    return estado;
  }

  eliminarTurno(id:number){      
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
          this.turno=JSON.parse(JSON.stringify(this.turnos[id]));                        
          this.turno.estado =false;
          this.turnoService.modificacion(this.turno.id, this.turno).subscribe(n => {
          this.listarTodos();             
          this.appServicio.mensajeSwal(5);
          }, error => {              
            this.appServicio.mensajeSwal(4);
            });        
          
        }
      });
    }
  }


  buscarTurno(e: any){
    let valor = e.target.value;
    if(valor != ''){
      this.turnos = this.turnosIniciales.filter(n => n.nombre.toUpperCase().includes(valor.toUpperCase()) || 
      n.nombre.toUpperCase().includes(valor.toUpperCase()) );
    }
    else{
      this.turnos = this.turnosIniciales;
    }
  }



}
