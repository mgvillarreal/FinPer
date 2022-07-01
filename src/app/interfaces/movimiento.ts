export interface MovimientoI {
    mov_estado: number
    mov_fcreacion: Date
    mov_id: number
    mov_idcategoria: number
    mov_idmoneda: number
    mov_idtipo: number
    mov_idusuario: number
    mov_monto: number;

    tmov_descripcion:string;
    cmov_descripcion:string;
    mon_descripcion:string;
}