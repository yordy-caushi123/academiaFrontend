import { Pipe, PipeTransform } from '@angular/core';
import { Ciclo } from '../entidades/ciclo';

@Pipe({
    name: 'nombreCiclo'
})
export class CicloPipe implements PipeTransform {
    transform(id: number): any {
        let ciclos: Ciclo[] = JSON.parse(sessionStorage.getItem("ciclos"));
        let ciclo: Ciclo = ciclos.find(n => n.id == id);
        return ciclo.nombre;
    }
}