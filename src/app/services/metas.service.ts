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
  urlv4 = 'https://hostinjor.com/apifinper/v4/metas'

  constructor(public http: HttpClient) {

   }

   traeMetasPorEstado(estado: number){
    let body = {
      estado: estado,
      id_usuario: Number(localStorage.getItem("id"))
    };
    return this.http.post<any>(this.urlv4 + '/metasporestado', body);
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

  /*traeUnMetas(id: string){
    return this.http.get<Movimiento>(id);
  }*/

  traeMetas2(id: string){
    return this.http.get<any>(this.urlv4 + id)
  }

}
