export class Usuario {
  idUsuario: number;

  tipoUsuario: number;
  estadoUsuario: number;
  conexionUsuario: number;
  nombreUsuario: String;
  contrasenaUsuario: String;

  roles: String[];

  idUsuCreacion: number;
  fechaCreacion: Date;
  ipCreacion: String;

  constructor(){
    this.idUsuario = 0;
    this.tipoUsuario = 0;
    this.estadoUsuario = 0;
    this.conexionUsuario = 0;
    this.nombreUsuario = '';
    this.contrasenaUsuario = '';
    this.roles = [];
    this.idUsuCreacion = 0;
    this.fechaCreacion = null;
    this.ipCreacion = '';
  }
}
