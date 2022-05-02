export class Biblioteca {
    id: number;
    nroCorre: String;
    clasificacionCodClasif: String;
    periodoCodPeriodo: number;
    areaCodArea: number;
    tipoDocumentoCodTipodoc: number;
    ubicacionCodUbi: String;
    codigo: String;
    titulo: String;
    autorPer: String;
    autorInst: String;
    descriptor: String;
    isbn: String;
    comenta: String;
    tamano: String;
    nroRev: String;
    flgNovedad: String;
    stsBiblioteca: String;
    estado: boolean;

    constructor(){

      this.id = 0;
      this.nroCorre = '';
      this.clasificacionCodClasif = '';
      this.periodoCodPeriodo = 0;
      this.areaCodArea = 0;
      this.tipoDocumentoCodTipodoc = 0;
      this.ubicacionCodUbi = '';
      this.codigo = '';
      this.titulo = '';
      this.autorPer = '';
      this.autorInst = '';
      this.descriptor = '';
      this.isbn = '';
      this.comenta = '';
      this.tamano = '';
      this.nroRev = '';
      this.flgNovedad = '';
      this.stsBiblioteca = '';
      this.estado = false;
    }

    /*constructor(id: number, nroCorre: String, clasificacionCodClasif: String, periodoCodPeriodo: number, areaCodArea: number,
      tipoDocumentoCodTipodoc: number, ubicacionCodUbi: String, codigo: String, titulo: String, autorPer: String, autorInst: String,
      descriptor: String, isbn: String, comenta: String, tamano: String, nroRev: String, flgNovedad: String, stsBiblioteca: String, estado: boolean){

      this.id = id;
      this.nroCorre = nroCorre;
      this.clasificacionCodClasif = clasificacionCodClasif;
      this.periodoCodPeriodo = periodoCodPeriodo;
      this.areaCodArea = areaCodArea;
      this.tipoDocumentoCodTipodoc = tipoDocumentoCodTipodoc;
      this.ubicacionCodUbi = ubicacionCodUbi;
      this.codigo = codigo;
      this.titulo = titulo;
      this.autorPer = autorPer;
      this.autorInst = autorInst;
      this.descriptor = descriptor;
      this.isbn = isbn;
      this.comenta = comenta;
      this.tamano = tamano;
      this.nroRev = nroRev;
      this.flgNovedad = flgNovedad;
      this.stsBiblioteca = stsBiblioteca;
      this.estado = estado;
    }*/
}
