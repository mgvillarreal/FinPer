import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IngresoI } from 'src/app/interfaces/ingreso';
import { PaisI } from 'src/app/interfaces/pais';
import { ProfesionI } from 'src/app/interfaces/profesion';
import { Usuario } from 'src/app/models/usuario.model';
import { ModalService } from 'src/app/services/modal.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public forma: FormGroup;   
  usuario = new Usuario;
  paises: PaisI[] = []
  profesiones: ProfesionI[] = []
  ingresos: IngresoI[] = []
  parteFormulario:number = 0;

  constructor(private router: Router, private fb: FormBuilder, private usuariosService: UsuariosService, private modalService: ModalService) { }

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
    console.log('Datos de Usuario: ', this.usuario);
    //this.registraUsuario();
    this.mostrarMensaje();
  }

  registraUsuario(){
    // this.usuariosService.registraUsuario(this.usuario).subscribe(resp => {
    //   console.log(resp);
    // })
  }

  mostrarMensaje():void{
    this.modalService.alerta("Icono de mensaje", "Hemos enviado un mail a tu correo electrónico para validar tu perfil").subscribe((answer) => {});
  }

  ngOnInit(): void {
    this.forma = this.fb.group({ //se toma del constructor que tiene inyectado el servicio que esta importado
      'email': ['', [Validators.required, Validators.email]],
      'contrasena': ['', [Validators.required, Validators.minLength(6)]],
      'pwdConfirm': ['', Validators.required],
      'nombre': ['', [Validators.required]],
      'fnacimiento': ['', [Validators.required]],
      'residencia': [13, [Validators.required]],
      'modoIngreso': ['', [Validators.required]],
      'profesion': ['', [Validators.required]],
    }, { validators: this.contrasenasIgualesValidator });
    this.muestraPaises()
    this.muestraProfesiones()
    this.muestraIngresos()
  }

  contrasenasIgualesValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const pwd = control.get('contrasena');
    const pwdConfirm = control.get('pwdConfirm');
  
    return pwd && pwdConfirm && pwd.value !== pwdConfirm.value ? { contrasenasIguales: true } : null;
  };

  muestraPaises(){
    this.usuariosService.traePaises().subscribe(res => {
      this.paises = res
    })
  }

  muestraProfesiones(){
    this.usuariosService.traeProfesiones().subscribe(res => {
      this.profesiones = res
    })
  }

  muestraIngresos(){
    this.usuariosService.traeIngresos().subscribe(res => {
      this.ingresos = res
    })
  }

}