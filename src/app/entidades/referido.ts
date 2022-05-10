export class Referido {
    id: number;  
    dni: string;   
    nombres: string;
    apellidos: string;     
    estado: boolean;

    constructor(){
      this.id = 0; 
      this.dni='';     
      this.nombres = ''; 
      this.apellidos='';     
      this.estado = true;
    }
}