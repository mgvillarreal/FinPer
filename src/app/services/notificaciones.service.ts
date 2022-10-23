import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificacionI } from '../interfaces/notificacion';


@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  urlv5 = 'https://hostinjor.com/apifinper/v5/notificaciones/'

  constructor(
    public http: HttpClient
  ) { }

  traeNotificaciones(id: number)
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
}

