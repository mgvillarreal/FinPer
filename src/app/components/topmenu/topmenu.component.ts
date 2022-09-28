import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

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
  @Input() menuDesplegado
  @Output() eventoDesplegar: EventEmitter<any> = new EventEmitter()

  constructor(public auth: AuthService,
    public usuarioService: UsuariosService) { }

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
}
