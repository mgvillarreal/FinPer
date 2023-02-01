import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IngresoI } from 'src/app/interfaces/ingreso';
import { PaisI } from 'src/app/interfaces/pais';
import { ProfesionI } from 'src/app/interfaces/profesion';
import { UsuarioI } from 'src/app/interfaces/usuario';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  usuario = new Usuario();
  user: UsuarioI
  public forma: FormGroup;

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
  paises: PaisI[] = [];
  ingresos: IngresoI[] = [];
  profesiones: ProfesionI[] = [];

  constructor(private fb: FormBuilder, private usuarioService: UsuariosService, private router: Router, public auth: AuthService ) {

  }

  /* MANEJO DE FLAGS */

  editaPerfilFlag(){
    if(this.editaFlag == 0){
      this.editaFlag = 1;
      this.muestraPerfil = 0;
      console.log("Usuario a editar: ", this.user);
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
      this.paises = res;
      console.log(this.paises)
    })
  }

  muestraProfesiones(){
    this.usuarioService.traeProfesiones().subscribe(res => {
      this.profesiones = res;
      console.log(res)

    })
  }

  muestraIngresos(){
    this.usuarioService.traeIngresos().subscribe(res => {
      console.log(res)
     this.ingresos = res;
     console.log('Ingresos: ',this.ingresos)
    })
  }

  guardaFormaUno(){
    this.usuario.nombre = this.forma1.value['nombre'];
    this.usuario.fnacimiento = this.forma1.value['fnacimiento'];
    this.usuario.residencia = this.forma1.value['residencia'];
    this.usuario.modoIngreso = this.forma1.value['modoingreso'];
    this.usuario.profesion = this.forma1.value['profesion'];
    this.muestraMensajeFlag = 1;
    this.parteFormulario = 0;
    this.modificarDatos();

  }

  guardaFormaDos(){
    console.log(this.ingresos);

    this.muestraMensajeFlag = 1;
    this.parteFormulario = 0;
    console.log('Datos Modificados del Usuario: ', this.usuario);

    this.modificarDatos();
  }

  modificarDatos(){
    console.log('Datos Modificados del Usuario: ', this.usuario);
    let idUser = localStorage.getItem('id');
    this.usuarioService.modificaUsuario(this.usuario, idUser).subscribe();
  }

  eliminarPerfil(){
    let idUser = localStorage.getItem('id');
    console.log("user id", idUser);
    this.usuarioService.eliminaUsuario(idUser).subscribe();
    this.router.navigate(['inicio']);
    this.auth.logout();
  }

  cambiarContrasena(){
    this.usuario.contrasena = this.forma.value['contrasenaConfirm'];
    this.muestraMensajeContrasenaFlag = 1;
    this.cambiaContrasenaFlag = 0;

    let idUser = localStorage.getItem('id');
    this.usuarioService.modificaContrasena(this.forma.value['contrasenaConfirm'], idUser).subscribe();
  }



  async ngOnInit() {
    const creaForma1 = () => {

    }

    this.usuario.nombre = localStorage.getItem('name');
    await this.traeDatosUsuario();
    console.log(this.user.usu_idresidencia)

     this.forma1 = this.fb.group({
      'nombre': [this.user.usu_nombre, [Validators.required]],
      'fnacimiento': ['', [Validators.required]],
      'residencia': [this.user.usu_idresidencia, [Validators.required]],
      'modoingreso': [this.user.usu_idmoding, [Validators.required]],
      'profesion': [this.user.usu_idprofesion, [Validators.required]],
    });

    this.forma = this.fb.group({
      'email': ['', [Validators.required]],
      'contrasenaNueva': ['', [Validators.required]],
      'contrasenaConfirm': ['', [Validators.required]],
    }, { validators: this.contrasenasIgualesValidator });

    this.muestraPaises();
    this.muestraProfesiones();
    this.muestraIngresos();
  }

  contrasenasIgualesValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const pwd = control.get('contrasenaNueva');
    const pwdConfirm = control.get('contrasenaConfirm');

    return pwd && pwdConfirm && pwd.value !== pwdConfirm.value ? { contrasenasIguales: true } : null;
  };

  async traeDatosUsuario() {
    const resp = await this.usuarioService.traeDatosUsuario(Number(localStorage.getItem('id'))).toPromise();
    this.user = resp[0];
    this.ageCalculator(resp[0].usu_fnacimiento);
    console.log('Datos del Usuario:', this.user);
  }

  ageCalculator(edad){
    if(edad){
      const convertAge = new Date(edad);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.user.edad = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    }
  }


}
