export class Alumno {
    id: number;
    dni: string;
    nombres: string;
    apellidos: string;
    fechaNacimiento: string;
    telefono: string;
    estado: boolean;

    constructor(){
      this.id = 0;
      this.dni = '';
      this.nombres = '';
      this.apellidos = '';
      this.fechaNacimiento = '';
      this.telefono = '';
      this.estado = true;
    }
}