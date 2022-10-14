import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
mensajeNuevo:boolean =  false;
  constructor() { }

  buscaMensajeNuevo(){
//aca devuelve el valor la api y cambia el parametro
    this.mensajeNuevo = false;
  }
}
