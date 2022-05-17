import { Component, OnInit, Pipe } from '@angular/core';
import { Matricula } from 'src/app/entidades/matricula';
import { Alumno } from 'src/app/entidades/alumno';
import { Sede } from 'src/app/entidades/sede';
import swal from "sweetalert2";
import { AppService } from 'src/app/servicios/app.service';
import { MatriculaService } from 'src/app/servicios/matricula.service';
import { Escuela } from 'src/app/entidades/escuela';
import { Ciclo } from 'src/app/entidades/ciclo';
import { Turno } from 'src/app/entidades/turno';
import { Modalidad } from 'src/app/entidades/modalidad';
import { Procedencia } from 'src/app/entidades/procedencia';
import { Referido } from 'src/app/entidades/referido';
import { AlumnoService } from 'src/app/servicios/alumno.service';
import { SedeService } from 'src/app/servicios/sede.service';
import { EscuelaService } from 'src/app/servicios/escuela.service';
import { CicloService } from 'src/app/servicios/ciclo.service';
import { TurnoService } from 'src/app/servicios/turno.service';
import { ModalidadService } from 'src/app/servicios/modalidad.service';
import { ProcedenciaService } from 'src/app/servicios/procedencia.service';
import { ReferidoService } from 'src/app/servicios/referido.service';

declare const $: any;

@Component({
  selector: 'app-matriculas',
  templateUrl: './matriculas.component.html',
  styleUrls: ['./matriculas.component.scss']
})

export class MatriculasComponent implements OnInit {

   //Información de matriculas
   matriculas: Matricula[] = []
   matriculasIniciales: Matricula[] = [];
   alumnos: Alumno[] = []   
   sedes: Sede[] = []  
   escuelas: Escuela[] = []   
   ciclos: Ciclo[] = []   
   turnos: Turno[] = []   
   modalidades: Modalidad[] = []   
   procedencias: Procedencia[] = []   
   referidos: Referido[] = []  
   matricula: Matricula = new Matricula();
   alumno: Alumno = new Alumno();
   sede: Sede = new Sede();
   escuela: Escuela = new Escuela();
   ciclo: Ciclo = new Ciclo();
   turno: Turno = new Turno();
   modalidad: Modalidad = new Modalidad();
   procedencia: Procedencia = new Procedencia();
   referido: Referido = new Referido(); 
   
   //edicion
  editar: boolean = false; 

  //Configurador del paginador
  config: any;

  //buscador
  buscar: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
   

  constructor(private appServicio: AppService, private matriculaService: MatriculaService, private alumnoService: AlumnoService, private sedeService: SedeService, private escuelaService: EscuelaService, 
    private cicloService: CicloService, private turnoService: TurnoService, private modalidadService: ModalidadService, private procedenciaService: ProcedenciaService, private referidoService: ReferidoService) { }

  ngOnInit() {
    this.listarTodos();
    this.listarAlumnos();
    this.listarSedes();
    this.listarEscuelas();
    this.listarCiclos();
    this.listarTurnos();
    this.listarModalidades();
    this.listarProcedencias();
    this.listarReferidos();

  }

  pageChange(event) {
    this.config.currentPage = event;
  }

