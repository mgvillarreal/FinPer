import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario = new Usuario;
  pwdConfirm?:String;
  parteFormulario:number = 0;
  msjValidacion:string = '';

  constructor(private router: Router) { }

  validarContrasenas(): void {
    if(this.usuario.mail !== undefined && this.usuario.contrasena !== undefined && this.pwdConfirm !== undefined)
    {
       if(this.usuario.contrasena === this.pwdConfirm)
       {
         this.parteFormulario = 1;
         this.msjValidacion = '';
       }
       else
       {
          this.msjValidacion = 'Las contraseñas no coinciden.';
       }
     }
     else
     {
      this.msjValidacion = 'Todos los campos son requeridos';
     }
  }

  validarParteDos(): void{
    if(this.usuario.nombre !== undefined && this.usuario.fnacimiento !== undefined && this.usuario.residencia !== undefined)
    {
      this.parteFormulario = 2;
      this.msjValidacion = '';
    }
    else
    {
      this.msjValidacion = 'Todos los campos son requeridos';
    }
  }

  validarParteTres(): void{
    if(this.usuario.modoIngreso !== undefined && this.usuario.profesion !== undefined)
    {
      this.registrar();
    }
    else
    {
      this.msjValidacion = 'Todos los campos son requeridos';
    }
  }

  registrar(): void{
    this.router.navigate(['ingreso']); //SE DEBE MOSTRAR EL MENSAJE QUE ENVIA PARA VALIDAR
    console.info('Usuario registrado');
  }

  ngOnInit(): void {
  }

}
