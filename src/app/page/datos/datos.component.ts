import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  usuario = new Usuario();

  nombre = localStorage.getItem('name');
  residencia:string;
  profesion:string;
  // fnacimiento ;
  email:string;

  constructor() {
    this.usuario.nombre = localStorage.getItem('name');;
  }

  ngOnInit(): void {
  }

  traeDatosUsuario(){
    
  }

}
