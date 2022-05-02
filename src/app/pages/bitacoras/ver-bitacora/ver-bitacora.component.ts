import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { AppService } from 'src/app/servicios/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BitacorasService } from 'src/app/servicios/bitacoras.service';
import { Bitacora } from 'src/app/entidades/bitacora';
import swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-ver-bitacora',
  templateUrl: './ver-bitacora.component.html',
  styleUrls: ['./ver-bitacora.component.scss']
})
export class VerBitacoraComponent implements OnInit {

  id: number = 0;
  bitacora: Bitacora = new Bitacora();

  mostrarInicial: boolean =  true;
  mostrarModificado: boolean = true;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private servicio: AppService,
    private bitacorasServicio: BitacorasService) { }

  ngOnInit() {
    $(".modal").modal("hide");

    this.bitacora.nombreUsuario="";
    this.bitacora.contenidoInicial="";
    this.bitacora.contenidoModificado="";
    this.bitacora.accion=0;
    this.bitacora.descripcion="";

    this.id = this.route.snapshot.params["id"];
    //let cadenaEncriptada: String = atob(this.route.snapshot.params["id"]);
    //this.id = Number(CryptoJS.AES.decrypt(cadenaEncriptada.toString(), this.servicio.getLlaveEncriptado().toString().toString()).toString(CryptoJS.enc.Utf8));
    this.bitacorasServicio.recuperar(this.id).subscribe(data => {
      this.bitacora = data;

      if(this.bitacora.contenidoInicial=="" || this.bitacora.contenidoInicial==null){
        this.bitacora.contenidoInicial = '{}';
        this.mostrarInicial = false;
      }

      this.bitacora.contenidoInicial = JSON.parse(this.bitacora.contenidoInicial.toString());
      if(this.bitacora.contenidoModificado=="" || this.bitacora.contenidoModificado==null){
        this.bitacora.contenidoModificado = '{}';
        this.mostrarModificado = false;
      }

      this.bitacora.contenidoModificado = JSON.parse(this.bitacora.contenidoModificado.toString());

    }, error => {
      swal.fire(
        'Error',
        'No se puede recuperar los datos',
        'error'
      )
      this.gotoInicio();
    });
  }

  gotoInicio() {
    this.router.navigate(['/inicio']);
  }

}
