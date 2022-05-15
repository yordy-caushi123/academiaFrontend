import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";
import { Alumno } from 'src/app/entidades/alumno';
import { AppService } from 'src/app/servicios/app.service';
import { Apoderado } from 'src/app/entidades/apoderado';
import { AlumnoApoderado } from 'src/app/entidades/alumnoApoderado';
import { AlumnoService } from 'src/app/servicios/alumno.service';
import { AlumnoApoderadoService } from 'src/app/servicios/alumnoApoderado.service';
import { ApoderadoService } from 'src/app/servicios/apoderado.service';

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

  //apoderados: Apoderado[] = [];
  //alumnosApoderados: AlumnoApoderado[] = [];

  alumno: Alumno = new Alumno();
  apoderado: Apoderado = new Apoderado();
  alumnoApoderado: AlumnoApoderado = new AlumnoApoderado();

  //edicion
  editar: boolean = false;

  //Configurador del paginador
  config: any;

  constructor(private appServicio: AppService, private alumnoService: AlumnoService, 
    private alumnoApoderadoService: AlumnoApoderadoService, private apoderadoService: ApoderadoService) { }

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
      this.alumno = JSON.parse(JSON.stringify(this.alumnos[id-1]));
    }
    $("#modalInformacionAlumno").modal("show");
  }

  abrirModalInformacionApoderado(id: number){
    $("#modalInformacionApoderado").modal("show");
    this.alumno = JSON.parse(JSON.stringify(this.alumnos[id-1]));
    this.alumnoApoderadoService.recuperarPorIdAlumno(this.alumno.id).subscribe(n => {
      this.alumnoApoderado = JSON.parse(JSON.stringify(n));
      if(this.alumnoApoderado != null){
        this.editar = true;
        this.apoderadoService.recuperar(this.alumnoApoderado.idApoderado).subscribe(m => {
          this.apoderado = JSON.parse(JSON.stringify(m));
        }, error => {
          this.appServicio.mensajeSwal(4);
        });
      }
      else{
        this.apoderado = new Apoderado();
        this.alumnoApoderado = new AlumnoApoderado();
      }
    }, error => {
      console.log(error);
    });
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
                this.appServicio.mensajeSwal(4);
              });
            }
            else{
              this.alumnoService.modificacion(this.alumno.id, this.alumno).subscribe(n => {
                this.listarTodos();
                this.appServicio.mensajeSwal(2);
              }, error => {
                this.appServicio.mensajeSwal(4);
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
              this.apoderadoService.alta(this.apoderado).subscribe(n => {
                this.alumnoApoderado.idAlumno = this.alumno.id;
                this.alumnoApoderado.idApoderado = n.id;

                this.alumnoApoderadoService.alta(this.alumnoApoderado).subscribe(m => {
                  this.appServicio.mensajeSwal(1);
                }, error3 => {
                  this.appServicio.mensajeSwal(4);
                });
              }, error1 => {
                this.appServicio.mensajeSwal(4);
              });
            }
            else{
              this.apoderadoService.modificacion(this.apoderado.id, this.apoderado).subscribe(n => {
                this.appServicio.mensajeSwal(2);
              }, error2 =>{
                this.appServicio.mensajeSwal(4);
              });
            }
            this.editar = false;
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
      this.alumnos = this.alumnosIniciales.filter(n => n.nombres.toUpperCase().includes(valor.toUpperCase()) || 
      n.nombres.toUpperCase().includes(valor.toUpperCase()) || n.dni.toUpperCase().includes(valor.toUpperCase()));
    }
    else{
      this.alumnos = this.alumnosIniciales;
    }
  }

}
