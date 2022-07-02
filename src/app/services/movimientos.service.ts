import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movimiento } from '../models/movimiento.model';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  // movimiento: Movimiento = new Movimiento

  url = 'https://hostinjor.com/finperapi/api/movimientos/'
  urlv1 = 'https://hostinjor.com/apifinper/v2/movimientos/'

  constructor(
    public http: HttpClient
  ) { }


  traeMovimientos(){
    // console.log(this.http.get<any>(this.url))
    return this.http.get<any>(this.url);
  }

  guardaMovimiento(movimiento: Movimiento){
    return this.http.post(this.url, JSON.stringify(movimiento))
  }

  traeUnMovimiento(id: string){
    return this.http.get<Movimiento>(id);
  }

  traeMovimientos2(id: string){
    return this.http.get<any>(this.urlv1 + id)
  }

}
