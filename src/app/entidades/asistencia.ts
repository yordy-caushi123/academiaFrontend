export class Asistencia {
    id: number;
    idMatricula: number;
    idTipoAsistencia: number;
    asistencia:string    
    fecha: string;    
    estado: boolean;

    constructor(){
      this.id = 0;
      this.idMatricula = 0;
      this.idTipoAsistencia = 0;
      this.asistencia='';
      this.fecha = '';      
      this.estado = true;
    }
}