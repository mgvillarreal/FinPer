import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MensajesService } from 'src/app/services/mensajes.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { NotificacionI } from 'src/app/interfaces/notificacion';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.scss']
})
export class TopmenuComponent implements OnInit {

  menu:string = "cerrado";
  notificaciones: NotificacionI[] = []
  usuario: Usuario = new Usuario
  userLogged = this.muestraNombre();
  mensajeNuevo:boolean = false;

  @Input() menuDesplegado
  @Output() eventoDesplegar: EventEmitter<any> = new EventEmitter()

  constructor(
    public auth: AuthService,
    public usuarioService: UsuariosService,
    public notificacionesService: NotificacionesService
    ) {
      //verifica si hay mensajes

     }

  cambiaEstadoMenu(): void{
    if(this.menu === 'abierto')
    {
      this.menu = 'cerrado';
    }
    else
    {
      this.menu = 'abierto';
    }

  }

  logout(){
    this.auth.logout();
  }

  despliegaMenu(){
    if(this.menuDesplegado)
    {
      this.eventoDesplegar.emit(false)
    }else{
      this.eventoDesplegar.emit(true)
    }
  }

  cierraMenu(){
    this.eventoDesplegar.emit(false)
  }

  ngOnInit(): void {
    this.traeNotificaciones();
    this.notificacionesService.notificacionesActivas();
  }

  muestraNombre(){
    return this.usuario.nombre;
  }

  traeNotificaciones()
  {
    this.notificacionesService.traeNotificaciones(localStorage.getItem('id')).subscribe(resp => {
      this.notificaciones = resp;
      console.log(resp)
    })
  }

}
