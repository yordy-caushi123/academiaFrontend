export class Movimiento {
    numeroOperacion: string;
    fechaPago: string;
    tipoMovimiento: number;
    total: number;
    cuenta: number;

    constructor(){
      this.numeroOperacion = '';
      this.fechaPago = '';
      this.tipoMovimiento = 0;
      this.total = 0;
      this.cuenta = 0;
    }
}