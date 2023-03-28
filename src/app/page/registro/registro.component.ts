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
  public forma2: FormGroup;
  usuario = new Usuario;
  paises: PaisI[] = [];
  profesiones: ProfesionI[] = [];
  ingresos: IngresoI[] = [];
  parteFormulario:number = 0;
  formulario: FormGroup;
  arrayIngresos:any[] = [];
  textoValidacion:string = '';

  /*FLAGS*/
  mensajeSolicitaValidacion: number = 0;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private usuarioService: UsuariosService) {  }

  validarMail(){
    this.usuario.mail = this.forma.value['email'];
    this.usuario.contrasena= this.forma.value['contrasena'];

    let correoValido: boolean;

    this.usuarioService.validaMail(this.usuario.mail).subscribe(result => {
      correoValido = result['status']; // El correo electrónico es válido si el resultado es falso (es decir, no existe en la base de datos)
      if (correoValido) {
        this.mensajeSolicitaValidacion = 0;
        this.textoValidacion = 'El correo electrónico ya existe. Intente iniciar sesión.';
      }
      else{
        this.parteFormulario = 1;
        this.textoValidacion = '';
      }
    });
    
  }

  limpiarMensaje(){
    this.textoValidacion = '';
  }

  registrar(): void{
    this.usuario.nombre = this.forma2.value['nombre'];
    this.usuario.fnacimiento = this.forma2.value['fnacimiento'];
    this.usuario.residencia = this.forma2.value['residencia'];
    this.usuario.profesion = this.forma2.value['profesion'];
    this.usuario.modoIngreso = this.forma2.value['modoing'];

    console.log('Datos de Usuario: ', this.usuario);

    this.authService.register(this.usuario).subscribe(resp => {
      if(resp.codigo == 200)
      {
        //this.router.navigateByUrl('validausuario/' + resp.id);
      }
    })

    this.mostrarMensaje();
  }

  ngOnInit(): void {
    this.forma = this.fb.group({
      'email': ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\.com$')]],
      'contrasena': ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9]).*$'), Validators.minLength(8) ]],
      'pwdConfirm': ['', Validators.required],
    }, {validators: this.contrasenasIgualesValidator});
    
    this.forma2 = this.fb.group({
      'nombre': ['', [Validators.required, Validators.pattern(/^([a-zA-ZáéíóúÁÉÍÓÚñÑ]+\s?)+([a-zA-ZáéíóúÁÉÍÓÚñÑ]+\s)*[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/u)]],
      'fnacimiento': ['', [Validators.required, this.fechaMayorA15Validator(), Validators.maxLength(10), Validators.pattern(/^\d{4}-(0[1-9]|1[0-2])-([0-2][1-9]|3[0-1])$/) ]],
      'residencia': [13, [Validators.required]],
      'modoing': ['', [Validators.required]],
      'profesion': ['', [Validators.required]]
    });

    this.muestraPaises();
    this.muestraProfesiones();
    this.muestraIngresos();
  }

  contrasenasIgualesValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const pwd = control.get('contrasena');
    const pwdConfirm = control.get('pwdConfirm');

    return pwd && pwdConfirm && pwd.value !== pwdConfirm.value ? { contrasenasIguales: true } : null;
  }

  fechaMayorA15Validator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fnacimiento = new Date(control.value);
      const factual = new Date();
      let years = (factual.getFullYear() - fnacimiento.getFullYear());
  
      return years < 15  || years > 99 ? { fechaInvalida : true } : null;
    }
  }

  muestraPaises(){
    this.usuarioService.traePaises().subscribe(res => {
      this.paises = res;
    })
  }

  muestraProfesiones(){
    this.usuarioService.traeProfesiones().subscribe(res => {
      this.profesiones = res;
    })
  }

  muestraIngresos(){
    this.usuarioService.traeIngresos().subscribe(res => {
     this.ingresos = res;
    })
  }

  mostrarMensaje(){
    if(this.mensajeSolicitaValidacion == 0){
      this.mensajeSolicitaValidacion = 1;
      this.parteFormulario = 2;
    }
  }

  volveraRegistro(){
    this.router.navigate(['validausuario']);
  }

}
