import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movimiento } from '../models/movimiento.model';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  movimiento: Movimiento = new Movimiento

  url = 'https://hostinjor.com/finperapi/api/movimientos/'
  urlv1 = 'https://hostinjor.com/apifinper/v1/usuarios/'

  constructor(
    public http: HttpClient
  ) { }


  traeMovimientos(id: number){
    return this.http.post<any>(this.url, id);
  }

  traeMovimientosParam(id: number){
    return this.http.post<any>(this.urlv1, id);
  }
}




