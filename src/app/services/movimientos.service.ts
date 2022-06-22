import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movimiento } from '../models/movimiento.model';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  movimiento: Movimiento = new Movimiento

  url = 'https://hostinjor.com/finperapi/api/movimientos/'

  constructor(
    public http: HttpClient
  ) { }


  traeMovimientos(id: number){
    return this.http.post<any>(this.url, id);
  }

  traeUnMovimiento(id: number){
    return this.http.post<Movimiento>(this.url, id);
  }
}




