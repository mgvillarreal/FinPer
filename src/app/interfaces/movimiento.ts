import { Movimiento } from "../models/movimiento.model"

export interface MovimientoI {
    mov_estado: number
    mov_fcreacion: any
    mov_id: number
    mov_idcategoria: number
    mov_idmoneda: number
    mov_idtipo: number
    mov_idusuario: number
    mov_monto: number;
    mov_detalle:string;
    tmov_descripcion:string;
    cmov_descripcion:string;
    mon_descripcion:string;
    mon_simbolo:string;
}
