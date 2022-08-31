import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioI } from '../interfaces/usuario';
import { JwtResponseI } from '../interfaces/jwt-response';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth_url: string = 'https://hostinjor.com/apifinper/v1/usuarios/'
  authSubject = new BehaviorSubject(false)
  private token: string;
  public id: Number;
  public nombre: string;

  constructor(
    private httpCliente: HttpClient,
    private route: Router
    ) { }

  register(user: UsuarioI): Observable<any> {
    return this.httpCliente.post<any>(this.auth_url, user)
    .pipe(tap(
      (res: JwtResponseI) => {
        if(res){
          // guardar token
          // this.guardaToken(res.token)
          this.guardaUsuario(res)
        }
      })
    )
  }

  login(user: UsuarioI): Observable<any> {
    return this.httpCliente.post<any>(this.auth_url + 'login', user)
    .pipe(tap(
      (res: JwtResponseI) => {
        if(res){
          // guardar token
          this.guardaToken(res['token'])
          this.guardaUsuario(res)
        }
      })
    )
  }

  logout(): void{
    this.token = ''
    localStorage.removeItem("TOKEN")
    localStorage.removeItem("id")
    localStorage.removeItem("name")
    localStorage.removeItem("mail")
    this.route.navigate([''])
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

  private guardaUsuario(data: JwtResponseI): void{
    localStorage.setItem("id", String(data['id']))
    localStorage.setItem("name", data['name'])
    localStorage.setItem("mail", data['mail'])
  }

  public getToken(): void{
    if(!this.token){
      this.token = localStorage.getItem("TOKEN")
    }
  }

  public getId(): void{
    if(!this.token){
      this.id = Number(localStorage.getItem("id"));
    }
    // return this.id;
  }

  public getNombre(): void{
    if(!this.token){
      this.nombre = localStorage.getItem("nombre");
    }
  }
}
