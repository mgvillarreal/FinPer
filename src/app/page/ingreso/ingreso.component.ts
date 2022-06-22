import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {

  public forma: FormGroup;
  usuario = new Usuario;


  constructor(
    private fb: FormBuilder, 
    private usuariosService: UsuariosService,
    private authService: AuthService,
    private route: Router) { }

  ingresar(){
    this.usuario.mail = this.forma.value['email'];
    this.usuario.contrasena = this.forma.value['contrasena'];
    // console.log('El usuario ingresa. Credenciales: ', this.forma.value);
    this.authService.login(this.forma.value).subscribe(res =>{
      this.route.navigate(['/miscuentas'])
    })
  }

  ngOnInit(): void {
    this.forma = this.fb.group({
      'mail': ['', [Validators.required, Validators.email]],
      'contrasena': ['', [Validators.required]]
    });
  }

}
