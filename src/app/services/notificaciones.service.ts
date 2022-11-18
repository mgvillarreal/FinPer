import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificacionI } from '../interfaces/notificacion';


@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  notificacionesAct = false;
  urlv5 = 'https://hostinjor.com/apifinper/v5/notificaciones/'

  constructor(
    public http: HttpClient
  ) { }

  traeNotificaciones(id: string)
  {
    return this.http.get<NotificacionI[]>(this.urlv5 + id);
  }

  leeNotificacion(id: number)
  {
    let data = {
      "id": id
    }
    return this.http.put<any>(this.urlv5 + 'leenotificacion', data);
  }

  borrarNotificacion(id: number)
  {
    let data = {
      "id": id
    }
    return this.http.put<any>(this.urlv5 + 'borranotificacion', data);
  }

  notificacionesActivas(){
    this.http.get<boolean>(this.urlv5 + 'activas/' + localStorage.getItem('id')).subscribe(resp => {
      this.notificacionesAct = resp;
      });
  }
}

