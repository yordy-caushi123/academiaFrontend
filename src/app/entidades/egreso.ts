export class Egreso {
    id: number;
    idConceptoEgreso: number;
    idEjecutivo: number;
    fechaPago: string;
    numeroOperacion: string;
    observacion: string;
    imagen: string;
    total: number;
    estado: boolean;

    constructor(){
      this.id = 0;
      this.idConceptoEgreso = 0;
      this.idEjecutivo = 0;
      this.fechaPago = '';
      this.numeroOperacion = '';
      this.observacion = '';
      this.imagen = '';
      this.total = 0;
      this.estado = true;
    }
}