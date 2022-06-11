import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {

  public forma: FormGroup;
  usuario = new Usuario;

  constructor(private fb: FormBuilder, private usuariosService: UsuariosService) { }

  ingresar(){
    this.usuario.mail = this.forma.value['email'];
    this.usuario.contrasena = this.forma.value['contrasena'];
    console.log('El usuario ingresa. Credenciales: ', this.usuario);
    //this.ingresarUsuario();
  }

  ingresarUsuario(){
    this.usuariosService.registraUsuario(this.usuario).subscribe(resp => {
                                                                          console.log(resp);
                                                                         })
  }

  ngOnInit(): void {
    this.forma = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'contrasena': ['', [Validators.required]]
    });
  }

}
