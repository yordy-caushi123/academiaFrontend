export class Ingreso {
    id: number;
    idTipoIngreso: number;
    idAlumno: number;
    idFormaPago: number;
    idEntidadBancaria: number;
    idMes: number;
    idEjecutivo: number;
    fechaPago: string;
    numOperacion: string;
    observacion: string;
    imagen: string;
    cuenta: number;
    total: number;

    constructor(){
      this.id = 0;
      this.idTipoIngreso = 0;
      this.idAlumno = 0;
      this.idFormaPago = 0;
      this.idEntidadBancaria = 0;
      this.idMes = 0;
      this.idEjecutivo = 0;
      this.fechaPago = '';
      this.numOperacion = '';
      this.observacion = '';
      this.imagen = '';
      this.cuenta = 0;
      this.total = 0;
    }
}