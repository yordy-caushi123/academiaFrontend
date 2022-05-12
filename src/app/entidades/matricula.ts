export class Matricula {
    id: number;
    idAlumno: number;
    idEscuela: number;
    idSede: number;
    idCiclo: number;
    idTurno: number;
    idModalidad: number;
    idProcedencia: number;
    idReferido: number;
    idEjecutivo: number;
    fecha: string;
    observacion: string;
    estado: boolean;

    constructor(){
      this.id = 0;
      this.idAlumno = 0;
      this.idEscuela = 0;
      this.idSede = 0;
      this.idCiclo = 0;
      this.idTurno = 0;
      this.idModalidad = 0;
      this.idProcedencia = 0;
      this.idReferido = 0;
      this.idEjecutivo = 0;
      this.fecha = '';
      this.observacion = '';
      this.estado = true;
    }
}