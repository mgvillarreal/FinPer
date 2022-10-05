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
  urlv4 = 'https://hostinjor.com/apifinper/v4/movimientos/'
  urlv5 = 'https://hostinjor.com/apifinper/v5/movimientos/'

  constructor(
    public http: HttpClient
  ) { }

  guardaMovimiento(movimiento: Movimiento){
    return this.http.post(this.urlv5 + 'cargamovimiento', movimiento)
  }

  traeMovimientos(id: string){
    return this.http.get<any>(this.urlv5 + id)
  }

  borraUnMovimiento(id){
    return this.http.put<any>(this.urlv4 + 'borramovimiento', id)
  }

  editaUnMovimiento(movimiento)
  {
    return this.http.put<any>(this.urlv5 + 'modificamovimiento', movimiento)
  }

  traeCategorias()
  {
    return this.http.get<any>(this.urlv5)
  }

}
