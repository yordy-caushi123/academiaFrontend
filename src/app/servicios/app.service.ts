import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import swal from "sweetalert2";

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class AppService {
  isSidebarPinned = false;
  isSidebarToggeled = false;

  //Encriptado
  llaveEncriptacion: String = "$DOITNIIC%14-11-2019?";

  localIp: any;
  ipAddress: String = '';
  private ipRegex = new RegExp(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/);

  private baseUrl = 'https://academiabe.herokuapp.com/api/codigo';

  constructor(private http:HttpClient, private zone:NgZone) { }

  toggleSidebar() {
    this.isSidebarToggeled = ! this.isSidebarToggeled;
  }

  toggleSidebarPin() {
    this.isSidebarPinned = ! this.isSidebarPinned;
  }

  getSidebarStat() {
    return {
      isSidebarPinned: this.isSidebarPinned,
      isSidebarToggeled: this.isSidebarToggeled
    }
  }

  getLlaveEncriptado(){
    return this.llaveEncriptacion;
  }





  

  soloNumeros(texto: String){
    let numeros ="0123456789";

    let condicion = true;
    for(let i=0; i<texto.length; i++){
       if (numeros.indexOf(texto.charAt(i),0)==-1){
          condicion = false;
       }
    }
    return condicion;
  }

  soloCaracteres(texto: String){
    var letras="áéíóúabcdefghijklmnñopqrstuvwxyz";

    texto = texto.toLowerCase();
    let condicion = true;
    for(let i=0; i<texto.length; i++){
        if (letras.indexOf(texto.charAt(i),0)==-1){
          condicion = false;
        }
    }
    return condicion;
  }

  caracteresEspacio(texto: String){
    var letras="áéíóúabcdefghijklmnñopqrstuvwxyz ";

    texto = texto.toLowerCase();
    let condicion = true;
    for(let i=0; i<texto.length; i++){
        if (letras.indexOf(texto.charAt(i),0)==-1){
          condicion = false;
        }
    }
    return condicion;
  }

  caracteresEspacioComa(texto: String){
    var letras="áéíóúabcdefghijklmnñopqrstuvwxyz, ";

    texto = texto.toLowerCase();
    let condicion = true;
    for(let i=0; i<texto.length; i++){
        if (letras.indexOf(texto.charAt(i),0)==-1){
          condicion = false;
        }
    }
    return condicion;
  }

  esTexto(texto: String){
    var letras="äëïöüáéíóúabcdefghijklmnñopqrstuvwxyz123456789.,;' " + '()¿??¡!%&-"';

    texto = texto.toLowerCase();
    let condicion = true;
    for(let i=0; i<texto.length; i++){
        if (letras.indexOf(texto.charAt(i),0)==-1){
          condicion = false;
        }
    }
    return condicion;
  }

  esEmail(texto){
    const emailRegex = new RegExp(/^([\da-zA-Z_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})$/);
    if(!emailRegex.exec(texto)){
      return true;
    }
    else{
      return false;
    }
  }

  esNombreDocumento(texto: String){
    var letras="äëïöüáéíóúabcdefghijklmnñopqrstuvwxyz123456789 -_,.";

    texto = texto.toLowerCase();
    let condicion = true;
    for(let i=0; i<texto.length; i++){
        if (letras.indexOf(texto.charAt(i),0)==-1){
          condicion = false;
        }
    }
    return condicion;
  }

  caracteresNumerosEspacio(texto: String){
    var letras="0123456789áéíóúabcdefghijklmnñopqrstuvwxyz ";

    texto = texto.toLowerCase();
    let condicion = true;
    for(let i=0; i<texto.length; i++){
        if (letras.indexOf(texto.charAt(i),0)==-1){
          condicion = false;
        }
    }
    return condicion;
  }










  hayLetras(texto: String){
    texto = texto.toLowerCase();

    var letras="áéíóúabcdefghijklmnñopqrstuvwxyz";
    let hayLetras = 0;
    for(let i=0; i<texto.length; i++){
        if (letras.indexOf(texto.charAt(i),0)!=-1){
          hayLetras = 1;
        }
    }

    return hayLetras;
  }

  hayMayusculas(texto: String){
    var letras="ÁÉÍÓÚABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    let hayMayusculas = 0;
    for(let i=0; i<texto.length; i++){
        if (letras.indexOf(texto.charAt(i),0)!=-1){
          hayMayusculas = 1;
        }
    }

    return hayMayusculas;
  }

  hayMinusculas(texto: String){
    var letras="áéíóúabcdefghijklmnñopqrstuvwxyz";
    let hayMinusculas = 0;
    for(let i=0; i<texto.length; i++){
        if (letras.indexOf(texto.charAt(i),0)!=-1){
          hayMinusculas = 1;
        }
    }

    return hayMinusculas;
  }

  hayNumeros(texto: String){
    texto = texto.toLowerCase();

    let numeros ="0123456789";
    let hayNumeros = 0;
    for(let i=0; i<texto.length; i++){
       if (numeros.indexOf(texto.charAt(i),0)!=-1){
          hayNumeros = 1;
       }
    }

    return hayNumeros;
  }

  hayAlfaNumericos(texto: String){
    texto = texto.toLowerCase();

    let numeros ="0123456789áéíóúabcdefghijklmnñopqrstuvwxyz";
    let hayAlfaNumerico = 0;
    for(let i=0; i<texto.length; i++){
       if (numeros.indexOf(texto.charAt(i),0)==-1){
          hayAlfaNumerico= 1;
       }
    }

    return hayAlfaNumerico;
  }

  nivelContrasena(texto: String){
    let hayLetras = this.hayLetras(texto);
    let hayNumeros = this.hayNumeros(texto);
    let hayAlfaNumericos = this.hayAlfaNumericos(texto);
    let hayMayusculas = this.hayMayusculas(texto);
    let hayMinusculas = this.hayMinusculas(texto);

    let total = hayLetras + hayNumeros + hayMayusculas + hayMinusculas + hayAlfaNumericos;

    return total;
  }

  tipoAplicacion(extension: String){
    let aplicacion = '';
    switch(extension){
      case "pdf": aplicacion = 'application/pdf'; break;
      case "jpg": aplicacion = 'image/jpeg'; break;
      case "png": aplicacion = 'image/png'; break;
      case "doc": aplicacion = 'application/msword'; break;
      case "docx": aplicacion = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'; break;
      case "xlsx": aplicacion = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'; break;
      case "xls": aplicacion = 'application/vnd.ms-excel'; break;
      case "ppt": aplicacion = 'application/vnd.ms-powerpoint'; break;
      case "pptx": aplicacion = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'; break;
      case "txt": aplicacion = 'text/plain'; break;
      case "mp4": aplicacion = 'video/mp4'; break;
    }
    return aplicacion;
  }



  mensajeSwal(id: number){
    if(id == 1){
      return swal.fire(
        "Procesado",
        "Los datos se guardaron con éxito",
        "success"
      );
    }
    if(id == 2){
      return swal.fire(
        "Procesado",
        "Los datos se actualizaron con éxito",
        "success"
      );
    }
    if(id == 3){
      return swal.fire(
        "Error",
        "Complete los campos solicitados",
        "error"
      );
    }
    if(id == 4){
      return swal.fire(
        "Error",
        "Hubo un problema con el servidor",
        "error"
      );
    }
    if(id == 5){
      return swal.fire(
        "Procesado",
        "Los datos se eliminaron con éxito",
        "success"
      );
    }
  }

}
