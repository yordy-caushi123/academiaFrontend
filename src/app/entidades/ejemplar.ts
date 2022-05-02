export class Ejemplar {
  id: number = 0;
  ejempNro: String;
  bibliotecaNroCorre: String;
	bibliotecaClasificacionCodClasif: String;
	estadoEjemplarCodEst: number;
	tipoMonedaCodTipMon: number;
	modoIngresoCodModIng: number;
	versionCodVersion: number;
	caracteristicaCodCaract: number;
	ciudadCodCiudad: number;
  paisCodPais: String;
	editorialCodEditorial: number;
	idiomaCodIdioma: number;
	aaPublic: String;
	edicion: String;
	precio: number;
	fecAlta: String;
	fecBaja: String;
	observa: String;
	codVersion: String;
	totpag: String;
	nroIngreso: number;
	stsEjemp: number;
  estado: boolean;

  constructor(){
    this.id = 0;
    this.ejempNro = '';
    this.bibliotecaNroCorre = '';
    this.bibliotecaClasificacionCodClasif = '';
    this.estadoEjemplarCodEst = 0;
    this.tipoMonedaCodTipMon = 0;
    this.modoIngresoCodModIng = 0;
    this.versionCodVersion = 0;
    this.caracteristicaCodCaract = 0;
    this.ciudadCodCiudad = 0;
    this.paisCodPais = '';
    this.editorialCodEditorial = 0;
    this.idiomaCodIdioma = 0;
    this.aaPublic = '';
    this.edicion = '';
    this.precio = 0;
    this.fecAlta = '';
    this.fecBaja = '';
    this.observa = '';
    this.codVersion = '';
    this.totpag = '';
    this.nroIngreso = 0;
    this.stsEjemp = 0;
    this.estado = true;
  }
}
