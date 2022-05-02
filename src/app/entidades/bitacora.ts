export class Bitacora {
    idBitacora: number;
    nombreUsuario: String;
    accion: number;
    descripcion: String;

    contenidoInicial: String;
    contenidoModificado: String;

    fecha: String;
    ip: String;
}

/**
 * Considerar para las acciones:
 * 1: Acceso al Sistema
 * 2: Registro / Almacenamiento
 * 3: Actualización
 * 4: Deshabilitación/Eliminación
 * 5: Búsqueda / Realizó
 */
