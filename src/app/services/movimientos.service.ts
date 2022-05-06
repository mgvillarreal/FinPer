import { Injectable } from '@angular/core';
import { Movimiento } from '../models/movimiento.model';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  movimiento: Movimiento = new Movimiento

  movimientos: [] = []

  constructor() { }

}
