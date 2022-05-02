import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/servicios/app.service';

declare const $: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss', './inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private servicio: AppService) { }

  ngOnInit() {
    $(".modal").modal("hide");
  }

}
