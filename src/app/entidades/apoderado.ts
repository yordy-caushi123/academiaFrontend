export class Apoderado {
    id: number;
    dni: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    estado: boolean;

    constructor(){
      this.id = 0;
      this.dni = '';
      this.nombres = '';
      this.apellidos = '';
      this.telefono = '';
      this.estado = true;
    }
}