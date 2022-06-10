import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url = 'https://hostinjor.com/finperapi/api/usuarios/';

  constructor(
    public http: HttpClient
  ) {}

  registraUsuario(usuario: Usuario){
    return this.http.post(this.url, JSON.stringify(usuario));
  }

}
