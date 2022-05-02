export class Documento {
    id_documento: number;
    codigo_documento: String;
    codigo_referencia:String;
    nombre_documento: String;
    fecha_documento: String;

    url_documento: String;
    dir_documento: String;
    estado_documento: number;
    tipo_documento: number;

    id_usuario_creacion: number;
    fecha_creacion: String;
    ip_creacion: String;
    
    id_usuario_modificacion: number;
    fecha_modificacion: String;
    ip_modificacion: String; 

    //Tipo 1: Documento anexo de Funcionario en Sector
    //Tipo 2: Documento anexo de Objetivo Nacional 
    //Tipo 3: Documento anexo de Capacidad Nacional 
    //Tipo 4: Documento anexo de Sub Capacidad Nacional
    //Tipo 5: Documento anexo de Usuario  
    //Tipo 6: Documento anexo de operador
    //Tipo 7: Documento anexo de ACN
    //Tipo 8: Documento anexo de Clasificación ACN
    //Tipo 9: Documento anexo de Operador con relacion a un ACN
    //Tipo 10: Documento anexo de Operador de coordenadas de un ACN
}