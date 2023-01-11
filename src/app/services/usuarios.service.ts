import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IngresoI } from '../interfaces/ingreso';
import { JwtResponseI } from '../interfaces/jwt-response';
import { PaisI } from '../interfaces/pais';
import { ProfesionI } from '../interfaces/profesion';
import { UsuarioI } from '../interfaces/usuario';
import { Usuario } from '../models/usuario.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuario: Usuario
  url = 'https://hostinjor.com/apifinper/v5/usuarios/';

  constructor(
    public http: HttpClient,
    public auth: AuthService
  ) {}

  datosUsuario(){
    let data: any = {
      "token": this.auth.auth()
    }

   return this.http.post<Usuario>(this.url + 'id/token', data)
  }

  traePaises(): Observable<PaisI[]> {
    return this.http.get<PaisI[]>(this.url + 'paises')
  }

  traeProfesiones(): Observable<ProfesionI[]> {
    return this.http.get<ProfesionI[]>(this.url + 'profesiones')
  }

  traeIngresos(): Observable<IngresoI[]> {
    return this.http.get<IngresoI[]>(this.url + 'modosingresos')
  }

  traeDatosUsuario(id: number)
  {
    return this.http.get<UsuarioI>(this.url + 'datos/' + id)
  }

  modificaContrasena(contrasenaNueva, id)
  {
    let usuarioChangePwd = {
      'id': id,
      'contrasena': contrasenaNueva
    }

    return this.http.put<any>(this.url + 'modificacontrasena', usuarioChangePwd);
  }

  eliminaUsuario(id)
  {
    console.log("user id en service: ", id);
    let usuario = {
      'id': id
    }
    return this.http.put<any>(this.url + 'eliminausuario', usuario);
  }

}
