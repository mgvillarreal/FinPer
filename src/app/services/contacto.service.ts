import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactoI } from '../interfaces/contacto';
import { ResponseI } from '../interfaces/response';
import { Mensaje } from '../models/mensaje.model';
import {Observable} from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ContactoService{
    apiUrl = environment.apiUrl;

    url = `${this.apiUrl}/v5/contacto`;

    constructor(public http: HttpClient){ }

    enviarMensaje(mensaje: Mensaje):Observable<ResponseI> {
        console.log('Mensaje en Service: ', mensaje);
        return this.http.post<ResponseI>(this.url + '/enviamensaje', mensaje);
    }
    
}