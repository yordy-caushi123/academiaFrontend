export class Movimiento {
    num_operacion: string;
    fecha_pago: string;
    tipo_movimiento: number;
    total: number;

    constructor(){
      this.num_operacion = '';
      this.fecha_pago = '';
      this.tipo_movimiento = 0;
      this.total = 0;
    }
}