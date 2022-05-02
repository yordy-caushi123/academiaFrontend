export class TipoDocumento {
    codTipodoc: number;
    tipoDoc: String;
    estado: boolean;

    constructor(){
      this.codTipodoc = 0;
      this.tipoDoc = '';
      this.estado = true;
    }
}