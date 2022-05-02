export class Egreso {
    id: number;
    idConceptoEgreso: number;
    idMes: number;
    idEjecutivo: number;
    fechaPago: string;
    numOperacion: string;
    observacion: string;
    imagen: string;
    total: number;

    constructor(){
      this.id = 0;
      this.idConceptoEgreso = 0;
      this.idMes = 0;
      this.idEjecutivo = 0;
      this.fechaPago = '';
      this.numOperacion = '';
      this.observacion = '';
      this.imagen = '';
      this.total = 0;
    }
}