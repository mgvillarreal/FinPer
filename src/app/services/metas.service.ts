import { Injectable } from '@angular/core';
import { MetasI } from '../interfaces/metas';  
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetasService {
  urlv4 = 'https://hostinjor.com/apifinper/v4/metas'
  
  constructor(public http: HttpClient) {
    
   }

   traeMetas(){
    // console.log(this.http.get<any>(this.url))
    return this.http.get<any>(this.urlv4);
  }

  guardaMetas(metas: any) {
    console.log(JSON.parse(JSON.stringify(metas)));
    return this.http.post(this.urlv4 + '/nuevameta', JSON.parse(JSON.stringify(metas)))
    /*.pipe(tap((res: any) =>{
      console.log(res);
    }))*/
  }

  /*traeUnMetas(id: string){
    return this.http.get<Movimiento>(id);
  }*/

  traeMetas2(id: string){
    return this.http.get<any>(this.urlv4 + id)
  }

}
