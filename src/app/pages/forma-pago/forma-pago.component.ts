import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";
import { FormaPago } from 'src/app/entidades/formaPago';
import { AppService } from 'src/app/servicios/app.service';
import { FormaPagoService } from 'src/app/servicios/formaPago.service';

declare const $: any;

@Component({
  selector: 'app-forma-pago',
  templateUrl: './forma-pago.component.html',
  styleUrls: ['./forma-pago.component.scss']
})
export class FormaPagoComponent implements OnInit {

  formapagos: FormaPago[] = [] 
  formapagosIniciales: FormaPago[] = [];
  formapago: FormaPago = new FormaPago();

  //edicion
  editar: boolean = false;
  
 
  //Configurador del paginador
  config: any;

  constructor(private appServicio: AppService, private formapagoService: FormaPagoService) { }

  ngOnInit() {
    this.listarTodos();
  }

  pageChange(event) {
    this.config.currentPage = event;
  }

  hayFormaPagos() {
    if (this.formapagos.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  listarTodos(){
    this.formapagoService.recuperarTodos().subscribe(n => {
      this.formapagosIniciales = JSON.parse(JSON.stringify(n));
      this.formapagosIniciales=this.formapagosIniciales.filter((formapago)=>formapago.estado!=false);
      this.formapagosIniciales=this.formapagosIniciales.sort( (a, b) => a.nombre.localeCompare(b.nombre));
      this.formapagos = JSON.parse(JSON.stringify(this.formapagosIniciales));
      this.config = {
        id: "formapagos",
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.formapagos.length,
      };
    });
  }

  //FUNCIONES PARA INFORMACIÓN DE FORMAPAGOS
  abrirModalInformacionFormaPago(id: number){    
    if (id == -1) {
      this.formapago = new FormaPago();
    } else {
      this.editar = true;
      this.formapago = JSON.parse(JSON.stringify(this.formapagos[id]));
    }
    $("#modalInformacionFormaPago").modal("show");
  }

  cerrarModalInformacionFormaPago(id: number){
    $("#modalInformacionFormaPago").modal("hide");
    this.editar = false;

    if (id != 0) {
      if(this.validarInformacionFormaPago()){
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
              this.formapagoService.alta(this.formapago).subscribe(n => {
                this.listarTodos();
                this.appServicio.mensajeSwal(1);
              }, error => {
                console.log(error);
              });
            }
            else{
              this.formapagoService.modificacion(this.formapago.id, this.formapago).subscribe(n => {
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

  validarInformacionFormaPago() {
    let estado: boolean = false;
    if (
      this.formapago.nombre == ''       
     
    ) {
      estado = true;
    }

    return estado;
  }

  eliminarFormaPago(id:number){      
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
          this.formapago=JSON.parse(JSON.stringify(this.formapagos[id]));                        
          this.formapago.estado =false;
          this.formapagoService.modificacion(this.formapago.id, this.formapago).subscribe(n => {
          this.listarTodos();             
          this.appServicio.mensajeSwal(5);
          }, error => {              
            this.appServicio.mensajeSwal(4);
            });        
          
        }
      });
    }
  }

  buscarFormaPago(e: any){
    let valor = e.target.value;
    if(valor != ''){
      this.formapagos = this.formapagosIniciales.filter(n => n.nombre.toUpperCase().includes(valor.toUpperCase()) || 
      n.nombre.toUpperCase().includes(valor.toUpperCase()) );
    }
    else{
      this.formapagos = this.formapagosIniciales;
    }
  }


}