  hayMatriculas() {
    if (this.matriculas.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  listarTodos(){
    this.matriculaService.recuperarTodos().subscribe(n => {
      this.matriculasIniciales = JSON.parse(JSON.stringify(n));
      this.matriculasIniciales=this.matriculasIniciales.filter((matricula)=>matricula.estado!=false);
      this.matriculas = JSON.parse(JSON.stringify(this.matriculasIniciales));     
      this.config = {
        id: "matriculas",
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.matriculas.length,
      };
    });
  }

  

  listarAlumnos(){
    this.alumnoService.recuperarTodos().subscribe(n => {
      this.alumnos = JSON.parse(JSON.stringify(n)); 
      this.alumnos=this.alumnos.filter((alumno)=>alumno.estado!=false);
      sessionStorage.setItem("alumnos", JSON.stringify(this.alumnos));   
    });
  }

  listarSedes(){
    this.sedeService.recuperarTodos().subscribe(n => {
      this.sedes = JSON.parse(JSON.stringify(n));
      this.sedes=this.sedes.filter((sede)=>sede.estado!=false);
      sessionStorage.setItem("sedes", JSON.stringify(this.sedes)); 
    });
  }

  listarEscuelas(){
    this.escuelaService.recuperarTodos().subscribe(n => {
      this.escuelas = JSON.parse(JSON.stringify(n));
      this.escuelas=this.escuelas.filter((escuela)=>escuela.estado!=false);
      sessionStorage.setItem("escuelas", JSON.stringify(this.escuelas)); 
    });
  }

  listarCiclos(){
    this.cicloService.recuperarTodos().subscribe(n => {
      this.ciclos = JSON.parse(JSON.stringify(n));
      this.ciclos=this.ciclos.filter((ciclo)=>ciclo.estado!=false); 
      sessionStorage.setItem("ciclos", JSON.stringify(this.ciclos));  
    });
  }

  listarTurnos(){
    this.turnoService.recuperarTodos().subscribe(n => {
    this.turnos = JSON.parse(JSON.stringify(n));
    this.turnos=this.turnos.filter((turno)=>turno.estado!=false);
     
    });
  }

  listarModalidades(){
    this.modalidadService.recuperarTodos().subscribe(n => {
    this.modalidades = JSON.parse(JSON.stringify(n));
    this.modalidades=this.modalidades.filter((modalidad)=>modalidad.estado!=false);
      
    });
  }

  listarProcedencias(){
    this.procedenciaService.recuperarTodos().subscribe(n => {
    this.procedencias = JSON.parse(JSON.stringify(n));
    this.procedencias=this.procedencias.filter((procedencia)=>this.procedencia.estado!=false);
      
    });
  }
  
  listarReferidos(){
    this.referidoService.recuperarTodos().subscribe(n => {
    this.referidos = JSON.parse(JSON.stringify(n));
    this.referidos=this.referidos.filter((referido)=>referido.estado!=false);
     
    });
  }
  
  //FUNCIONES PARA INFORMACIÓN DE MATRICULAS
  abrirModalInformacionMatricula(id: number){
    if (id == -1) {
      this.matricula = new Matricula();
    } else {
      this.editar = true;
      this.matricula = JSON.parse(JSON.stringify(this.matriculas[id]));
    }
    $("#modalInformacionMatricula").modal("show");
  }



  cerrarModalInformacionMatricula(id: number){
    $("#modalInformacionMatricula").modal("hide");
    this.editar = false;

    if (id != 0) {
      if(this.validarInformacionMatricula()){
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
              this.matriculaService.alta(this.matricula).subscribe(n => {
                this.listarTodos();
                this.appServicio.mensajeSwal(1);
              }, error => {
                console.log(error);
              });
            }
            else{
              this.matriculaService.modificacion(this.matricula.id, this.matricula).subscribe(n => {
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


  validarInformacionMatricula() {
    let estado: boolean = false;
    if (
      this.matricula.fecha == '' ||
      this.matricula.idAlumno == 0 ||
      this.matricula.idEscuela == 0 ||
      this.matricula.idSede == 0 ||
      this.matricula.idCiclo == 0 ||
      this.matricula.idTurno == 0 ||
      this.matricula.idModalidad == 0 ||
      this.matricula.idProcedencia == 0 ||
      this.matricula.idReferido == 0 ||      
      this.matricula.observacion == ''
      
    ) {
      estado = true;
    }

    return estado;
  }


  eliminarMatricula(id:number){   
    
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
          this.matricula=JSON.parse(JSON.stringify(this.matriculas[id]));                      
          this.matricula.estado =false;
          this.matriculaService.modificacion(this.matricula.id, this.matricula).subscribe(n => {
          this.listarTodos();
          this.appServicio.mensajeSwal(5);
          }, error => {
              this.appServicio.mensajeSwal(4);
            });
        }        
        
      });
    }

  }

  buscarMatricula(e: any, campo: number){
    if(campo == 1){
      this.buscar = e.target.value;
    }
    if(campo == 2){
      this.fechaInicio = e.target.value;
    }
    if(campo == 3){
      this.fechaFin = e.target.value;
    }

    if(this.buscar.length == 0){
      if(this.fechaInicio.length == 0){
        if(this.fechaFin.length == 0){
          this.listarTodos();
        }
        else{
          this.matriculas = this.matriculasIniciales.filter(n => n.fecha <= this.fechaFin);
        }
      }
      else{
        if(this.fechaFin.length == 0){
          this.matriculas = this.matriculasIniciales.filter(n => n.fecha >= this.fechaInicio);
        }
        else{
          this.matriculas = this.matriculasIniciales.filter(n => n.fecha <= this.fechaFin);
          this.matriculas = this.matriculas.filter(n => n.fecha >= this.fechaInicio);
        }
      }
    }
    else{
      let alumnosIds = this.filtroAlumnos(this.buscar);
      this.matriculas = this.matriculasIniciales.filter(n => alumnosIds.includes(n.idAlumno));
      if(this.fechaInicio.length == 0){
        if(this.fechaFin.length == 0){
          
        }
        else{
          this.matriculas = this.matriculas.filter(n => n.fecha <= this.fechaFin);
        }
      }
      else{
        if(this.fechaFin.length == 0){
          this.matriculas = this.matriculas.filter(n => n.fecha >= this.fechaInicio);
        }
        else{
          this.matriculas = this.matriculas.filter(n => n.fecha <= this.fechaFin);
          this.matriculas = this.matriculas.filter(n => n.fecha >= this.fechaInicio);
        }
      }
    }
  }

  filtroAlumnos(buscar: string){
    let alums = this.alumnos.filter(n => n.nombres.toUpperCase().includes(buscar.toUpperCase()) || 
    n.apellidos.toUpperCase().includes(buscar.toUpperCase()) || n.dni.toUpperCase().includes(buscar.toUpperCase()));
    let ids = [];
    for(let i = 0; i < alums.length; i++){
      ids.push(alums[i].id);
    }
    return ids;
  }

}
