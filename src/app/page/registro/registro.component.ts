import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IngresoI } from 'src/app/interfaces/ingreso';
import { PaisI } from 'src/app/interfaces/pais';
import { ProfesionI } from 'src/app/interfaces/profesion';
import { Usuario } from 'src/app/models/usuario.model';
import { ModalService } from 'src/app/services/modal.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public forma: FormGroup;
  usuario = new Usuario;
  paises: PaisI[] = [];
  profesiones: ProfesionI[] = [];
  ingresos: IngresoI[] = [];
  parteFormulario:number = 0;
  formulario: FormGroup;
  arrayIngresos:any[] = [];

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private usuarioService: UsuariosService) { } //private modalService: ModalService

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
    this.usuario.profesion = this.forma.value['profesion'];
    this.tomaModosIngreso();
    //this.router.navigate(['ingreso']); //SE DEBE MOSTRAR EL MENSAJE QUE ENVIA PARA VALIDAR
    console.log('Datos de Usuario: ', this.usuario);
    this.authService.register(this.usuario).subscribe(resp => {
      if(resp.codigo == 200)
      {
        this.router.navigateByUrl('validausuario/' + resp.id);
      }
    })
    //this.registraUsuario();
    //this.mostrarMensaje();
  }

  tomaModosIngreso():void{
    let checks = document.querySelectorAll('#modoingreso');

    checks.forEach((e)=>{
      if((e as HTMLInputElement).checked){
        this.arrayIngresos.push((e as HTMLInputElement).value);
      }
    });
    this.usuario.modoIngreso = (this.arrayIngresos);
  }

  ngOnInit(): void {
    this.forma = this.fb.group({ //se toma del constructor que tiene inyectado el servicio que esta importado
      'email': ['', [Validators.required, Validators.email]],
      'contrasena': ['', [Validators.required, Validators.minLength(6)]],
      'pwdConfirm': ['', Validators.required],
      'nombre': ['', [Validators.required]],
      'fnacimiento': ['', [Validators.required, /*this.fechaMayorA15Validator*/ ]],
      'residencia': [13, [Validators.required]],
      'modoing': ['', [Validators.required]],
      'profesion': ['', [Validators.required]],
    }, { validators: this.contrasenasIgualesValidator });
    this.muestraPaises();
    this.muestraProfesiones();
    this.muestraIngresos();

  }

  contrasenasIgualesValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const pwd = control.get('contrasena');
    const pwdConfirm = control.get('pwdConfirm');

    return pwd && pwdConfirm && pwd.value !== pwdConfirm.value ? { contrasenasIguales: true } : null;
  }

  fechaMayorA15Validator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const fnacimiento = new Date(this.forma.value['fnacimiento']);
    const factual = new Date();

    let years = (factual.getFullYear() - fnacimiento.getFullYear());

    return years < 15 ? { fechaMayorA15 : true } : null;
  }

  muestraPaises(){
    this.usuarioService.traePaises().subscribe(res => {
      this.paises = res
    })
  }

  muestraProfesiones(){
    this.usuarioService.traeProfesiones().subscribe(res => {
      this.profesiones = res
    })
  }

  muestraIngresos(){
    this.usuarioService.traeIngresos().subscribe(res => {
     this.ingresos = res
    })
  }



}
