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
  public forma2: FormGroup;
  usuario = new Usuario;

  recuperaContrasenaFlag: number = 0;
  muestraIngresoFlag: number = 1;
  msjRecuperaContrasenaFlag: number = 0;
  textoValidacion: string = '';

  constructor(private fb: FormBuilder, private usuariosService: UsuariosService,private authService: AuthService, private route: Router) { }

  ingresar() {
    this.usuario.mail = this.forma.value['email'];
    this.usuario.contrasena = this.forma.value['contrasena'];
  
    this.authService.login(this.forma.value).subscribe(
      res => {
        this.route.navigate(['/miscuentas']);
      },
      err => {
        this.textoValidacion = 'El correo electrónico y/o contraseña ingresados son incorrectos. Intente nuevamente.';
      }
    );
  }

  muestraMensajeRecuperarContrasena(){
    if(this.recuperaContrasenaFlag == 0){
      this.recuperaContrasenaFlag = 1;
      this.muestraIngresoFlag = 0;
    }
  }

  validarMail(){
    console.log('Correo electrónico a validar: ', this.forma2.value['correoe']);
    this.muestraIngresoFlag = 0;
    this.recuperaContrasenaFlag = 0;
    this.msjRecuperaContrasenaFlag = 1;
  }

  volveraIngreso(){
    this.muestraIngresoFlag = 1;
    this.recuperaContrasenaFlag = 0;
    this.msjRecuperaContrasenaFlag = 0;
  }

  limpiarMensaje(){
    this.textoValidacion = '';
  }

  ngOnInit(): void {
    this.forma = this.fb.group({
      'mail': ['', [Validators.required, Validators.email]],
      'contrasena': ['', [Validators.required]]
    });

    this.forma2 = this.fb.group({
      'correoe': ['', [Validators.required, Validators.email]],
    });
  }

}
