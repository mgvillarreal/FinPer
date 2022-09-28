import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaisI } from 'src/app/interfaces/pais';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  usuario = new Usuario();
  public forma: FormGroup;

  nombre = localStorage.getItem('name');
  residencia:string;
  profesion:string;
  // fnacimiento ;
  email:string;

  /* FLAGS */
  muestraPerfil: number = 1;
  editaFlag: number = 0;
  eliminaFlag: number = 0;
  parteFormulario: number = 1;
  muestraMensajeFlag: number = 0;
  cambiaContrasenaFlag: number = 0;
  muestraMensajeContrasenaFlag: number = 0;

  /* EDITA DATOS */
  public forma1: FormGroup;
  public forma2: FormGroup;
  paises: PaisI[] = [];
  arrayIngresos:any[] = [];

  constructor(private fb: FormBuilder, private usuarioService: UsuariosService, private router: Router ) {
    this.usuario.nombre = localStorage.getItem('name');
  }

  /* MANEJO DE FLAGS */

  editaPerfilFlag(){
    if(this.editaFlag == 0){
      this.editaFlag = 1;
      this.muestraPerfil = 0;
    }
  }

  volveraPerfil(){
    this.muestraPerfil = 1;
    this.editaFlag = 0;
    this.eliminaFlag = 0;
    this.parteFormulario = 1;
    this.muestraMensajeFlag = 0;
    this.cambiaContrasenaFlag = 0;
    this.muestraMensajeContrasenaFlag = 0;
  }

  eliminaPerfilFlag(){
    if(this.eliminaFlag == 0){
      this.eliminaFlag = 1;
      this.muestraPerfil = 0;
    }
  }

  cambiarContrasenaFlag(){
    if(this.cambiaContrasenaFlag == 0){
      this.cambiaContrasenaFlag = 1;
      this.muestraPerfil = 0;
    }
  }

  /* METODOS */

  muestraPaises(){
    this.usuarioService.traePaises().subscribe(res => {
      this.paises = res
    })
  }

  guardaFormaUno(){
    this.usuario.nombre = this.forma1.value['nombre'];
    this.usuario.fnacimiento = this.forma1.value['fnacimiento'];
    this.usuario.residencia = this.forma1.value['residencia'];
    this.parteFormulario = 2;
  }

  guardaFormaDos(){
    this.usuario.profesion = this.forma2.value['profesion'];
    this.tomaModosIngreso();
    this.muestraMensajeFlag = 1;
    this.parteFormulario = 0;
    console.log('Datos Modificados del Usuario: ', this.usuario);
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

  eliminarPerfil(){
    this.router.navigate(['inicio']);
  }

  cambiarContrasena(){
    this.usuario.contrasena = this.forma.value['contrasenaConfirm'];
    console.log('Contrasena Nueva del Usuario: ', this.usuario.contrasena);
    this.muestraMensajeContrasenaFlag = 1;
    this.cambiaContrasenaFlag = 0;
  }

  ngOnInit(): void {
    this.forma1 = this.fb.group({
      'nombre': ['', [Validators.required]],
      'fnacimiento': ['', [Validators.required]],
      'residencia': [13, [Validators.required]],
    });

    this.forma2 = this.fb.group({
      'modoing': ['', [Validators.required]],
      'profesion': ['', [Validators.required]],
    });

    this.forma = this.fb.group({
      'contrasenaNueva': ['', [Validators.required]],
      'contrasenaConfirm': ['', Validators.required],
    }, { validators: this.contrasenasIgualesValidator });
  }

  contrasenasIgualesValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const pwd = control.get('contrasenaNueva');
    const pwdConfirm = control.get('contrasenaConfirm');

    return pwd && pwdConfirm && pwd.value !== pwdConfirm.value ? { contrasenasIguales: true } : null;
  };


}
