import { Pipe, PipeTransform } from '@angular/core';
import { Alumno } from '../entidades/alumno';
import { AppService } from '../servicios/app.service';

@Pipe({
    name: 'nombreAlumno'
})
export class AlumnoPipe implements PipeTransform {
    transform(id: number): any {
        let alumnos: Alumno[] = JSON.parse(sessionStorage.getItem("alumnos"));
        let alumno: Alumno = alumnos.find(n => n.id == id);
        return alumno.apellidos + ", " + alumno.nombres;
    }
}
