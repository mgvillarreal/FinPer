export interface UsuarioI {
    id: number;
    nombre: string;
    mail: string;
    token: string;
    edad: number;

    usu_id: number;
    usu_nombre: string;
    usu_email: string;
    usu_fnacimiento: Date;
    usu_residencia: number;
    res_descripcion: string;
    res_id: number;
    pro_descripcion: string;
    upro_idprofesion: number;
    uming_idmingresos: number;
}
