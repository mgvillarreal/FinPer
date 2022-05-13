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


  traeMovimientos(){
    return this.http.get<any>(this.url);
  }

  traeUnMovimiento(id: string){
    return this.http.get<Movimiento>(id);
  }
}




