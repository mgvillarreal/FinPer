import { Injectable } from '@angular/core';
import { MetasI } from '../interfaces/metas';
import { ResponseI } from '../interfaces/response';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import { Meta } from '../models/meta.model';


@Injectable({
  providedIn: 'root'
})
export class MetasService {
  urlv4 = 'https://hostinjor.com/apifinper/v5/metas'
  urlMontos = 'https://hostinjor.com/apifinper/v5/montos/'

  constructor(public http: HttpClient) { }

  traeMetasPorEstado(estado: number){
    let body = {
       estado: estado,
      id_usuario: Number(localStorage.getItem("id"))
    };

    if(estado["estado"]!=10){
      return this.http.post<any>(this.urlv4 + '/metasporestado', body);
    }
    else{
      return this.http.post<any>(this.urlv4 + '/todaslasmetas', body);
    }
  }

  guardaMetas(metas: Meta):Observable<ResponseI> {
    console.log(metas);
    return this.http.post<ResponseI>(this.urlv4 + '/nuevameta', metas) //JSON.parse(JSON.stringify(metas))
    /*.pipe(tap((res: any) =>{
      console.log(res);
    }))*/
  }

  cambiaMetas(metas:any):Observable<ResponseI> {
    //console.log(JSON.parse(JSON.stringify(metas)));
    return this.http.put<ResponseI>(this.urlv4 + '/modificameta', metas);
  }

  eliminarMeta(idMeta:any){
    let meta = {
      'id': idMeta
    }
    console.log("ID Meta en Service: ", meta);
    return this.http.put<any>(this.urlv4 + '/eliminameta', meta);
  }

  /*traeUnMetas(id: string){
    return this.http.get<Movimiento>(id);
  }*/

  traeMetas2(id: string){
    return this.http.get<any>(this.urlv4 + id)
  }

  traeMontos(id)
  {
    return this.http.get<any>(this.urlMontos + id);
  }

  agregaMonto(monto)
  {
    return this.http.post<any>(this.urlMontos + "crear", monto)
  }

  traeSumaMontos(idUsuario)
  {
    return this.http.get<any>(this.urlMontos + "traeSuma/" + idUsuario);
  }

  modificaMonto(monto:any):Observable<ResponseI> {
    return this.http.put<ResponseI>(this.urlMontos + 'modifica', monto);
  }

  eliminarMonto(idMonto:any){
    console.log('Elimina monto en Service: ', idMonto);
    let monto = {
      'id': idMonto
    }
    return this.http.put<any>(this.urlMontos + 'elimina', monto);
  }

  traeMontosPorAnio(id: string, anio: number){
    let data = {
      'id': id,
      'anio': anio
    }
    return this.http.post<any>(this.urlMontos + 'traemontosporanio', data);
  }

  traeCantMetasPend(usuario, mes, anio){
    let data = {
      'id_usuario': usuario,
      'mes': mes,
      'anio': anio
    }
    console.log("data en el servicio: ", data);
    return this.http.post<any>(this.urlv4 + '/traeCantidadMetasPend', data);
  }
}
