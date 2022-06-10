import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public forma: FormGroup;   
  usuario = new Usuario;
  parteFormulario:number = 0;

  constructor(private router: Router, private fb: FormBuilder, private usuariosService: UsuariosService) { }

  pasarParteUno(): void {
    this.usuario.mail = this.forma.value['email'];
    this.usuario.contrasena= this.forma.value['contrasena'];
    this.parteFormulario = 1;
  }

  pasarParteDos(): void{
    this.usuario.nombre = this.forma.value['nombre'];
    this.usuario.fnacimiento = this.forma.value['fnacimiento'];
    this.usuario.residencia = this.forma.value['residencia'];
    this.parteFormulario = 2;
  }

  registrar(): void{
    this.usuario.modoIngreso = this.forma.value['modoIngreso'];
    this.usuario.profesion = this.forma.value['profesion'];
    //this.router.navigate(['ingreso']); //SE DEBE MOSTRAR EL MENSAJE QUE ENVIA PARA VALIDAR
    console.info('Usuario registrado');
    console.log('Datos de Usuario: ', this.usuario);
    this.registraUsuario();
  }

  registraUsuario(){
    this.usuariosService.registraUsuario(this.usuario).subscribe(resp => {
                                                                          console.log(resp);
                                                                         })
  }

  ngOnInit(): void {
    this.forma = this.fb.group({ //se toma del constructor que tiene inyectado el servicio que esta importado
      'email': ['', [Validators.required, Validators.email]],
      'contrasena': ['', [Validators.required, Validators.minLength(6)]],
      'pwdConfirm': ['', Validators.required],
      'nombre': ['', [Validators.required]],
      'fnacimiento': ['', [Validators.required]],
      'residencia': ['', [Validators.required]],
      'modoIngreso': ['', [Validators.required]],
      'profesion': ['', [Validators.required]],
    }, { validators: this.contrasenasIgualesValidator });
  }

  contrasenasIgualesValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const pwd = control.get('contrasena');
    const pwdConfirm = control.get('pwdConfirm');
  
    return pwd && pwdConfirm && pwd.value !== pwdConfirm.value ? { contrasenasIguales: true } : null;
  };
  

}