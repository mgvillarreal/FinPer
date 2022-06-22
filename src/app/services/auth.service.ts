import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioI } from '../interfaces/usuario';
import { JwtResponseI } from '../interfaces/jwt-response';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth_url: string = 'https://hostinjor.com/apifinper/v1/usuarios/'
  authSubject = new BehaviorSubject(false)
  private token: string

  constructor(private httpCliente: HttpClient) { }

  register(user: UsuarioI): Observable<JwtResponseI> {
    return this.httpCliente.post<JwtResponseI>(this.auth_url, user)
    .pipe(tap(
      (res: JwtResponseI) => {
        if(res){
          // guardar token
          this.guardaToken(res.token)
        }
      })
    )
  }
      
  login(user: UsuarioI): Observable<JwtResponseI> {
    return this.httpCliente.post<JwtResponseI>(this.auth_url + 'login', user)
    .pipe(tap(
      (res: JwtResponseI) => {
        if(res){
          // guardar token
          this.guardaToken(res.token)
        }
      })
    )
  }

  logout(): void{
    this.token = ''
    localStorage.removeItem("TOKEN")
  }

  public auth()
  {
    this.getToken()
    if(this.token){
      return this.token;
    }else{
      return false;
    }
  }

  private guardaToken(token: string): void{
    localStorage.setItem("TOKEN", token)
    this.token = token
  }

  public getToken(): void{
    if(!this.token){
      this.token = localStorage.getItem("TOKEN")
    }
  }
}
