import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MensajesService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.scss']
})
export class TopmenuComponent implements OnInit {

  menu:string = "cerrado";
  // menuDesplegado = false
  usuario: Usuario = new Usuario
  userLogged = this.muestraNombre();
  mensajeNuevo:boolean = false;

  @Input() menuDesplegado
  @Output() eventoDesplegar: EventEmitter<any> = new EventEmitter()

  constructor(public auth: AuthService,
    public usuarioService: UsuariosService,
    private mensajeInterno: MensajesService) {
      //verifica si hay mensajes
      this.mensajeInterno.buscaMensajeNuevo();
      this.mensajeNuevo = this.mensajeInterno.mensajeNuevo;
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
  }

  muestraNombre(){
    return this.usuario.nombre;
  }

  /*verificaMensaje(){
    
    if( this.mensajeInterno.buscaMensajeNuevo()){
      console.log('mensaje: '+this.mensajeInterno.buscaMensajeNuevo());
      this.mensajeNuevo = true;
    }
    else{
      this.mensajeNuevo = false;
    }
    
    this.mensajeNuevo = this.mensajeInterno.mensajeNuevo;
  }*/
}
