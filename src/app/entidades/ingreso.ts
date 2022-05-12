export class Ingreso {
    id: number;
    idTipoIngreso: number;
    idAlumno: number;
    idFormaPago: number;
    idEntidadBancaria: number;
    idEjecutivo: number;
    fechaPago: string;
    numeroOperacion: string;
    observacion: string;
    imagen: string;
    cuenta: number;
    total: number;
    estado: boolean;

    constructor(){
      this.id = 0;
      this.idTipoIngreso = 0;
      this.idAlumno = 0;
      this.idFormaPago = 0;
      this.idEntidadBancaria = 0;
      this.idEjecutivo = 0;
      this.fechaPago = '';
      this.numeroOperacion = '';
      this.observacion = '';
      this.imagen = '';
      this.cuenta = 0;
      this.total = 0;
      this.estado = true;
    }
}