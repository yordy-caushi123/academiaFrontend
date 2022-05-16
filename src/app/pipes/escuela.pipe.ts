import { Pipe, PipeTransform } from '@angular/core';
import { Escuela } from '../entidades/escuela';

@Pipe({
    name: 'nombreEscuela'
})
export class EscuelaPipe implements PipeTransform {
    transform(id: number): any {
        let escuelas: Escuela[] = JSON.parse(sessionStorage.getItem("escuelas"));
        let escuela: Escuela = escuelas.find(n => n.id == id);
        return escuela.sigla;
    }
}