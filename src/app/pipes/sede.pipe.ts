import { Pipe, PipeTransform } from '@angular/core';
import { Sede } from '../entidades/sede';

@Pipe({
    name: 'nombreSede'
})
export class SedePipe implements PipeTransform {
    transform(id: number): any {
        let sedes: Sede[] = JSON.parse(sessionStorage.getItem("sedes"));
        let sede: Sede = sedes.find(n => n.id == id);
        return sede.nombre;
    }
}