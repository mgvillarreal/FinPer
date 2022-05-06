import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  miUsuario = new Usuario;
  mail?:String;
  pwd?:String;
  pwdConfirm?:String;
  resultado!:number;

  constructor(private router: Router) { }

  validarContrasenas(): void {
    if(this.miUsuario.nombre !== '' && this.miUsuario.mail !== '' && this.miUsuario.pwd !== '' && this.pwdConfirm !== '')
    {
      if(this.miUsuario.pwd == this.pwdConfirm)
      {
        this.miUsuario.registrar();
        this.router.navigate(['login']);
      }
      else
      {
        this.resultado = 1;
        console.info('Las contraseñas no coinciden.');
      }
    }
    else
    {
      this.resultado = 2;
      console.info('Todos los campos son requeridos');
    }
   
  }

  ngOnInit(): void {
  }

}
