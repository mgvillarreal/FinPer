import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoriaI } from '../interfaces/categoria';
import { Movimiento } from '../models/movimiento.model';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {
  apiUrl = environment.apiUrl;

  // movimiento: Movimiento = new Movimiento

  url = 'https://hostinjor.com/finperapi/api/movimientos/'
  urlv1 = `${this.apiUrl}/v2/movimientos/`
  urlv4 = `${this.apiUrl}/v4/movimientos/`
  urlv5 = `${this.apiUrl}/v5/movimientos/`

  anioUltMov:any;
  mesUltMov:any;
  usuUltMov:any;

  constructor(public http: HttpClient) { }

  guardaMovimiento(movimiento: Movimiento){
    return this.http.post(this.urlv5 + 'cargamovimiento', movimiento)
  }

  traeMovimientos(id: string){
    return this.http.get<any>(this.urlv5 + id)
  }
  
  traeBalance(id: string){
  
    return this.http.get<any>(this.urlv5+'balancetotal/'+Number(id));
  }

  traeMovimientosMesAnio(id: string, mes: number, anio: number){
    let data = {
      'id': id,
      'mes': mes,
      'anio': anio
    }
    return this.http.post<any>(this.urlv5 + 'traemovimientos', data);
  }

  traeMovimientosAnio(id: string, anio: number){
    let data = {
      'id': id,
      'anio': anio
    }
    return this.http.post<any>(this.urlv5 + 'traemovimientosporanio', data);
  }

  borraUnMovimiento(id){
    return this.http.put<any>(this.urlv4 + 'borramovimiento', id);
  }

  editaUnMovimiento(movimiento)
  {
    console.log("movimiento modificado en service: ", movimiento);
    return this.http.put<any>(this.urlv5 + 'modificamovimiento', movimiento);
  }

  traeCategorias()
  {
    return this.http.get<CategoriaI[]>(this.urlv5);
  }

  traeMovimientosGraficoCategorias(id: string, mes: number, anio: number){
    let data = {
      'id': id,
      'mes': mes,
      'anio': anio
    }
    return this.http.post<any>(this.urlv5 + 'traemovimientosgraficocategorias', data);
  }

}
