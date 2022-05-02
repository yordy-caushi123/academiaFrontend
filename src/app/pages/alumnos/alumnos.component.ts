import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";
import { Alumno } from 'src/app/entidades/alumno';
import { AppService } from 'src/app/servicios/app.service';
import { Apoderado } from 'src/app/entidades/apoderado';
import { AlumnoApoderado } from 'src/app/entidades/alumnoApoderado';
import { AlumnoService } from 'src/app/servicios/alumno.service';

declare const $: any;

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit {

  //Información de alumnos
  alumnos: Alumno[] = []
  alumnosIniciales: Alumno[] = [];
  apoderados: Apoderado[] = [];
  alumnosApoderados: AlumnoApoderado[] = [];
  alumno: Alumno = new Alumno();
  apoderado: Apoderado = new Apoderado();
  alumnoApoderado: AlumnoApoderado = new AlumnoApoderado();

  //edicion
  editar: boolean = false;

  //Configurador del paginador
  config: any;

  constructor(private appServicio: AppService, private alumnoService: AlumnoService) { }

  ngOnInit() {
    this.listarTodos();
  }

  pageChange(event) {
    this.config.currentPage = event;
  }

  hayAlumnos() {
    if (this.alumnos.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  listarTodos(){
    this.alumnoService.recuperarTodos().subscribe(n => {
      this.alumnosIniciales = JSON.parse(JSON.stringify(n));
      this.alumnos = JSON.parse(JSON.stringify(this.alumnosIniciales));
      this.config = {
        id: "alumnos",
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.alumnos.length,
      };
    });
  }

  //FUNCIONES PARA INFORMACIÓN DE ALUMNOS
  abrirModalInformacionAlumno(id: number){
    if (id == -1) {
      this.alumno = new Alumno();
    } else {
      this.editar = true;
      this.alumno = this.alumnos[id];
    }
    $("#modalInformacionAlumno").modal("show");
  }

  abrirModalInformacionApoderado(id: number){
    $("#modalInformacionApoderado").modal("show");
    this.alumno = this.alumnos[id];
    this.alumnoApoderado = this.alumnosApoderados.find(n => this.alumnos[id].id == n.alumno);
    if(this.alumnoApoderado != undefined){
      this.editar = true;
      this.apoderado = this.apoderados.find(n => this.alumnoApoderado.apoderado == n.id);
    }
    else{
      this.apoderado = new Apoderado();
      this.alumnoApoderado = new AlumnoApoderado();
    }
  }

  cerrarModalInformacionAlumno(id: number){
    $("#modalInformacionAlumno").modal("hide");
    this.editar = false;

    if (id != 0) {
      if(this.validarInformacionAlumno()){
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
              this.alumnoService.alta(this.alumno).subscribe(n => {
                this.listarTodos();
                this.appServicio.mensajeSwal(1);
              }, error => {
                console.log(error);
              });
            }
            else{
              this.alumnoService.modificacion(this.alumno.id, this.alumno).subscribe(n => {
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

  cerrarModalInformacionApoderado(id: number){
    $("#modalInformacionApoderado").modal("hide");
    this.editar = false;

    if (id != 0) {
      if(this.validarInformacionApoderado()){
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
              this.apoderado.id = this.apoderados.length + 1;
              this.apoderados.push(this.apoderado);

              this.alumnoApoderado.id = this.alumnosApoderados.length + 1;
              this.alumnoApoderado.alumno = this.alumno.id;
              this.alumnoApoderado.apoderado = this.apoderado.id;
              this.alumnosApoderados.push(this.alumnoApoderado);

              this.appServicio.mensajeSwal(1);
            }
            else{
              this.appServicio.mensajeSwal(2);
            }
          }
        });
      }
    }
  }

  validarInformacionAlumno() {
    let estado: boolean = false;
    if (
      this.alumno.nombres == '' ||
      this.alumno.apellidos == '' ||
      this.alumno.dni == '' ||
      this.alumno.fechaNacimiento == '' ||
      this.alumno.telefono == ''
    ) {
      estado = true;
    }

    return estado;
  }

  validarInformacionApoderado() {
    let estado: boolean = false;
    if (
      this.apoderado.nombres == '' ||
      this.apoderado.apellidos == '' ||
      this.apoderado.dni == '' ||
      this.apoderado.telefono == ''
    ) {
      estado = true;
    }

    return estado;
  }

  buscarAlumno(e: any){
    let valor = e.target.value;
    if(valor != ''){
      this.alumnos = this.alumnosIniciales.filter(n => n.nombres.includes(valor) || n.nombres.includes(valor) || n.dni.includes(valor));
    }
    else{
      this.alumnos = this.alumnosIniciales;
    }
  }

}
