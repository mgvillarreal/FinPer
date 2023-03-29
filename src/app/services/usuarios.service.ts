import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IngresoI } from '../interfaces/ingreso';
import { JwtResponseI } from '../interfaces/jwt-response';
import { MonedaI } from '../interfaces/moneda';
import { PaisI } from '../interfaces/pais';
import { ProfesionI } from '../interfaces/profesion';
import { UsuarioI } from '../interfaces/usuario';
import { Usuario } from '../models/usuario.model';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  apiUrl = environment.apiUrl;

  usuario: Usuario
  url = `${this.apiUrl}/v5/usuarios/`;

  constructor(public http: HttpClient, public auth: AuthService) {}

  datosUsuario(){
    let data: any = {
      "token": this.auth.auth()
    }

   return this.http.post<Usuario>(this.url + 'id/token', data);
  }

  traePaises(): Observable<PaisI[]> {
    return this.http.get<PaisI[]>(this.url + 'paises');
  }

  traeProfesiones(): Observable<ProfesionI[]> {
    return this.http.get<ProfesionI[]>(this.url + 'profesiones');
  }

  traeIngresos(): Observable<IngresoI[]> {
    return this.http.get<IngresoI[]>(this.url + 'modosingresos');
  }

  traeMonedas(): Observable<MonedaI[]> {
    return this.http.get<MonedaI[]>(this.url + 'monedas');
  }

  traeDatosUsuario(id: number): Observable<UsuarioI>
  {
    return this.http.get<UsuarioI>(this.url + 'datos/' + id);
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
    let usuario = {
      'id': id
    }
    return this.http.put<any>(this.url + 'eliminausuario', usuario);
  }

  modificaUsuario(usuarioModif, id){
    usuarioModif['id'] = id;
    return this.http.put<any>(this.url + 'modificausuario', usuarioModif);
  }

  validaMail(mail: string)
  {
    let data = {
      'email': mail
    }
    console.log(data)
    return this.http.post<any>(this.url + 'validaMail', data);
  }

  enviaMailReset(mail: string)
  {
    let data = {
      'email': mail
    }
    
    return this.http.post<any>(this.url + 'resetMail', data);
  }

}
