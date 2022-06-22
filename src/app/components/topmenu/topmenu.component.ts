import { Component, OnInit } from '@angular/core';
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
  usuario: Usuario = new Usuario

  constructor(public auth: AuthService, public usuarioService: UsuariosService) { }

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

  ngOnInit(): void {
    this.usuarioService.datosUsuario().subscribe(res => {
      this.usuario = res
      console.log(this.usuario)
    })
  }

}
